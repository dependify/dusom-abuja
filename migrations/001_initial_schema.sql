-- DUSOM Database Migration for Standalone PostgreSQL with pgvector
-- This migration replaces Supabase-specific features with standard PostgreSQL

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ============================================
-- USERS TABLE (replaces auth.users from Supabase)
-- ============================================
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    email_confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON public.users(email);

-- ============================================
-- USER ROLES
-- ============================================
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ============================================
-- SITE SETTINGS
-- ============================================
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES public.users(id)
);

-- Insert default settings
INSERT INTO public.site_settings (setting_key, setting_value, description) VALUES
('contact_webhook_url', '', 'Webhook URL for contact form submissions'),
('newsletter_webhook_url', '', 'Webhook URL for newsletter signups'),
('ga4_measurement_id', '', 'Google Analytics 4 Measurement ID (G-XXXXXXXX)'),
('site_title', 'DUSOM - Dunamis School of Ministry', 'Site title for SEO'),
('site_description', 'Train to ignite the world with the Gospel of Jesus Christ. Join thousands of firebrands who have been equipped at Dunamis School of Ministry.', 'Site description for SEO'),
('site_keywords', 'dunamis, school of ministry, dusom, abuja, nigeria, bible school, ministry training, christian education', 'SEO keywords');

-- ============================================
-- GALLERY IMAGES
-- ============================================
CREATE TABLE public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    alt_text TEXT,
    category TEXT NOT NULL DEFAULT 'General',
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id)
);

CREATE INDEX idx_gallery_images_is_active ON public.gallery_images(is_active);
CREATE INDEX idx_gallery_images_category ON public.gallery_images(category);

-- ============================================
-- CONTACT SUBMISSIONS
-- ============================================
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'contact_form',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_is_read ON public.contact_submissions(is_read);

-- ============================================
-- NEWSLETTER SUBSCRIPTIONS
-- ============================================
CREATE TABLE public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_newsletter_subscriptions_email ON public.newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_subscriptions_is_active ON public.newsletter_subscriptions(is_active);

-- ============================================
-- ADMISSION APPLICATIONS
-- ============================================
-- Create application status enum
CREATE TYPE public.application_status AS ENUM ('draft', 'submitted', 'under_review', 'accepted', 'rejected');

CREATE TABLE public.admission_applications (
  id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Application tracking
  application_number TEXT UNIQUE,
  status application_status NOT NULL DEFAULT 'draft',
  current_step INTEGER NOT NULL DEFAULT 1,
  resume_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  
  -- Page 1: Requirements & Personal Info
  passport_url TEXT,
  study_preference TEXT, -- 'full_time' or 'part_time'
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  email TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Nigeria',
  
  -- Page 2: Personal Details
  nationality TEXT,
  date_of_birth DATE,
  work_mobile TEXT,
  place_of_birth TEXT,
  telephone_home TEXT,
  facsimile TEXT,
  
  -- Emergency Contact
  emergency_contact_first_name TEXT,
  emergency_contact_last_name TEXT,
  emergency_relationship TEXT,
  emergency_address_line1 TEXT,
  emergency_city TEXT,
  emergency_state TEXT,
  emergency_postal_code TEXT,
  emergency_country TEXT DEFAULT 'Nigeria',
  emergency_phone TEXT,
  
  marital_status TEXT,
  highest_education TEXT,
  
  -- Page 3: Christian Life Details
  date_of_salvation DATE,
  date_of_water_baptism DATE,
  salvation_location TEXT,
  baptism_location TEXT,
  present_church TEXT,
  pastor_name TEXT,
  church_address_line1 TEXT,
  church_city TEXT,
  church_state TEXT,
  church_postal_code TEXT,
  church_country TEXT DEFAULT 'Nigeria',
  church_phone TEXT,
  church_involvement_duration TEXT,
  church_email TEXT,
  church_involvement_details TEXT,
  why_dusom TEXT,
  needs_counseling BOOLEAN,
  counseling_details TEXT,
  has_criminal_record BOOLEAN,
  criminal_record_details TEXT,
  
  -- Page 4: Reference Details
  ref1_first_name TEXT,
  ref1_last_name TEXT,
  ref1_address_line1 TEXT,
  ref1_city TEXT,
  ref1_state TEXT,
  ref1_postal_code TEXT,
  ref1_country TEXT DEFAULT 'Nigeria',
  ref1_phone TEXT,
  ref1_email TEXT,
  
  ref2_first_name TEXT,
  ref2_last_name TEXT,
  ref2_address_line1 TEXT,
  ref2_city TEXT,
  ref2_state TEXT,
  ref2_postal_code TEXT,
  ref2_country TEXT DEFAULT 'Nigeria',
  ref2_phone TEXT,
  ref2_email TEXT,
  
  -- Page 5: Medical & General Details
  has_physical_condition BOOLEAN,
  physical_condition_details TEXT,
  has_learning_difficulties BOOLEAN,
  learning_difficulties_details TEXT,
  on_medication BOOLEAN,
  medication_details TEXT,
  hospitalized_recently BOOLEAN,
  hospitalization_details TEXT,
  how_heard_about_dusom TEXT,
  why_chosen_dusom TEXT,
  has_financial_commitments BOOLEAN,
  financial_commitments_details TEXT,
  has_dependents BOOLEAN,
  dependents_details TEXT,
  
  -- Page 6: Documents
  certificates_urls TEXT[], -- Array of certificate URLs
  is_dunamis_member BOOLEAN,
  foundation_maturity_certificates_urls TEXT[],
  pastor_recommendation_url TEXT,
  testimony TEXT,
  
  -- Page 7: Agreement
  agrees_to_policy BOOLEAN,
  agrees_to_terms BOOLEAN,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  submitted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_admission_applications_status ON public.admission_applications(status);
CREATE INDEX idx_admission_applications_resume_token ON public.admission_applications(resume_token);
CREATE INDEX idx_admission_applications_email ON public.admission_applications(email);
CREATE INDEX idx_admission_applications_created_at ON public.admission_applications(created_at);

-- Create sequence for application numbers
CREATE SEQUENCE IF NOT EXISTS public.application_number_seq START WITH 1;

-- ============================================
-- TRIGGERS
-- ============================================
-- Create trigger for updating updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admission_applications_updated_at
BEFORE UPDATE ON public.admission_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Generate application number function
CREATE OR REPLACE FUNCTION public.generate_application_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'submitted' AND OLD.status = 'draft' AND NEW.application_number IS NULL THEN
    NEW.application_number := 'DUSOM-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('public.application_number_seq')::TEXT, 5, '0');
    NEW.submitted_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger for application number generation
CREATE TRIGGER generate_application_number_trigger
BEFORE UPDATE ON public.admission_applications
FOR EACH ROW
EXECUTE FUNCTION public.generate_application_number();

-- ============================================
-- STORAGE METADATA TABLE (replaces Supabase Storage)
-- ============================================
CREATE TABLE public.storage_objects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bucket_id TEXT NOT NULL,
    name TEXT NOT NULL,
    owner UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_accessed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    path_tokens TEXT[],
    version TEXT,
    mime_type TEXT,
    size BIGINT,
    etag TEXT,
    UNIQUE (bucket_id, name)
);

