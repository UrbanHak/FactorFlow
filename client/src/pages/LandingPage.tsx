import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  DollarSign, 
  Clock, 
  Shield, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Banknote,
  FileText,
  Zap
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3 bg-primary/10 rounded-full px-6 py-3">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">FactorFlow</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Turn Your Invoices Into Immediate Cash Flow
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stop waiting 30-90 days for payments. Get up to 90% of your invoice value within 24 hours 
              with our blockchain-powered factoring platform designed for small businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/register">
                  Start Factoring Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/dashboard">
                  View Dashboard
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">24hrs</div>
                <div className="text-muted-foreground">Average funding time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">90%</div>
                <div className="text-muted-foreground">Max advance rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">3%</div>
                <div className="text-muted-foreground">Platform fee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Cash Flow Challenges Are Killing Small Businesses
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Limited cash flow is a leading cause of small business failure, with estimates suggesting 
              that up to 82% of small businesses fail due to poor cash flow management.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <CardTitle>Long Payment Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Waiting 30-90 days for customer payments while expenses pile up daily
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <CardTitle>Growth Limitations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unable to take on new projects or expand operations due to cash constraints
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <DollarSign className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <CardTitle>Emergency Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Struggling to cover payroll, rent, and supplies while waiting for payments
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The FactorFlow Solution
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform your outstanding invoices into immediate working capital with our 
              blockchain-verified factoring platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">How Invoice Factoring Works</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Submit Your Invoice</h4>
                    <p className="text-muted-foreground">Upload your verified B2B invoices to our secure platform</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Instant Verification</h4>
                    <p className="text-muted-foreground">Our AI verifies invoice authenticity and customer creditworthiness</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Get Immediate Funding</h4>
                    <p className="text-muted-foreground">Receive 80-90% of invoice value within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">We Collect Payment</h4>
                    <p className="text-muted-foreground">We handle collection when your customer pays, you keep the rest</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 text-center">Funding Example</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Invoice Amount:</span>
                  <span className="font-bold">$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Advance Rate (85%):</span>
                  <span className="font-bold text-green-600">$8,500</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Platform Fee (3%):</span>
                  <span>-$300</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold text-primary">
                  <span>You Receive:</span>
                  <span>$8,200</span>
                </div>
                <div className="text-sm text-muted-foreground text-center mt-4">
                  Funds available within 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose FactorFlow?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for small businesses with transparency, speed, and reliability at our core
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Get funding in 24 hours or less with our streamlined verification process
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Blockchain Verified</CardTitle>
                <CardDescription>
                  Smart contracts ensure transparency and automatic payment processing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Banknote className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Competitive Rates</CardTitle>
                <CardDescription>
                  Low 3% platform fee with advance rates up to 90% of invoice value
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>No Hidden Fees</CardTitle>
                <CardDescription>
                  Transparent pricing with no setup fees, monthly minimums, or long-term contracts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Credit Protection</CardTitle>
                <CardDescription>
                  We handle collections and credit risk, protecting your customer relationships
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Scale Your Business</CardTitle>
                <CardDescription>
                  Take on larger projects and grow faster with improved cash flow management
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transform Your Business Cash Flow
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of small businesses that have improved their cash flow 
                and accelerated growth with FactorFlow.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>Improve cash flow immediately</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>Take on larger projects with confidence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>Reduce administrative burden</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>Protect customer relationships</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>Scale operations without debt</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join FactorFlow today and turn your invoices into immediate working capital.
              </p>
              
              <div className="space-y-4">
                <Button size="lg" className="w-full text-lg" asChild>
                  <Link to="/register">
                    Register Your Business
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/submit-invoice">
                    Submit Your First Invoice
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground text-center">
                No setup fees • No long-term contracts • Get started in minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FactorFlow</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 FactorFlow. Empowering small businesses with immediate cash flow solutions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
