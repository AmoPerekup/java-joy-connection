
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Coffee, Truck, FileText, ShoppingCart, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({ icon, iconBg, title, description, time }: ActivityItemProps) => (
  <div className="flex items-start gap-4 py-3">
    <div className={cn("p-2 rounded-full shrink-0", iconBg)}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-sm text-muted-foreground truncate">{description}</p>
    </div>
    <div className="text-xs text-muted-foreground whitespace-nowrap">{time}</div>
  </div>
);

const RecentActivity = () => {
  const activities = [
    {
      icon: <Users className="h-4 w-4 text-white" />,
      iconBg: "bg-blue-500",
      title: "New Customer",
      description: "Sarah Johnson registered as a new customer",
      time: "2 hours ago"
    },
    {
      icon: <ShoppingCart className="h-4 w-4 text-white" />,
      iconBg: "bg-emerald-500",
      title: "New Order",
      description: "Order #1042 was placed for $86.42",
      time: "4 hours ago"
    },
    {
      icon: <Truck className="h-4 w-4 text-white" />,
      iconBg: "bg-amber-500",
      title: "Supplier Update",
      description: "Bean Suppliers Ltd. updated their price list",
      time: "Yesterday"
    },
    {
      icon: <Coffee className="h-4 w-4 text-white" />,
      iconBg: "bg-purple-500",
      title: "Product Added",
      description: "Added new product 'Ethiopian Yirgacheffe'",
      time: "Yesterday"
    },
    {
      icon: <DollarSign className="h-4 w-4 text-white" />,
      iconBg: "bg-rose-500",
      title: "Payment Processed",
      description: "Payment of $342.15 received from Acme Inc.",
      time: "2 days ago"
    },
    {
      icon: <FileText className="h-4 w-4 text-white" />,
      iconBg: "bg-slate-500",
      title: "Utility Bill",
      description: "Electricity bill of $240.56 paid",
      time: "3 days ago"
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 divide-y divide-border">
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
