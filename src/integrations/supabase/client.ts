// Migrated from Supabase to Custom API
// This file now exports the new API client that connects to the local backend

import { api } from '@/integrations/api/client';
import type { Database } from './types';

// Re-export the API client as 'supabase' for compatibility with existing code
export const supabase = api;

// For TypeScript compatibility, export types
export type { Database };
