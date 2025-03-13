
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Index = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your coffee shop CRM system.</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Add sales chart or other content here in the future */}
            <div className="border rounded-lg p-6 h-[400px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground text-center">
                Sales chart will be available here soon
              </p>
            </div>
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
