
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SupplierDetail from '@/components/suppliers/SupplierDetail';

const SupplierDetailPage = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <SupplierDetail />
      </div>
    </PageLayout>
  );
};

export default SupplierDetailPage;
