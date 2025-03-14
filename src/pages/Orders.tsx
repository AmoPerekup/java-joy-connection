
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateOrderForm from '@/components/orders/CreateOrderForm';

const Orders = () => {
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  
  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage your purchase orders with suppliers.</p>
          </div>
          <Button onClick={() => setCreateOrderOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Order
          </Button>
        </div>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">Recent Orders</CardTitle>
            <CardDescription>View and manage your recent purchase orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No orders have been placed yet.</p>
              <Button onClick={() => setCreateOrderOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Your First Order
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <CreateOrderForm
          open={createOrderOpen}
          onOpenChange={setCreateOrderOpen}
        />
      </div>
    </PageLayout>
  );
};

export default Orders;
