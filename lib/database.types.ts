export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          primary_muscle: string | null;
          equipment: string | null;
          is_custom: boolean | null;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string | null;
          primary_muscle?: string | null;
          equipment?: string | null;
          is_custom?: boolean | null;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string | null;
          primary_muscle?: string | null;
          equipment?: string | null;
          is_custom?: boolean | null;
          created_by?: string | null;
        };
      };
      locations: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          type: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          country: string | null;
          latitude: number | null;
          longitude: number | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          type?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          country?: string | null;
          latitude?: number | null;
          longitude?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          type?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          country?: string | null;
          latitude?: number | null;
          longitude?: number | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          name: string | null;
          unit_preference: string | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          unit_preference?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          unit_preference?: string | null;
          created_at?: string | null;
        };
      };
      sets: {
        Row: {
          id: string;
          workout_exercise_id: string | null;
          set_num: number | null;
          set_type: string | null;
          reps: number | null;
          weight: number | null;
          weight_unit: string | null;
          duration_secs: number | null;
          distance: number | null;
          rest_seconds: number | null;
          is_complete: boolean | null;
        };
        Insert: {
          id?: string;
          workout_exercise_id?: string | null;
          set_num?: number | null;
          set_type?: string | null;
          reps?: number | null;
          weight?: number | null;
          weight_unit?: string | null;
          duration_secs?: number | null;
          distance?: number | null;
          rest_seconds?: number | null;
          is_complete?: boolean | null;
        };
        Update: {
          id?: string;
          workout_exercise_id?: string | null;
          set_num?: number | null;
          set_type?: string | null;
          reps?: number | null;
          weight?: number | null;
          weight_unit?: string | null;
          duration_secs?: number | null;
          distance?: number | null;
          rest_seconds?: number | null;
          is_complete?: boolean | null;
        };
      };
      workout_exercises: {
        Row: {
          id: string;
          workout_id: string | null;
          exercise_id: string | null;
          order_index: number | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          workout_id?: string | null;
          exercise_id?: string | null;
          order_index?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          workout_id?: string | null;
          exercise_id?: string | null;
          order_index?: number | null;
          notes?: string | null;
        };
      };
      workouts: {
        Row: {
          id: string;
          user_id: string | null;
          location_id: string | null;
          name: string | null;
          notes: string | null;
          started_at: string | null;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          location_id?: string | null;
          name?: string | null;
          notes?: string | null;
          started_at?: string | null;
          ended_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          location_id?: string | null;
          name?: string | null;
          notes?: string | null;
          started_at?: string | null;
          ended_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
