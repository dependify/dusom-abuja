// API Client with Supabase-like interface for easier migration
// This provides a compatibility layer between the old Supabase client and the new API

import {
  authApi,
  applicationsApi,
  galleryApi,
  contactApi,
  newsletterApi,
  settingsApi,
  uploadsApi,
  getAccessToken,
  clearTokens,
} from '@/lib/api';

// Type definitions for compatibility
export interface Database {
  public: {
    Tables: {
      admission_applications: any;
      contact_submissions: any;
      gallery_images: any;
      newsletter_subscriptions: any;
      site_settings: any;
      user_roles: any;
    };
    Enums: {
      app_role: 'admin' | 'editor' | 'user';
      application_status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
    };
  };
}

// Interface for filter builder
interface FilterBuilder {
  _filters: { column: string; operator: string; value: any }[];
  _single: boolean;
  _order: { column: string; ascending: boolean } | null;
  _limit: number | null;
  _range: { from: number; to: number } | null;
  _columns: string;
  _tableName: string;
  _api: any;
  
  eq(column: string, value: any): FilterBuilder;
  neq(column: string, value: any): FilterBuilder;
  gt(column: string, value: any): FilterBuilder;
  gte(column: string, value: any): FilterBuilder;
  lt(column: string, value: any): FilterBuilder;
  lte(column: string, value: any): FilterBuilder;
  like(column: string, value: any): FilterBuilder;
  ilike(column: string, value: any): FilterBuilder;
  is(column: string, value: any): FilterBuilder;
  in(column: string, value: any[]): FilterBuilder;
  contains(column: string, value: any): FilterBuilder;
  order(column: string, options?: { ascending?: boolean }): FilterBuilder;
  limit(count: number): FilterBuilder;
  range(from: number, to: number): FilterBuilder;
  single(): FilterBuilder;
  maybeSingle(): FilterBuilder;
}

// Create a filter builder that can be chained and awaited
const createFilterBuilder = (tableName: string, api: any, columns: string = '*'): FilterBuilder & Promise<any> => {
  const builder: any = {
    _filters: [] as { column: string; operator: string; value: any }[],
    _single: false,
    _order: null as { column: string; ascending: boolean } | null,
    _limit: null as number | null,
    _range: null as { from: number; to: number } | null,
    _columns: columns,
    _tableName: tableName,
    _api: api,

    eq: function(column: string, value: any) {
      this._filters.push({ column, operator: 'eq', value });
      return this;
    },

    neq: function(column: string, value: any) {
      this._filters.push({ column, operator: 'neq', value });
      return this;
    },

    gt: function(column: string, value: any) {
      this._filters.push({ column, operator: 'gt', value });
      return this;
    },

    gte: function(column: string, value: any) {
      this._filters.push({ column, operator: 'gte', value });
      return this;
    },

    lt: function(column: string, value: any) {
      this._filters.push({ column, operator: 'lt', value });
      return this;
    },

    lte: function(column: string, value: any) {
      this._filters.push({ column, operator: 'lte', value });
      return this;
    },

    like: function(column: string, value: any) {
      this._filters.push({ column, operator: 'like', value });
      return this;
    },

    ilike: function(column: string, value: any) {
      this._filters.push({ column, operator: 'ilike', value });
      return this;
    },

    is: function(column: string, value: any) {
      this._filters.push({ column, operator: 'is', value });
      return this;
    },

    in: function(column: string, value: any[]) {
      this._filters.push({ column, operator: 'in', value });
      return this;
    },

    contains: function(column: string, value: any) {
      this._filters.push({ column, operator: 'contains', value });
      return this;
    },

    order: function(column: string, { ascending = true } = {}) {
      this._order = { column, ascending };
      return this;
    },

    limit: function(count: number) {
      this._limit = count;
      return this;
    },

    range: function(from: number, to: number) {
      this._range = { from, to };
      return this;
    },

    single: function() {
      this._single = true;
      return this;
    },

    maybeSingle: function() {
      this._single = true;
      return this;
    },

    // Execute the query when awaited
    then: function(onFulfilled: any, onRejected: any) {
      return this._execute().then(onFulfilled, onRejected);
    },

    catch: function(onRejected: any) {
      return this._execute().catch(onRejected);
    },

    finally: function(onFinally: any) {
      return this._execute().finally(onFinally);
    },

    _execute: async function() {
      try {
        // Convert filters to API params
        const params: any = {};
        
        // Handle 'in' operator specially for site_settings
        const inFilter = this._filters.find((f: any) => f.operator === 'in');
        if (inFilter && this._tableName === 'site_settings') {
          params.keys = inFilter.value.join(',');
        }
        
        // Handle eq filters
        this._filters.forEach((filter: any) => {
          if (filter.operator === 'eq') {
            params[filter.column] = filter.value;
          }
        });

        if (this._limit) {
          params.limit = this._limit;
        }

        if (this._range) {
          params.page = Math.floor(this._range.from / (this._range.to - this._range.from + 1)) + 1;
          params.limit = this._range.to - this._range.from + 1;
        }

        const result = await this._api.list(params);
        const data = this._single ? (result.data[0] || null) : result.data;
        
        return {
          data,
          error: null,
          count: result.total,
        };
      } catch (error: any) {
        return { data: null, error: { message: error.message }, count: null };
      }
    }
  };

  return builder;
};

