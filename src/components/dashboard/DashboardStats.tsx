
import React from 'react';
import { Users, Coffee, Truck, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
  isPositive?: boolean;
  isLoading?: boolean;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  isPositive = true,
  isLoading = false,
  className,
}: StatCardProps) => (
  <Card className={cn("overflow-hidden hover-lift", className)}>
    <CardContent className="p-6">
      {isLoading ? (
        <div className="shimmer space-y-3">
          <div className="h-4 w-1/2 rounded-full bg-muted"></div>
          <div className="h-8 w-2/3 rounded-full bg-muted"></div>
          <div className="h-3 w-1/3 rounded-full bg-muted"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <span className="p-2 rounded-full bg-secondary/50 text-coffee-600">
              {icon}
            </span>
          </div>
          <p className="text-2xl font-semibold mb-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  isPositive ? "text-emerald-600" : "text-rose-600"
                )}
              >
                {trendValue}
              </span>
              <span className="text-xs text-muted-foreground">{trend}</span>
            </div>
          )}
        </>
      )}
    </CardContent>
  </Card>
);

const DashboardStats = ({ isLoading = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <StatCard
        title="Total Customers"
        value="248"
        icon={<Users className="h-5 w-5" />}
        trend="vs. previous month"
        trendValue="+12.5%"
        isPositive={true}
        isLoading={isLoading}
        className="border-l-4 border-l-blue-500"
      />
      <StatCard
        title="Products Sold"
        value="1,024"
        icon={<Coffee className="h-5 w-5" />}
        trend="vs. previous month"
        trendValue="+8.2%"
        isPositive={true}
        isLoading={isLoading}
        className="border-l-4 border-l-amber-500"
      />
      <StatCard
        title="Active Suppliers"
        value="16"
        icon={<Truck className="h-5 w-5" />}
        trend="vs. previous month"
        trendValue="No change"
        isLoading={isLoading}
        className="border-l-4 border-l-emerald-500"
      />
      <StatCard
        title="Monthly Revenue"
        value="$12,426"
        icon={<DollarSign className="h-5 w-5" />}
        trend="vs. previous month"
        trendValue="-2.4%"
        isPositive={false}
        isLoading={isLoading}
        className="border-l-4 border-l-purple-500"
      />
    </div>
  );
};

export default DashboardStats;
