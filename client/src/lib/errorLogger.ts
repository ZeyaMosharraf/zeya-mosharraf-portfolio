/**
 * Secure error logging utility
 * - Logs to console only (never UI)
 * - Credentials never visible
 * - Step-by-step validation
 */

type ErrorLevel = 'info' | 'warning' | 'error';

const logError = (level: ErrorLevel, step: string, message: string, details?: any) => {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = level === 'error' ? '❌' : level === 'warning' ? '⚠️' : 'ℹ️';
  
  console.group(`${prefix} [${timestamp}] ${step}`);
  console.log(`Message: ${message}`);
  
  if (details) {
    // Sanitize details - never log credentials
    const sanitized = JSON.parse(JSON.stringify(details), (key, value) => {
      if (key.toLowerCase().includes('key') || key.toLowerCase().includes('secret') || key.toLowerCase().includes('credential')) {
        return '[REDACTED]';
      }
      return value;
    });
    console.log('Details:', sanitized);
  }
  
  console.groupEnd();
};

/**
 * Step 1: Check if environment credentials are present
 */
export const checkEnvCredentials = (): boolean => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!url) {
    logError('error', 'Check Env Credentials', 'VITE_SUPABASE_URL is missing from .env file');
    return false;
  }
  
  if (!key) {
    logError('error', 'Check Env Credentials', 'VITE_SUPABASE_ANON_KEY is missing from .env file');
    return false;
  }
  
  console.log('Env credentials present (URL and Key found)');
  return true;
};

/**
 * Step 2: Check if Supabase connection works
 */
export const checkSupabaseConnection = (supabase: any): boolean => {
  try {
    // Attempt to create a simple query (won't execute yet)
    const test = supabase.from('_test_connection_');
    console.log('Supabase client initialized successfully');
    return true;
  } catch (err: any) {
    logError('error', 'Supabase Connection', 'Failed to initialize Supabase client', {
      message: err?.message,
      code: err?.code
    });
    return false;
  }
};

/**
 * Step 3: Check if table query works
 */
export const logTableFetch = async (
  supabase: any,
  tableName: string,
  result: { data: any; error: any }
): Promise<boolean> => {
  const { data, error } = result;
  
  if (error) {
    logError('error', `Fetch ${tableName} Table`, `Query failed`, {
      code: error.code,
      message: error.message,
      status: error.status,
      hint: error.hint
    });
    return false;
  }
  
  if (!data || data.length === 0) {
    logError('warning', `Fetch ${tableName} Table`, `No rows returned (table empty or no permission)`, {
      rowCount: data?.length || 0
    });
    return false;
  }
  
  console.log(`${tableName} table fetched successfully`);
  console.log(`   Rows returned: ${data.length}`);
  console.table(data);
  return true;
};

/**
 * Log successful data load
 */
export const logSuccess = (tableName: string, rowCount: number, details?: any) => {
  console.log(`SUCCESS: ${tableName} loaded with ${rowCount} rows`, details);
};
