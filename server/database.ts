import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import path from 'path';

interface BusinessTable {
  id: number;
  name: string;
  email: string;
  business_type: string | null;
  tax_id: string | null;
  address: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

interface InvoiceTable {
  id: number;
  business_id: number;
  invoice_number: string;
  customer_name: string;
  customer_email: string | null;
  amount: string;
  due_date: string;
  invoice_date: string;
  description: string | null;
  status: 'pending' | 'verified' | 'funded' | 'paid' | 'rejected';
  verification_status: 'unverified' | 'in_review' | 'verified' | 'rejected';
  funding_percentage: string;
  funded_amount: string | null;
  fee_amount: string | null;
  smart_contract_address: string | null;
  document_url: string | null;
  created_at: string;
  updated_at: string;
}

interface TransactionTable {
  id: number;
  invoice_id: number;
  type: 'funding' | 'payment' | 'fee';
  amount: string;
  transaction_hash: string | null;
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
}

export interface DatabaseSchema {
  businesses: BusinessTable;
  invoices: InvoiceTable;
  transactions: TransactionTable;
}

const dataDirectory = process.env.DATA_DIRECTORY || './data';
const dbPath = path.join(dataDirectory, 'database.sqlite');

const sqliteDb = new Database(dbPath);

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({
    database: sqliteDb,
  }),
  log: ['query', 'error']
});
