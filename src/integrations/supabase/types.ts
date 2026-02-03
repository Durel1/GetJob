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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      Candidatures: {
        Row: {
          created_at: string | null
          id_candidature: string
          id_etudiant: string | null
          id_offre_emploi: string | null
          id_profil_etudiant: string | null
          Statu: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id_candidature?: string
          id_etudiant?: string | null
          id_offre_emploi?: string | null
          id_profil_etudiant?: string | null
          Statu?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id_candidature?: string
          id_etudiant?: string | null
          id_offre_emploi?: string | null
          id_profil_etudiant?: string | null
          Statu?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Candidatures_id_etudiant_fkey"
            columns: ["id_etudiant"]
            isOneToOne: false
            referencedRelation: "etudiants"
            referencedColumns: ["id_etudiant"]
          },
          {
            foreignKeyName: "Candidatures_id_offre_emploi_fkey"
            columns: ["id_offre_emploi"]
            isOneToOne: false
            referencedRelation: "offre_emploi"
            referencedColumns: ["id_offre_emploi"]
          },
          {
            foreignKeyName: "Candidatures_id_profil_etudiant_fkey"
            columns: ["id_profil_etudiant"]
            isOneToOne: false
            referencedRelation: "Profil_Etudiants"
            referencedColumns: ["id_profil_etudiant"]
          },
        ]
      }
      Entreprises: {
        Row: {
          created_at: string
          description: string | null
          domaine: string | null
          id_entreprise: string
          id_recruteur: string
          localisation: string | null
          nom_entreprise: string
          site_web: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          domaine?: string | null
          id_entreprise?: string
          id_recruteur: string
          localisation?: string | null
          nom_entreprise: string
          site_web?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          domaine?: string | null
          id_entreprise?: string
          id_recruteur?: string
          localisation?: string | null
          nom_entreprise?: string
          site_web?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Entreprises_id_recruteur_fkey"
            columns: ["id_recruteur"]
            isOneToOne: false
            referencedRelation: "recruteurs"
            referencedColumns: ["id_recruteur"]
          },
        ]
      }
      etudiants: {
        Row: {
          created_at: string | null
          email: string
          id_etudiant: string
          mot_de_passe: string
          nom: string
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id_etudiant?: string
          mot_de_passe: string
          nom: string
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id_etudiant?: string
          mot_de_passe?: string
          nom?: string
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      offre_emploi: {
        Row: {
          competance: string | null
          created_at: string | null
          description: string | null
          horaires_travail: string | null
          id_entreprise: string | null
          id_offre_emploi: string
          id_recruteur: string | null
          niveau_etude: string | null
          poste: string | null
          type_contrat: string | null
          updated_at: string | null
        }
        Insert: {
          competance?: string | null
          created_at?: string | null
          description?: string | null
          horaires_travail?: string | null
          id_entreprise?: string | null
          id_offre_emploi?: string
          id_recruteur?: string | null
          niveau_etude?: string | null
          poste?: string | null
          type_contrat?: string | null
          updated_at?: string | null
        }
        Update: {
          competance?: string | null
          created_at?: string | null
          description?: string | null
          horaires_travail?: string | null
          id_entreprise?: string | null
          id_offre_emploi?: string
          id_recruteur?: string | null
          niveau_etude?: string | null
          poste?: string | null
          type_contrat?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offre_emploi_id_entreprise_fkey"
            columns: ["id_entreprise"]
            isOneToOne: false
            referencedRelation: "Entreprises"
            referencedColumns: ["id_entreprise"]
          },
          {
            foreignKeyName: "offre_emploi_id_recruteur_fkey"
            columns: ["id_recruteur"]
            isOneToOne: false
            referencedRelation: "recruteurs"
            referencedColumns: ["id_recruteur"]
          },
        ]
      }
      Profil_Etudiants: {
        Row: {
          Competances: string | null
          created_at: string | null
          CV: string | null
          Disponibilité: string | null
          Domaine_Etudes: string | null
          Etablissement: string | null
          id_etudiant: string | null
          id_profil_etudiant: string
          Localisation: string | null
          Niveau_etudes: string | null
          updated_at: string | null
          URL_GitHub: string | null
        }
        Insert: {
          Competances?: string | null
          created_at?: string | null
          CV?: string | null
          Disponibilité?: string | null
          Domaine_Etudes?: string | null
          Etablissement?: string | null
          id_etudiant?: string | null
          id_profil_etudiant: string
          Localisation?: string | null
          Niveau_etudes?: string | null
          updated_at?: string | null
          URL_GitHub?: string | null
        }
        Update: {
          Competances?: string | null
          created_at?: string | null
          CV?: string | null
          Disponibilité?: string | null
          Domaine_Etudes?: string | null
          Etablissement?: string | null
          id_etudiant?: string | null
          id_profil_etudiant?: string
          Localisation?: string | null
          Niveau_etudes?: string | null
          updated_at?: string | null
          URL_GitHub?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Profil_Etudiants_id_Etudiant_fkey"
            columns: ["id_etudiant"]
            isOneToOne: true
            referencedRelation: "etudiants"
            referencedColumns: ["id_etudiant"]
          },
        ]
      }
      recruteurs: {
        Row: {
          created_at: string | null
          email: string
          id_recruteur: string
          mot_de_passe: string
          nom: string
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id_recruteur?: string
          mot_de_passe: string
          nom: string
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id_recruteur?: string
          mot_de_passe?: string
          nom?: string
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "pending" | "accepted" | "rejected" | "interview"
      contract_type:
        | "internship"
        | "part_time"
        | "full_time"
        | "freelance"
        | "temporary"
      user_type: "student" | "recruiter"
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
      application_status: ["pending", "accepted", "rejected", "interview"],
      contract_type: [
        "internship",
        "part_time",
        "full_time",
        "freelance",
        "temporary",
      ],
      user_type: ["student", "recruiter"],
    },
  },
} as const
