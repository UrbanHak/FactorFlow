import * as React from 'react';

interface Business {
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

export function useBusinesses() {
  const [businesses, setBusinesses] = React.useState<Business[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        const response = await fetch('/api/businesses');
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }
        const data = await response.json();
        setBusinesses(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, []);

  return { businesses, loading, error };
}
