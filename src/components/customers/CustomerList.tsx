
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Plus, Search, Trash, Coffee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

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
    preferences: ['Cappuccino', 'Almond Milk', 'Low Sugar']
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    phone: '(555) 987-6543',
    visits: 18,
    lastVisit: '2023-09-10',
    status: 'active',
    preferences: ['Americano', 'Black', 'Extra Shot']
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '(555) 234-5678',
    visits: 32,
    lastVisit: '2023-09-12',
    status: 'active',
    preferences: ['Latte', 'Oat Milk', 'Vanilla Syrup']
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '(555) 876-5432',
    visits: 9,
    lastVisit: '2023-08-30',
    status: 'inactive',
    preferences: ['Espresso', 'No Sugar']
  },
  {
    id: 5,
    name: 'Jessica Lee',
    email: 'jessica.l@example.com',
    phone: '(555) 345-6789',
    visits: 15,
    lastVisit: '2023-09-08',
    status: 'active',
    preferences: ['Cold Brew', 'Caramel', 'Whipped Cream']
  }
];

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastVisit: string;
  status: string;
  preferences: string[];
}

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = CUSTOMERS.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  const handleDelete = (customerId: number) => {
    toast({
      title: "Customer deleted",
      description: `Customer with ID ${customerId} has been deleted.`,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold">Customers</CardTitle>
            <CardDescription>Manage your customer base and their preferences.</CardDescription>
          </div>
          <Button className="sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Preferences</TableHead>
                <TableHead className="hidden sm:table-cell">Visits</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <Link to={`/customers/${customer.id}`} className="hover:text-coffee-600 font-medium">
                      {customer.name}
                    </Link>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>{customer.email}</div>
                    <div className="text-xs text-muted-foreground">{customer.phone}</div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {customer.preferences.map((pref, i) => (
                        <Badge key={i} variant="outline" className="bg-coffee-100 text-coffee-700 hover:bg-coffee-200">
                          <Coffee className="h-3 w-3 mr-1" />
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div>{customer.visits}</div>
                    <div className="text-xs text-muted-foreground">Last: {customer.lastVisit}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        customer.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      )}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link to={`/customers/${customer.id}`} className="flex items-center">
                            <Coffee className="h-4 w-4 mr-2" />
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-rose-600 focus:text-rose-700"
                          onClick={() => handleDelete(customer.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No customers found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerList;
