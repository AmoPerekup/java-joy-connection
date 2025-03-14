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
import { Edit, MoreHorizontal, Plus, Search, Trash, Truck, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const SUPPLIERS = [
  {
    id: 1,
    name: 'Bean Suppliers Ltd.',
    contact: 'John Smith',
    email: 'john@beansuppliers.com',
    phone: '(555) 123-4567',
    category: 'Coffee Beans',
    lastOrder: '2023-09-10',
    status: 'active'
  },
  {
    id: 2,
    name: 'Dairy Delights',
    contact: 'Emma Johnson',
    email: 'emma@dairydelights.com',
    phone: '(555) 234-5678',
    category: 'Dairy Products',
    lastOrder: '2023-09-08',
    status: 'active'
  },
  {
    id: 3,
    name: 'Sweet Treats Inc.',
    contact: 'Michael Brown',
    email: 'michael@sweettreats.com',
    phone: '(555) 345-6789',
    category: 'Pastries',
    lastOrder: '2023-09-05',
    status: 'active'
  },
  {
    id: 4,
    name: 'Cup & Lid Co.',
    contact: 'Sarah Wilson',
    email: 'sarah@cupandlid.com',
    phone: '(555) 456-7890',
    category: 'Packaging',
    lastOrder: '2023-08-28',
    status: 'inactive'
  },
  {
    id: 5,
    name: 'Flavor Essence',
    contact: 'David Lee',
    email: 'david@flavoressence.com',
    phone: '(555) 567-8901',
    category: 'Syrups',
    lastOrder: '2023-09-01',
    status: 'active'
  }
];

type SupplierListProps = {
  onAddSupplier?: () => void;
};

const SupplierList = ({ onAddSupplier }: SupplierListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSuppliers = SUPPLIERS.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (supplierId: number) => {
    toast({
      title: "Supplier deleted",
      description: `Supplier with ID ${supplierId} has been deleted.`,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold">Suppliers</CardTitle>
            <CardDescription>Manage your suppliers and orders.</CardDescription>
          </div>
          <Button className="sm:w-auto" onClick={onAddSupplier}>
            <Plus className="mr-2 h-4 w-4" /> Add Supplier
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
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
                <TableHead className="hidden lg:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Last Order</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">
                    <Link to={`/suppliers/${supplier.id}`} className="hover:text-coffee-600 font-medium">
                      {supplier.name}
                    </Link>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {supplier.contact}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>{supplier.contact}</div>
                    <div className="text-xs text-muted-foreground">{supplier.email}</div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {supplier.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div>{supplier.lastOrder}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        supplier.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      )}
                    >
                      {supplier.status}
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
                          <Link to={`/suppliers/${supplier.id}`} className="flex items-center">
                            <Truck className="h-4 w-4 mr-2" />
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/orders" className="flex items-center">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Place order
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit supplier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-rose-600 focus:text-rose-700"
                          onClick={() => handleDelete(supplier.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete supplier
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredSuppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No suppliers found. Try adjusting your search.
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

export default SupplierList;
