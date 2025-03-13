
import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import CustomerDetail from '@/components/customers/CustomerDetail';

const CustomerDetailPage = () => {
  const { id } = useParams();
  
  return (
    <PageLayout>
      <div className="space-y-8">
        <CustomerDetail />
      </div>
    </PageLayout>
  );
};

export default CustomerDetailPage;
