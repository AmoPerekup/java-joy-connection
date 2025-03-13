
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  Phone, 
  Mail, 
  Calendar, 
  Edit,
  ShoppingCart,
  Package,
  ArrowLeft,
  Building,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const SUPPLIERS = [
  {
    id: 1,
    name: 'Bean Suppliers Ltd.',
    contact: 'John Smith',
    email: 'john@beansuppliers.com',
    phone: '(555) 123-4567',
    address: '123 Coffee Road, Beanville, CA 90210',
    category: 'Coffee Beans',
    lastOrder: '2023-09-10',
    status: 'active',
    products: [
      { id: 'PR-001', name: 'Ethiopian Yirgacheffe', price: '$18.99/lb', stock: 'In Stock' },
      { id: 'PR-002', name: 'Colombian Supremo', price: '$15.99/lb', stock: 'In Stock' },
      { id: 'PR-003', name: 'Sumatra Mandheling', price: '$17.99/lb', stock: 'Low Stock' },
    ],
    orders: [
      { id: 'SO-001', date: '2023-09-10', total: '$950.00', status: 'delivered' },
      { id: 'SO-002', date: '2023-08-20', total: '$750.00', status: 'delivered' },
      { id: 'SO-003', date: '2023-08-05', total: '$1,200.00', status: 'delivered' },
    ],
    notes: 'Delivers every Monday and Thursday. Requires 48 hours notice for large orders.'
  },
  {
    id: 2,
    name: 'Dairy Delights',
    contact: 'Emma Johnson',
    email: 'emma@dairydelights.com',
    phone: '(555) 234-5678',
    address: '456 Milk Avenue, Dairytown, NY 10001',
    category: 'Dairy Products',
    lastOrder: '2023-09-08',
    status: 'active',
    products: [
      { id: 'PR-004', name: 'Organic Whole Milk', price: '$4.99/gal', stock: 'In Stock' },
      { id: 'PR-005', name: 'Almond Milk', price: '$3.99/half-gal', stock: 'In Stock' },
      { id: 'PR-006', name: 'Oat Milk', price: '$4.50/half-gal', stock: 'In Stock' },
    ],
    orders: [
      { id: 'SO-004', date: '2023-09-08', total: '$350.00', status: 'delivered' },
      { id: 'SO-005', date: '2023-09-01', total: '$325.00', status: 'delivered' },
    ],
    notes: 'Delivers twice weekly. Organic options available upon request.'
  },
  {
    id: 3,
    name: 'Sweet Treats Inc.',
    contact: 'Michael Brown',
    email: 'michael@sweettreats.com',
    phone: '(555) 345-6789',
    address: '789 Pastry Lane, Sweetville, IL 60007',
    category: 'Pastries',
    lastOrder: '2023-09-05',
    status: 'active',
    products: [
      { id: 'PR-007', name: 'Croissants', price: '$2.50/each', stock: 'In Stock' },
      { id: 'PR-008', name: 'Chocolate Muffins', price: '$2.75/each', stock: 'In Stock' },
      { id: 'PR-009', name: 'Cinnamon Rolls', price: '$3.25/each', stock: 'In Stock' },
    ],
    orders: [
      { id: 'SO-006', date: '2023-09-05', total: '$425.00', status: 'delivered' },
      { id: 'SO-007', date: '2023-08-29', total: '$375.00', status: 'delivered' },
    ],
    notes: 'Fresh baked goods delivered daily before 7am.'
  },
  {
    id: 4,
    name: 'Cup & Lid Co.',
    contact: 'Sarah Wilson',
    email: 'sarah@cupandlid.com',
    phone: '(555) 456-7890',
    address: '101 Packaging Blvd, Cuptown, WA 98001',
    category: 'Packaging',
    lastOrder: '2023-08-28',
    status: 'inactive',
    products: [
      { id: 'PR-010', name: '12oz Paper Cups', price: '$0.15/each', stock: 'In Stock' },
      { id: 'PR-011', name: '16oz Paper Cups', price: '$0.18/each', stock: 'In Stock' },
      { id: 'PR-012', name: 'Cup Lids', price: '$0.08/each', stock: 'Low Stock' },
    ],
    orders: [
      { id: 'SO-008', date: '2023-08-28', total: '$650.00', status: 'delivered' },
      { id: 'SO-009', date: '2023-08-14', total: '$750.00', status: 'delivered' },
    ],
    notes: 'Currently having supply chain issues. Order extra in advance.'
  },
  {
    id: 5,
    name: 'Flavor Essence',
    contact: 'David Lee',
    email: 'david@flavoressence.com',
    phone: '(555) 567-8901',
    address: '202 Syrup Street, Flavortown, OR 97201',
    category: 'Syrups',
    lastOrder: '2023-09-01',
    status: 'active',
    products: [
      { id: 'PR-013', name: 'Vanilla Syrup', price: '$8.99/bottle', stock: 'In Stock' },
      { id: 'PR-014', name: 'Caramel Syrup', price: '$8.99/bottle', stock: 'In Stock' },
      { id: 'PR-015', name: 'Hazelnut Syrup', price: '$9.99/bottle', stock: 'In Stock' },
    ],
    orders: [
      { id: 'SO-010', date: '2023-09-01', total: '$250.00', status: 'delivered' },
      { id: 'SO-011', date: '2023-08-18', total: '$300.00', status: 'delivered' },
    ],
    notes: 'Offers seasonal flavors with 2 weeks\' advance notice.'
  }
];

const SupplierDetail = () => {
  const { id } = useParams<{ id: string }>();
  const supplierId = parseInt(id || '0');
  
  const supplier = SUPPLIERS.find(s => s.id === supplierId);
  
  if (!supplier) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Supplier not found</h2>
        <p className="text-muted-foreground mb-6">The supplier you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/suppliers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Suppliers
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="h-8">
            <Link to="/suppliers">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">Supplier Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-1 h-8">
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            Place Order
          </Button>
          <Button size="sm" className="gap-1 h-8">
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">{supplier.name}</h2>
                <Badge 
                  variant="outline" 
                  className={cn(
                    supplier.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-700'
                  )}
                >
                  {supplier.status}
                </Badge>
              </div>
              <Badge variant="outline" className="w-fit bg-blue-100 text-blue-700 mb-3">
                {supplier.category}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{supplier.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-700">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{supplier.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 text-purple-700">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{supplier.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 text-amber-700">
                  <Building className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{supplier.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-rose-100 text-rose-700">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Order</p>
                  <p className="font-medium">{supplier.lastOrder}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium mb-3">Notes</h3>
              <p className="text-muted-foreground text-sm">
                {supplier.notes}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="products">
            <TabsList className="mb-4 bg-muted/50">
              <TabsTrigger value="products" className="data-[state=active]:bg-white">Products</TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-white">Order History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Available Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplier.products.map((product, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-secondary text-coffee-500">
                            <Package className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{product.price}</p>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              product.stock === 'In Stock'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            )}
                          >
                            {product.stock}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplier.orders.map((order, i) => (
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
                          <p className="font-medium flex items-center gap-1 justify-end">
                            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                            {order.total}
                          </p>
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
