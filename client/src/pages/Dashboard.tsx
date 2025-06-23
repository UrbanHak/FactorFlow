import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DollarSign, FileText, Building2, TrendingUp } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboardStats';

export function Dashboard() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Loading your factoring overview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-destructive">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  const fundingProgress = stats ? ((stats.totalFunded / (stats.totalFunded + stats.pendingFunding)) * 100) || 0 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Your factoring portal for immediate cash flow solutions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalInvoices || 0}</div>
            <p className="text-xs text-muted-foreground">
              Submitted for factoring
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Funding</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats?.pendingFunding.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats?.totalFunded.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully funded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Businesses</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeBusinesses || 0}</div>
            <p className="text-xs text-muted-foreground">
              Registered on platform
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Funding Progress</CardTitle>
            <CardDescription>
              Track your overall funding performance
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Funding Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {fundingProgress.toFixed(1)}%
                  </span>
                </div>
                <Progress value={fundingProgress} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                ${stats?.totalFunded.toLocaleString() || '0'} funded out of ${((stats?.totalFunded || 0) + (stats?.pendingFunding || 0)).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>
              Key factoring metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Average Invoice</span>
                <span className="text-sm font-medium">
                  ${stats?.totalInvoices ? ((stats.totalFunded + stats.pendingFunding) / stats.totalInvoices).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Funding Rate</span>
                <span className="text-sm font-medium">80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Platform Fee</span>
                <span className="text-sm font-medium">3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
