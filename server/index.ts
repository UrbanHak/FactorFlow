import express from 'express';
import dotenv from 'dotenv';
import { setupStaticServing } from './static-serve.js';
import { db } from './database.js';

dotenv.config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all businesses
app.get('/api/businesses', async (req, res) => {
  try {
    console.log('Fetching all businesses');
    const businesses = await db.selectFrom('businesses').selectAll().execute();
    console.log('Found businesses:', businesses.length);
    res.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

// Create new business
app.post('/api/businesses', async (req, res) => {
  try {
    console.log('Creating business:', req.body);
    const { name, email, business_type, tax_id, address, phone } = req.body;
    
    const result = await db
      .insertInto('businesses')
      .values({
        name,
        email,
        business_type,
        tax_id,
        address,
        phone,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .returning(['id'])
      .executeTakeFirst();
    
    console.log('Business created with ID:', result?.id);
    res.json({ id: result?.id, message: 'Business created successfully' });
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Failed to create business' });
  }
});

// Get invoices for a business
app.get('/api/invoices', async (req, res) => {
  try {
    const { business_id } = req.query;
    console.log('Fetching invoices for business:', business_id);
    
    let query = db.selectFrom('invoices').selectAll();
    
    if (business_id) {
      query = query.where('business_id', '=', Number(business_id));
    }
    
    const invoices = await query.orderBy('created_at', 'desc').execute();
    console.log('Found invoices:', invoices.length);
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Create new invoice
app.post('/api/invoices', async (req, res) => {
  try {
    console.log('Creating invoice:', req.body);
    const {
      business_id,
      invoice_number,
      customer_name,
      customer_email,
      amount,
      due_date,
      invoice_date,
      description,
      funding_percentage = 80
    } = req.body;
    
    const fundedAmount = (parseFloat(amount) * (funding_percentage / 100)).toFixed(2);
    const feeAmount = (parseFloat(amount) * 0.03).toFixed(2); // 3% fee
    
    const result = await db
      .insertInto('invoices')
      .values({
        business_id: Number(business_id),
        invoice_number,
        customer_name,
        customer_email,
        amount: amount.toString(),
        due_date,
        invoice_date,
        description,
        funding_percentage: funding_percentage.toString(),
        funded_amount: fundedAmount,
        fee_amount: feeAmount,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .returning(['id'])
      .executeTakeFirst();
    
    console.log('Invoice created with ID:', result?.id);
    res.json({ id: result?.id, message: 'Invoice created successfully' });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// Update invoice status
app.patch('/api/invoices/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verification_status } = req.body;
    console.log('Updating invoice status:', { id, status, verification_status });
    
    const updateData: any = { updated_at: new Date().toISOString() };
    if (status) updateData.status = status;
    if (verification_status) updateData.verification_status = verification_status;
    
    await db
      .updateTable('invoices')
      .set(updateData)
      .where('id', '=', Number(id))
      .execute();
    
    console.log('Invoice status updated');
    res.json({ message: 'Invoice status updated successfully' });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'Failed to update invoice status' });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    console.log('Fetching dashboard stats');
    
    const totalInvoices = await db
      .selectFrom('invoices')
      .select(db.fn.count('id').as('count'))
      .executeTakeFirst();
    
    const pendingFunding = await db
      .selectFrom('invoices')
      .select(db.fn.sum('funded_amount').as('total'))
      .where('status', '=', 'verified')
      .executeTakeFirst();
    
    const totalFunded = await db
      .selectFrom('invoices')
      .select(db.fn.sum('funded_amount').as('total'))
      .where('status', '=', 'funded')
      .executeTakeFirst();
    
    const activeBusinesses = await db
      .selectFrom('businesses')
      .select(db.fn.count('id').as('count'))
      .executeTakeFirst();
    
    const stats = {
      totalInvoices: Number(totalInvoices?.count || 0),
      pendingFunding: parseFloat(pendingFunding?.total || '0'),
      totalFunded: parseFloat(totalFunded?.total || '0'),
      activeBusinesses: Number(activeBusinesses?.count || 0)
    };
    
    console.log('Dashboard stats:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Export a function to start the server
export async function startServer(port: string | number) {
  try {
    const portNumber = typeof port === 'string' ? parseInt(port, 10) : port;
    if (process.env.NODE_ENV === 'production') {
      setupStaticServing(app);
    }
    app.listen(portNumber, () => {
      console.log(`API Server running on port ${portNumber}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Start the server directly if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Starting server...');
  startServer(process.env.PORT || '3001');
}
