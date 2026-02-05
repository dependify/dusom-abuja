import pg from 'pg';
const { Pool } = pg;

// Parse the connection string to handle SSL properly
const connectionString = process.env.DATABASE_URL || '';

// Configure SSL based on the connection string
let ssl: any = undefined;
if (connectionString.includes('sslmode=prefer') || connectionString.includes('sslmode=require')) {
  // For self-signed certificates, we need to disable certificate verification
  ssl = { rejectUnauthorized: false };
}

const pool = new Pool({
  connectionString,
  ssl,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Executed query', { text: text.substring(0, 50), duration, rows: result.rowCount });
  }
  
  return result;
};

export const getClient = () => {
  return pool.connect();
};

export const transaction = async <T>(callback: (client: pg.PoolClient) => Promise<T>): Promise<T> => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default pool;
