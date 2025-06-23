import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { FileText, DollarSign } from 'lucide-react';
import { useBusinesses } from '@/hooks/useBusinesses';

export function InvoiceSubmission() {
  const navigate = useNavigate();
  const { businesses, loading: businessesLoading } = useBusinesses();
  const [loading, setLoading] = React.useState(false);
  const [fundingPercentage, setFundingPercentage] = React.useState([80]);
  const [formData, setFormData] = React.useState({
    business_id: '',
    invoice_number: '',
    customer_name: '',
    customer_email: '',
    amount: '',
    due_date: '',
    invoice_date: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFunding = () => {
    const amount = parseFloat(formData.amount) || 0;
    const fundingAmount = amount * (fundingPercentage[0] / 100);
    const feeAmount = amount * 0.03; // 3% fee
    return { fundingAmount, feeAmount, netAmount: fundingAmount - feeAmount };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          funding_percentage: fundingPercentage[0]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit invoice');
      }

      navigate('/invoices');
    } catch (error) {
      console.error('Error submitting invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const { fundingAmount, feeAmount, netAmount } = calculateFunding();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Submit Invoice for Factoring</h1>
        <p className="text-muted-foreground">
          Get immediate funding for your accounts receivable
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
            <CardDescription>
              Provide information about the invoice you want to factor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business_id">Select Business</Label>
                <Select
                  value={formData.business_id}
                  onValueChange={(value) => handleInputChange('business_id', value)}
                  disabled={businessesLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem key={business.id} value={business.id.toString()}>
                        {business.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice_number">Invoice Number</Label>
                  <Input
                    id="invoice_number"
                    type="text"
                    value={formData.invoice_number}
                    onChange={(e) => handleInputChange('invoice_number', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Invoice Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Customer Name</Label>
                  <Input
                    id="customer_name"
                    type="text"
                    value={formData.customer_name}
                    onChange={(e) => handleInputChange('customer_name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customer_email">Customer Email</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => handleInputChange('customer_email', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice_date">Invoice Date</Label>
                  <Input
                    id="invoice_date"
                    type="date"
                    value={formData.invoice_date}
                    onChange={(e) => handleInputChange('invoice_date', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => handleInputChange('due_date', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of services/products"
                />
              </div>

              <div className="space-y-4">
                <Label>Funding Percentage: {fundingPercentage[0]}%</Label>
                <Slider
                  value={fundingPercentage}
                  onValueChange={setFundingPercentage}
                  max={90}
                  min={50}
                  step={5}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  Higher percentages may require additional verification
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Invoice'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Funding Preview</span>
            </CardTitle>
            <CardDescription>
              Estimated funding calculation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Invoice Amount</span>
                <span className="text-sm font-medium">
                  ${parseFloat(formData.amount || '0').toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Funding Rate</span>
                <span className="text-sm font-medium">{fundingPercentage[0]}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Funding Amount</span>
                <span className="text-sm font-medium">
                  ${fundingAmount.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between text-muted-foreground">
                <span className="text-sm">Platform Fee (3%)</span>
                <span className="text-sm">-${feeAmount.toLocaleString()}</span>
              </div>
              
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Net Amount</span>
                <span className="text-primary">
                  ${netAmount.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              * Final amounts may vary based on verification and risk assessment
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
