
import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/card';

// This page will use the CustomerDetail component which is already created but marked as read-only

const CustomerDetailPage = () => {
  const { id } = useParams();
  
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Customer Details</h1>
          <p className="text-muted-foreground">Viewing detailed information for customer #{id}.</p>
        </div>
        
        <Card className="shadow-sm p-6">
          <p className="text-center text-muted-foreground">
            Customer detail component will be integrated here.
          </p>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CustomerDetailPage;
