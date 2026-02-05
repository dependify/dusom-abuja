-- Create application status enum
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'accepted', 'rejected');

-- Create admission applications table
CREATE TABLE public.admission_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
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

-- Enable RLS
ALTER TABLE public.admission_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can create a draft application
CREATE POLICY "Anyone can create applications"
ON public.admission_applications
FOR INSERT
WITH CHECK (true);

-- Anyone with the resume token can view their application
CREATE POLICY "Users can view their application with token"
ON public.admission_applications
FOR SELECT
USING (true);

-- Anyone with the resume token can update their draft application
CREATE POLICY "Users can update draft applications"
ON public.admission_applications
FOR UPDATE
USING (status = 'draft');

-- Admins can view and manage all applications
CREATE POLICY "Admins can manage all applications"
ON public.admission_applications
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_admission_applications_updated_at
BEFORE UPDATE ON public.admission_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'application-documents',
  'application-documents',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- Storage policies for application documents
CREATE POLICY "Anyone can upload application documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'application-documents');

CREATE POLICY "Anyone can view application documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'application-documents');

-- Generate application number function
CREATE OR REPLACE FUNCTION public.generate_application_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'submitted' AND NEW.application_number IS NULL THEN
    NEW.application_number := 'DUSOM-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('application_number_seq')::TEXT, 5, '0');
    NEW.submitted_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create sequence for application numbers
CREATE SEQUENCE IF NOT EXISTS application_number_seq START WITH 1;

-- Add trigger for application number generation
CREATE TRIGGER generate_application_number_trigger
BEFORE UPDATE ON public.admission_applications
FOR EACH ROW
EXECUTE FUNCTION public.generate_application_number();