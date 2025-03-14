
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import MenuManagement from '@/components/menu/MenuManagement';

const Menu = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Menu</h1>
          <p className="text-muted-foreground">Manage your coffee shop menu items including drinks, desserts, and snacks.</p>
        </div>
        
        <MenuManagement />
      </div>
    </PageLayout>
  );
};

export default Menu;
