
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CustomerList from '@/components/customers/CustomerList';

const Customers = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Customers</h1>
          <p className="text-muted-foreground">Manage your coffee shop customers and their preferences.</p>
        </div>
        
        <CustomerList />
      </div>
    </PageLayout>
  );
};

export default Customers;