CREATE INDEX idx_storage_objects_bucket ON public.storage_objects(bucket_id);
CREATE INDEX idx_storage_objects_owner ON public.storage_objects(owner);

-- Storage buckets table
CREATE TABLE public.storage_buckets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    owner UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    public BOOLEAN DEFAULT false,
    avif_autodetection BOOLEAN DEFAULT false,
    file_size_limit BIGINT,
    allowed_mime_types TEXT[]
);

-- Insert default buckets
INSERT INTO public.storage_buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES
('gallery', 'gallery', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
('application-documents', 'application-documents', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);

-- ============================================
-- SESSIONS TABLE (for custom auth)
-- ============================================
CREATE TABLE public.sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_sessions_token ON public.sessions(token);
CREATE INDEX idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON public.sessions(expires_at);

-- ============================================
-- REFRESH TOKENS TABLE
-- ============================================
CREATE TABLE public.refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_refresh_tokens_token ON public.refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user_id ON public.refresh_tokens(user_id);

-- ============================================
-- AUDIT LOG TABLE
-- ============================================
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    record_id UUID,
    action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    old_data JSONB,
    new_data JSONB,
    performed_by UUID REFERENCES public.users(id),
    performed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ip_address INET
);

CREATE INDEX idx_audit_logs_table ON public.audit_logs(table_name);
CREATE INDEX idx_audit_logs_performed_at ON public.audit_logs(performed_at);
CREATE INDEX idx_audit_logs_performed_by ON public.audit_logs(performed_by);

-- Audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    old_data JSONB;
    new_data JSONB;
BEGIN
    IF TG_OP = 'DELETE' THEN
        old_data = to_jsonb(OLD);
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', old_data);
        RETURN OLD;
    ELSIF TG_OP = 'INSERT' THEN
        new_data = to_jsonb(NEW);
        INSERT INTO public.audit_logs (table_name, record_id, action, new_data)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', new_data);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        old_data = to_jsonb(OLD);
        new_data = to_jsonb(NEW);
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data, new_data)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', old_data, new_data);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Enable audit logging for important tables
CREATE TRIGGER audit_admission_applications
AFTER INSERT OR UPDATE OR DELETE ON public.admission_applications
FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

CREATE TRIGGER audit_users
AFTER INSERT OR UPDATE OR DELETE ON public.users
FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

-- ============================================
-- CREATE DEFAULT ADMIN USER
-- Password: admin123 (change immediately after setup!)
-- ============================================
-- The password hash is for 'admin123' using bcrypt
INSERT INTO public.users (email, password_hash, email_confirmed_at)
VALUES ('admin@dusomabuja.org', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjXZ0LkRrKp3LWzRbJ5z0UM9BhxQy6q', now())
ON CONFLICT (email) DO NOTHING;

-- Assign admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM public.users WHERE email = 'admin@dusomabuja.org'
ON CONFLICT DO NOTHING;
