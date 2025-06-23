import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, FileText, PlusCircle, BarChart3, Home } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FactorFlow</span>
            </Link>
            
            <div className="flex space-x-4">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>
              
              <Button
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
              
              <Button
                variant={isActive('/submit-invoice') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/submit-invoice" className="flex items-center space-x-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Submit Invoice</span>
                </Link>
              </Button>
              
              <Button
                variant={isActive('/invoices') ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to="/invoices" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Manage Invoices</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/register">Register Business</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
