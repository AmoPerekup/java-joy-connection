
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Utilities = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Utilities</h1>
            <p className="text-muted-foreground">Track and manage your coffee shop's utility bills.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Payment
          </Button>
        </div>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-medium">Utility Payments</CardTitle>
            <CardDescription>Monitor your shop's utility expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No utility payments have been recorded yet.</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Record Your First Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Utilities;
