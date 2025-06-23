import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { Dashboard } from '@/pages/Dashboard';
import { InvoiceSubmission } from '@/pages/InvoiceSubmission';
import { InvoiceManagement } from '@/pages/InvoiceManagement';
import { BusinessRegistration } from '@/pages/BusinessRegistration';
import { Navigation } from '@/components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <Dashboard />
              </main>
            </>
          } />
          <Route path="/register" element={
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <BusinessRegistration />
              </main>
            </>
          } />
          <Route path="/submit-invoice" element={
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <InvoiceSubmission />
              </main>
            </>
          } />
          <Route path="/invoices" element={
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <InvoiceManagement />
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