// Auth client with Supabase-like interface
const createAuthClient = () => ({
  signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
    try {
      const result = await authApi.signUp(email, password);
      return { data: { user: result.user }, error: null };
    } catch (error: any) {
      return { data: { user: null }, error: { message: error.message } };
    }
  },

  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await authApi.signIn(email, password);
      return {
        data: {
          user: result.user,
          session: {
            access_token: result.accessToken,
            refresh_token: result.refreshToken,
            expires_in: result.expiresIn,
          },
        },
        error: null,
      };
    } catch (error: any) {
      return { data: { user: null, session: null }, error: { message: error.message } };
    }
  },

  signOut: async () => {
    try {
      await authApi.signOut();
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  },

  getSession: async () => {
    const session = authApi.getSession();
    return {
      data: {
        session: session ? {
          access_token: getAccessToken(),
          user: session.user,
        } : null,
      },
      error: null,
    };
  },

  getUser: async () => {
    try {
      const user = await authApi.getUser();
      return { data: { user }, error: null };
    } catch (error: any) {
      return { data: { user: null }, error: { message: error.message } };
    }
  },

  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    // Simple implementation
    const checkAuth = async () => {
      const { data } = authApi.getSession() as any;
      if (data) {
        callback('SIGNED_IN', data);
      }
    };
    
    checkAuth();
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  },
});

// Database client
const createDatabaseClient = () => ({
  from: (tableName: string) => {
    let api: any;
    switch (tableName) {
      case 'admission_applications':
        api = applicationsApi;
        break;
      case 'gallery_images':
        api = galleryApi;
        break;
      case 'contact_submissions':
        api = contactApi;
        break;
      case 'newsletter_subscriptions':
        api = newsletterApi;
        break;
      case 'site_settings':
        api = settingsApi;
        break;
      case 'user_roles':
        api = { list: async () => ({ data: [], total: 0 }) };
        break;
      default:
        api = { list: async () => ({ data: [], total: 0 }) };
    }

    return {
      // select returns a filter builder that can be chained and awaited
      select: (columns: string = '*') => {
        return createFilterBuilder(tableName, api, columns);
      },

      insert: async (values: any | any[]) => {
        try {
          const dataArray = Array.isArray(values) ? values : [values];
          const results: any[] = [];
          
          for (const item of dataArray) {
            if (tableName === 'admission_applications') {
              const result = await api.create();
              results.push(result);
            } else if (tableName === 'contact_submissions') {
              const result = await contactApi.submit(item);
              results.push(result);
            } else if (tableName === 'newsletter_subscriptions') {
              const result = await newsletterApi.subscribe(item.email);
              results.push(result);
            } else if (tableName === 'user_roles') {
              results.push(item);
            } else {
              results.push(item);
            }
          }
          
          return {
            data: Array.isArray(values) ? results : results[0],
            error: null,
          };
        } catch (error: any) {
          return { data: null, error: { message: error.message } };
        }
      },

      update: async (values: any) => {
        try {
          if (tableName === 'admission_applications') {
            // This needs the token filter - use a different approach
            return { data: null, error: { message: 'Update requires filters, use select().eq().update()' } };
          }
          
          return { data: null, error: { message: 'Update not implemented for this table' } };
        } catch (error: any) {
          return { data: null, error: { message: error.message } };
        }
      },

      delete: async () => {
        try {
          return { error: { message: 'Delete requires filters, use select().eq().delete()' } };
        } catch (error: any) {
          return { error: { message: error.message } };
        }
      },

      // Direct filter methods (before select)
      eq: function(column: string, value: any) {
        return createFilterBuilder(tableName, api).eq(column, value);
      },
    };
  },
});

// Storage client (simplified - files are now uploaded directly via API)
const createStorageClient = () => ({
  from: (bucketName: string) => ({
    upload: async (path: string, file: File) => {
      try {
        return { data: { path }, error: null };
      } catch (error: any) {
        return { data: null, error: { message: error.message } };
      }
    },

    getPublicUrl: (path: string) => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      return {
        data: {
          publicUrl: `${API_URL}/uploads/${bucketName}/${path}`,
        },
      };
    },

    remove: async (paths: string[]) => {
      try {
        return { data: { paths }, error: null };
      } catch (error: any) {
        return { data: null, error: { message: error.message } };
      }
    },

    list: async () => {
      try {
        return { data: [], error: null };
      } catch (error: any) {
        return { data: null, error: { message: error.message } };
      }
    },
  }),
});

// Functions client (for edge functions)
const createFunctionsClient = () => ({
  invoke: async (functionName: string, options?: { body?: any }) => {
    try {
      const functionMap: Record<string, () => Promise<any>> = {
        'send-application-email': async () => {
          return { data: { success: true }, error: null };
        },
        'elevenlabs-conversation-token': async () => {
          const response = await fetch('/api/voice/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(options?.body || {}),
          });
          const data = await response.json();
          return { data, error: null };
        },
        'elevenlabs-text-chat': async () => {
          const response = await fetch('/api/voice/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(options?.body || {}),
          });
          const data = await response.json();
          return { data, error: null };
        },
      };

      const fn = functionMap[functionName];
      if (fn) {
        return await fn();
      }

      return { data: null, error: { message: `Function ${functionName} not found` } };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },
});

// Main API client with Supabase-like interface
export const createClient = () => {
  const auth = createAuthClient();
  const db = createDatabaseClient();
  const storage = createStorageClient();
  const functions = createFunctionsClient();

  return {
    auth,
    from: db.from,
    storage,
    functions,
  };
};

// Export a singleton instance
export const api = createClient();
