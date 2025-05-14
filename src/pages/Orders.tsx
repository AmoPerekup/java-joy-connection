
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, DollarSign, Truck } from 'lucide-react';
import CreateOrderForm from '@/components/orders/CreateOrderForm';
import { getAllOrders, Order } from '@/services/orders';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const statusColors = {
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  delivered: "bg-green-100 text-green-800 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200"
};

const Orders = () => {
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  
  const { data: orders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders
  });
  
  const handleOpenCreateOrder = () => {
    setCreateOrderOpen(true);
  };
  
  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage your purchase orders with suppliers.</p>
          </div>
          <Button onClick={handleOpenCreateOrder}>
            <Plus className="mr-2 h-4 w-4" /> New Order
          </Button>
        </div>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">Recent Orders</CardTitle>
            <CardDescription>View and manage your recent purchase orders.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading orders...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-8">
                <p className="text-destructive mb-2">Failed to load orders</p>
                <Button variant="outline" onClick={() => refetch()}>Try Again</Button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No orders have been placed yet.</p>
                <Button onClick={handleOpenCreateOrder}>
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Order
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {orders.map((order: any) => (
                  <div key={order.id} className="py-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium">Order for {order.suppliers?.name || "Unknown Supplier"}</h3>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(order.delivery_date), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${order.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
