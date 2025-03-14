
import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SupplierDetail from '@/components/suppliers/SupplierDetail';

const SupplierDetailPage = () => {
  const { id } = useParams();
  
  return (
    <PageLayout>
      <div className="space-y-8">
        <SupplierDetail />
      </div>
    </PageLayout>
  );
};

export default SupplierDetailPage;
