
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CustomerList from '@/components/customers/CustomerList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddCustomerForm from '@/components/customers/AddCustomerForm';

const Customers = () => {
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  
  const handleAddCustomer = () => {
    setAddCustomerOpen(true);
  };
  
  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Customers</h1>
            <p className="text-muted-foreground">Manage your coffee shop customers and their preferences.</p>
          </div>
          <Button onClick={handleAddCustomer}>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
        
        <CustomerList onAddCustomer={handleAddCustomer} />
        
        <AddCustomerForm
          open={addCustomerOpen}
          onOpenChange={setAddCustomerOpen}
        />
      </div>
    </PageLayout>
  );
};

export default Customers;
