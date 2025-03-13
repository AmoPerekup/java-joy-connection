
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Coffee, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Edit,
  ShoppingCart,
  Heart,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const CUSTOMERS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    visits: 24,
    lastVisit: '2023-09-15',
    status: 'active',
    preferences: ['Cappuccino', 'Almond Milk', 'Low Sugar'],
    orders: [
      { id: 'ORD-001', date: '2023-09-15', total: '$12.99', status: 'complete' },
      { id: 'ORD-002', date: '2023-09-08', total: '$8.50', status: 'complete' },
      { id: 'ORD-003', date: '2023-08-30', total: '$15.75', status: 'complete' },
    ],
    notes: 'Prefers to be served by Maria. Sensitive to caffeine in the afternoon.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    phone: '(555) 987-6543',
    visits: 18,
    lastVisit: '2023-09-10',
    status: 'active',
    preferences: ['Americano', 'Black', 'Extra Shot'],
    orders: [
      { id: 'ORD-004', date: '2023-09-10', total: '$4.50', status: 'complete' },
      { id: 'ORD-005', date: '2023-09-03', total: '$9.25', status: 'complete' },
    ],
    notes: 'Always brings his laptop to work. Often stays for 3+ hours.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '(555) 234-5678',
    visits: 32,
    lastVisit: '2023-09-12',
    status: 'active',
    preferences: ['Latte', 'Oat Milk', 'Vanilla Syrup'],
    orders: [
      { id: 'ORD-006', date: '2023-09-12', total: '$7.50', status: 'complete' },
      { id: 'ORD-007', date: '2023-09-05', total: '$11.25', status: 'complete' },
      { id: 'ORD-008', date: '2023-08-29', total: '$14.75', status: 'complete' },
    ],
    notes: 'Celebrates birthday on October 15. Mentioned she likes our seasonal pumpkin spice items.'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '(555) 876-5432',
    visits: 9,
    lastVisit: '2023-08-30',
    status: 'inactive',
    preferences: ['Espresso', 'No Sugar'],
    orders: [
      { id: 'ORD-009', date: '2023-08-30', total: '$3.75', status: 'complete' },
      { id: 'ORD-010', date: '2023-08-23', total: '$3.75', status: 'complete' },
    ],
    notes: 'Usually in a rush. Prefers quick service.'
  },
  {
    id: 5,
    name: 'Jessica Lee',
    email: 'jessica.l@example.com',
    phone: '(555) 345-6789',
    visits: 15,
    lastVisit: '2023-09-08',
    status: 'active',
    preferences: ['Cold Brew', 'Caramel', 'Whipped Cream'],
    orders: [
      { id: 'ORD-011', date: '2023-09-08', total: '$5.50', status: 'complete' },
      { id: 'ORD-012', date: '2023-09-01', total: '$13.25', status: 'complete' },
    ],
    notes: 'Has a loyalty card. Very friendly with staff.'
  }
];

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const customerId = parseInt(id || '0');
  
  const customer = CUSTOMERS.find(c => c.id === customerId);
  
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Customer not found</h2>
        <p className="text-muted-foreground mb-6">The customer you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/customers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Customers
          </Link>
        </Button>
      </div>
    );
  }

  const initials = customer.name.split(' ').map(name => name[0]).join('');

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="h-8">
            <Link to="/customers">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">Customer Profile</h1>
        </div>
        <Button size="sm" className="gap-1 h-8">
          <Edit className="h-3.5 w-3.5 mr-1" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarFallback className="bg-coffee-100 text-coffee-700 text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <Badge 
                variant="outline" 
                className={cn(
                  "mt-2",
                  customer.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-700'
                )}
              >
                {customer.status}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-700">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 text-purple-700">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Visits</p>
                  <p className="font-medium">{customer.visits}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="font-medium">{customer.lastVisit}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <Heart className="h-4 w-4 text-rose-500" />
                Preferences
              </h3>
              <div className="flex flex-wrap gap-2">
                {customer.preferences.map((pref, i) => (
                  <Badge key={i} variant="outline" className="bg-coffee-100 text-coffee-700">
                    <Coffee className="h-3 w-3 mr-1" />
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="orders">
            <TabsList className="mb-4 bg-muted/50">
              <TabsTrigger value="orders" className="data-[state=active]:bg-white">Orders</TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-white">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.orders.map((order, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-secondary text-coffee-500">
                            <ShoppingCart className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total}</p>
                          <Badge variant="outline" className="bg-emerald-100 text-emerald-700">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Customer Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {customer.notes}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
