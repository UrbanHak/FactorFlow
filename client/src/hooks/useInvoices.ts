import * as React from 'react';

interface Invoice {
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

export function useInvoices(businessId?: number) {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchInvoices = React.useCallback(async () => {
    try {
      setLoading(true);
      const url = businessId ? `/api/invoices?business_id=${businessId}` : '/api/invoices';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  const updateInvoiceStatus = React.useCallback(async (
    invoiceId: number, 
    updateData: { status?: string; verification_status?: string }
  ) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update invoice status');
      }

      // Refresh the invoices list
      await fetchInvoices();
    } catch (err) {
      console.error('Error updating invoice status:', err);
    }
  }, [fetchInvoices]);

  React.useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return { invoices, loading, error, updateInvoiceStatus, refetch: fetchInvoices };
}
