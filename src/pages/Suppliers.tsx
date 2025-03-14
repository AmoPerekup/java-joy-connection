
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SupplierList from '@/components/suppliers/SupplierList';
import { Button } from '@/components/ui/button'; 
import { Plus } from 'lucide-react';
import AddSupplierForm from '@/components/suppliers/AddSupplierForm';

const Suppliers = () => {
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  
  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Suppliers</h1>
            <p className="text-muted-foreground">Manage your coffee shop suppliers.</p>
          </div>
          <Button onClick={() => setAddSupplierOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Supplier
          </Button>
        </div>
        
        <SupplierList />
        
        <AddSupplierForm
          open={addSupplierOpen}
          onOpenChange={setAddSupplierOpen}
        />
      </div>
    </PageLayout>
  );
};

export default Suppliers;
