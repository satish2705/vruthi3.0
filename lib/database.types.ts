export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          email: string
          company_name: string
          description: string | null
          website: string | null
          location: string | null
          industry: string | null
          logo_url: string | null
          user_type: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          company_name: string
          description?: string | null
          website?: string | null
          location?: string | null
          industry?: string | null
          logo_url?: string | null
          user_type: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          company_name?: string
          description?: string | null
          website?: string | null
          location?: string | null
          industry?: string | null
          logo_url?: string | null
          user_type?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      job_seekers: {
        Row: {
          id: string
          email: string
          full_name: string
          headline: string | null
          about: string | null
          location: string | null
          resume_url: string | null
          avatar_url: string | null
          user_type: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name: string
          headline?: string | null
          about?: string | null
          location?: string | null
          resume_url?: string | null
          avatar_url?: string | null
          user_type: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          headline?: string | null
          about?: string | null
          location?: string | null
          resume_url?: string | null
          avatar_url?: string | null
          user_type?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      jobs: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string
          location: string
          job_type: string
          salary_min: number | null
          salary_max: number | null
          requirements: string | null
          status: string
          created_at: string
          updated_at: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          description: string
          location: string
          job_type: string
          salary_min?: number | null
          salary_max?: number | null
          requirements?: string | null
          status?: string
          created_at?: string
          updated_at?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          description?: string
          location?: string
          job_type?: string
          salary_min?: number | null
          salary_max?: number | null
          requirements?: string | null
          status?: string
          created_at?: string
          updated_at?: string | null
          expires_at?: string | null
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          seeker_id: string
          company_id: string
          cover_letter: string | null
          resume_url: string | null
          status: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          job_id: string
          seeker_id: string
          company_id: string
          cover_letter?: string | null
          resume_url?: string | null
          status?: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          seeker_id?: string
          company_id?: string
          cover_letter?: string | null
          resume_url?: string | null
          status?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      saved_jobs: {
        Row: {
          id: string
          job_id: string
          seeker_id: string
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          seeker_id: string
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          seeker_id?: string
          created_at?: string
        }
      }
    }
  }
}

