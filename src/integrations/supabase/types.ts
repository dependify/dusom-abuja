export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admission_applications: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          agrees_to_policy: boolean | null
          agrees_to_terms: boolean | null
          application_number: string | null
          baptism_location: string | null
          certificates_urls: string[] | null
          church_address_line1: string | null
          church_city: string | null
          church_country: string | null
          church_email: string | null
          church_involvement_details: string | null
          church_involvement_duration: string | null
          church_phone: string | null
          church_postal_code: string | null
          church_state: string | null
          city: string | null
          counseling_details: string | null
          country: string | null
          created_at: string
          criminal_record_details: string | null
          current_step: number
          date_of_birth: string | null
          date_of_salvation: string | null
          date_of_water_baptism: string | null
          dependents_details: string | null
          email: string | null
          emergency_address_line1: string | null
          emergency_city: string | null
          emergency_contact_first_name: string | null
          emergency_contact_last_name: string | null
          emergency_country: string | null
          emergency_phone: string | null
          emergency_postal_code: string | null
          emergency_relationship: string | null
          emergency_state: string | null
          facsimile: string | null
          financial_commitments_details: string | null
          first_name: string | null
          foundation_maturity_certificates_urls: string[] | null
          has_criminal_record: boolean | null
          has_dependents: boolean | null
          has_financial_commitments: boolean | null
          has_learning_difficulties: boolean | null
          has_physical_condition: boolean | null
          highest_education: string | null
          hospitalization_details: string | null
          hospitalized_recently: boolean | null
          how_heard_about_dusom: string | null
          id: string
          is_dunamis_member: boolean | null
          last_name: string | null
          learning_difficulties_details: string | null
          marital_status: string | null
          medication_details: string | null
          middle_name: string | null
          nationality: string | null
          needs_counseling: boolean | null
          on_medication: boolean | null
          passport_url: string | null
          pastor_name: string | null
          pastor_recommendation_url: string | null
          physical_condition_details: string | null
          place_of_birth: string | null
          postal_code: string | null
          present_church: string | null
          ref1_address_line1: string | null
          ref1_city: string | null
          ref1_country: string | null
          ref1_email: string | null
          ref1_first_name: string | null
          ref1_last_name: string | null
          ref1_phone: string | null
          ref1_postal_code: string | null
          ref1_state: string | null
          ref2_address_line1: string | null
          ref2_city: string | null
          ref2_country: string | null
          ref2_email: string | null
          ref2_first_name: string | null
          ref2_last_name: string | null
          ref2_phone: string | null
          ref2_postal_code: string | null
          ref2_state: string | null
          resume_token: string | null
          salvation_location: string | null
          state: string | null
          status: Database["public"]["Enums"]["application_status"]
          study_preference: string | null
          submitted_at: string | null
          telephone_home: string | null
          testimony: string | null
          updated_at: string
          why_chosen_dusom: string | null
          why_dusom: string | null
          work_mobile: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          agrees_to_policy?: boolean | null
          agrees_to_terms?: boolean | null
          application_number?: string | null
          baptism_location?: string | null
          certificates_urls?: string[] | null
          church_address_line1?: string | null
          church_city?: string | null
          church_country?: string | null
          church_email?: string | null
          church_involvement_details?: string | null
          church_involvement_duration?: string | null
          church_phone?: string | null
          church_postal_code?: string | null
          church_state?: string | null
          city?: string | null
          counseling_details?: string | null
          country?: string | null
          created_at?: string
          criminal_record_details?: string | null
          current_step?: number
          date_of_birth?: string | null
          date_of_salvation?: string | null
          date_of_water_baptism?: string | null
          dependents_details?: string | null
          email?: string | null
          emergency_address_line1?: string | null
          emergency_city?: string | null
          emergency_contact_first_name?: string | null
          emergency_contact_last_name?: string | null
          emergency_country?: string | null
          emergency_phone?: string | null
          emergency_postal_code?: string | null
          emergency_relationship?: string | null
          emergency_state?: string | null
          facsimile?: string | null
          financial_commitments_details?: string | null
          first_name?: string | null
          foundation_maturity_certificates_urls?: string[] | null
          has_criminal_record?: boolean | null
          has_dependents?: boolean | null
          has_financial_commitments?: boolean | null
          has_learning_difficulties?: boolean | null
          has_physical_condition?: boolean | null
          highest_education?: string | null
          hospitalization_details?: string | null
          hospitalized_recently?: boolean | null
          how_heard_about_dusom?: string | null
          id?: string
          is_dunamis_member?: boolean | null
          last_name?: string | null
          learning_difficulties_details?: string | null
          marital_status?: string | null
          medication_details?: string | null
          middle_name?: string | null
          nationality?: string | null
          needs_counseling?: boolean | null
          on_medication?: boolean | null
          passport_url?: string | null
          pastor_name?: string | null
          pastor_recommendation_url?: string | null
          physical_condition_details?: string | null
          place_of_birth?: string | null
          postal_code?: string | null
          present_church?: string | null
          ref1_address_line1?: string | null
          ref1_city?: string | null
          ref1_country?: string | null
          ref1_email?: string | null
          ref1_first_name?: string | null
          ref1_last_name?: string | null
          ref1_phone?: string | null
          ref1_postal_code?: string | null
          ref1_state?: string | null
          ref2_address_line1?: string | null
          ref2_city?: string | null
          ref2_country?: string | null
          ref2_email?: string | null
          ref2_first_name?: string | null
          ref2_last_name?: string | null
          ref2_phone?: string | null
          ref2_postal_code?: string | null
          ref2_state?: string | null
          resume_token?: string | null
          salvation_location?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          study_preference?: string | null
          submitted_at?: string | null
          telephone_home?: string | null
          testimony?: string | null
          updated_at?: string
          why_chosen_dusom?: string | null
          why_dusom?: string | null
          work_mobile?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          agrees_to_policy?: boolean | null
          agrees_to_terms?: boolean | null
          application_number?: string | null
          baptism_location?: string | null
          certificates_urls?: string[] | null
          church_address_line1?: string | null
          church_city?: string | null
          church_country?: string | null
          church_email?: string | null
          church_involvement_details?: string | null
          church_involvement_duration?: string | null
          church_phone?: string | null
          church_postal_code?: string | null
          church_state?: string | null
          city?: string | null
          counseling_details?: string | null
          country?: string | null
          created_at?: string
          criminal_record_details?: string | null
          current_step?: number
          date_of_birth?: string | null
          date_of_salvation?: string | null
          date_of_water_baptism?: string | null
          dependents_details?: string | null
          email?: string | null
          emergency_address_line1?: string | null
          emergency_city?: string | null
          emergency_contact_first_name?: string | null
          emergency_contact_last_name?: string | null
          emergency_country?: string | null
          emergency_phone?: string | null
          emergency_postal_code?: string | null
          emergency_relationship?: string | null
          emergency_state?: string | null
          facsimile?: string | null
          financial_commitments_details?: string | null
          first_name?: string | null
          foundation_maturity_certificates_urls?: string[] | null
          has_criminal_record?: boolean | null
          has_dependents?: boolean | null
          has_financial_commitments?: boolean | null
          has_learning_difficulties?: boolean | null
          has_physical_condition?: boolean | null
          highest_education?: string | null
          hospitalization_details?: string | null
          hospitalized_recently?: boolean | null
          how_heard_about_dusom?: string | null
          id?: string
          is_dunamis_member?: boolean | null
          last_name?: string | null
          learning_difficulties_details?: string | null
          marital_status?: string | null
          medication_details?: string | null
          middle_name?: string | null
          nationality?: string | null
          needs_counseling?: boolean | null
          on_medication?: boolean | null
          passport_url?: string | null
          pastor_name?: string | null
          pastor_recommendation_url?: string | null
          physical_condition_details?: string | null
          place_of_birth?: string | null
          postal_code?: string | null
          present_church?: string | null
          ref1_address_line1?: string | null
          ref1_city?: string | null
          ref1_country?: string | null
          ref1_email?: string | null
          ref1_first_name?: string | null
          ref1_last_name?: string | null
          ref1_phone?: string | null
          ref1_postal_code?: string | null
          ref1_state?: string | null
          ref2_address_line1?: string | null
          ref2_city?: string | null
          ref2_country?: string | null
          ref2_email?: string | null
          ref2_first_name?: string | null
          ref2_last_name?: string | null
          ref2_phone?: string | null
          ref2_postal_code?: string | null
          ref2_state?: string | null
          resume_token?: string | null
          salvation_location?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          study_preference?: string | null
          submitted_at?: string | null
          telephone_home?: string | null
          testimony?: string | null
          updated_at?: string
          why_chosen_dusom?: string | null
          why_dusom?: string | null
          work_mobile?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
          source?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string
          created_by: string | null
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          alt_text?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "accepted"
        | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "accepted",
        "rejected",
      ],
    },
  },
} as const
