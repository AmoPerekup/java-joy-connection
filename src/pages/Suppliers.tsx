
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SupplierList from '@/components/suppliers/SupplierList';

const Suppliers = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Suppliers</h1>
          <p className="text-muted-foreground">Manage your coffee shop suppliers and place orders.</p>
        </div>
        
        <SupplierList />
      </div>
    </PageLayout>
  );
};

export default Suppliers;
