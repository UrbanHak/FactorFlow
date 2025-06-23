import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, User, FileText, Percent } from 'lucide-react';

interface InvoiceDetailsProps {
  invoice: any;
  onClose: () => void;
}

export function InvoiceDetails({ invoice, onClose }: InvoiceDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'funded':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'paid':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Invoice #{invoice.invoice_number}</span>
          </DialogTitle>
          <DialogDescription>
            Detailed information about your factoring request
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Customer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium">Name</span>
                <p className="text-sm text-muted-foreground">{invoice.customer_name}</p>
              </div>
              {invoice.customer_email && (
                <div>
                  <span className="text-sm font-medium">Email</span>
                  <p className="text-sm text-muted-foreground">{invoice.customer_email}</p>
                </div>
              )}
              {invoice.description && (
                <div>
                  <span className="text-sm font-medium">Description</span>
                  <p className="text-sm text-muted-foreground">{invoice.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium">Invoice Date</span>
                <p className="text-sm text-muted-foreground">
                  {new Date(invoice.invoice_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">Due Date</span>
                <p className="text-sm text-muted-foreground">
                  {new Date(invoice.due_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">Submitted</span>
                <p className="text-sm text-muted-foreground">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Financial Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Invoice Amount</span>
                <span className="text-sm">
                  ${parseFloat(invoice.amount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Funding Rate</span>
                <span className="text-sm">{invoice.funding_percentage}%</span>
              </div>
              {invoice.funded_amount && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Funded Amount</span>
                  <span className="text-sm text-green-600">
                    ${parseFloat(invoice.funded_amount).toLocaleString()}
                  </span>
                </div>
              )}
              {invoice.fee_amount && (
                <div className="flex justify-between text-muted-foreground">
                  <span className="text-sm">Platform Fee</span>
                  <span className="text-sm">
                    ${parseFloat(invoice.fee_amount).toLocaleString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Percent className="h-4 w-4" />
                <span>Status & Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium">Processing Status</span>
                <div className="mt-1">
                  <Badge className={getStatusColor(invoice.status)}>
                    <span className="capitalize">{invoice.status}</span>
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Verification Status</span>
                <div className="mt-1">
                  <Badge className={getStatusColor(invoice.verification_status)}>
                    <span className="capitalize">{invoice.verification_status}</span>
                  </Badge>
                </div>
              </div>
              {invoice.smart_contract_address && (
                <div>
                  <span className="text-sm font-medium">Smart Contract</span>
                  <p className="text-sm text-muted-foreground font-mono">
                    {invoice.smart_contract_address}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
