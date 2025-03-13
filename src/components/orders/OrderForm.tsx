
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  DollarSign, 
  CalendarClock, 
  Truck,
  Coffee,
  Package,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const SUPPLIERS = [
  {
    id: 1,
    name: 'Bean Suppliers Ltd.',
    products: [
      { id: 'PR-001', name: 'Ethiopian Yirgacheffe', price: 18.99, unit: 'lb' },
      { id: 'PR-002', name: 'Colombian Supremo', price: 15.99, unit: 'lb' },
      { id: 'PR-003', name: 'Sumatra Mandheling', price: 17.99, unit: 'lb' },
    ]
  },
  {
    id: 2,
    name: 'Dairy Delights',
    products: [
      { id: 'PR-004', name: 'Organic Whole Milk', price: 4.99, unit: 'gal' },
      { id: 'PR-005', name: 'Almond Milk', price: 3.99, unit: 'half-gal' },
      { id: 'PR-006', name: 'Oat Milk', price: 4.50, unit: 'half-gal' },
    ]
  },
  {
    id: 3,
    name: 'Sweet Treats Inc.',
    products: [
      { id: 'PR-007', name: 'Croissants', price: 2.50, unit: 'each' },
      { id: 'PR-008', name: 'Chocolate Muffins', price: 2.75, unit: 'each' },
      { id: 'PR-009', name: 'Cinnamon Rolls', price: 3.25, unit: 'each' },
    ]
  },
  {
    id: 4,
    name: 'Cup & Lid Co.',
    products: [
      { id: 'PR-010', name: '12oz Paper Cups', price: 0.15, unit: 'each' },
      { id: 'PR-011', name: '16oz Paper Cups', price: 0.18, unit: 'each' },
      { id: 'PR-012', name: 'Cup Lids', price: 0.08, unit: 'each' },
    ]
  },
  {
    id: 5,
    name: 'Flavor Essence',
    products: [
      { id: 'PR-013', name: 'Vanilla Syrup', price: 8.99, unit: 'bottle' },
      { id: 'PR-014', name: 'Caramel Syrup', price: 8.99, unit: 'bottle' },
      { id: 'PR-015', name: 'Hazelnut Syrup', price: 9.99, unit: 'bottle' },
    ]
  }
];

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

const OrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const initialSupplierId = id ? parseInt(id) : undefined;
  const [supplierId, setSupplierId] = useState<number | undefined>(initialSupplierId);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState('');
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const handleAddItem = (product: Product) => {
    const existingItem = orderItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setOrderItems(
        orderItems.map(item => 
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems([...orderItems, { product, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setOrderItems(
      orderItems.map(item => 
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Add tax or shipping if needed
    return subtotal;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supplierId) {
      toast({
        title: "Error",
        description: "Please select a supplier",
        variant: "destructive",
      });
      return;
    }
    
    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to the order",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would submit the order to your backend
    toast({
      title: "Order placed successfully",
      description: `Your order has been placed with ${SUPPLIERS.find(s => s.id === supplierId)?.name}`,
    });
    
    // Clear the form
    setOrderItems([]);
    setNotes('');
    setExpectedDelivery('');
    setPaymentMethod('');
    
    // Navigate back to the suppliers page
    navigate('/suppliers');
  };

  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Place an Order</CardTitle>
          <CardDescription>Order products from your suppliers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <Label htmlFor="supplier" className="mb-2 block">Supplier</Label>
                  <Select
                    value={supplierId?.toString()}
                    onValueChange={(value) => setSupplierId(parseInt(value))}
                  >
                    <SelectTrigger id="supplier" className="w-full">
                      <SelectValue placeholder="Select a supplier" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white">
                      {SUPPLIERS.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {supplierId && (
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Package className="h-4 w-4 text-coffee-600" />
                      Available Products
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SUPPLIERS.find(s => s.id === supplierId)?.products.map((product) => (
                        <div
                          key={product.id}
                          className="p-3 border border-border rounded-md flex justify-between items-center hover:bg-secondary/30 transition-colors"
                        >
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ${product.price.toFixed(2)} per {product.unit}
                            </p>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleAddItem(product)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <div className="mb-4">
                    <Label htmlFor="delivery-date" className="mb-2 block">Expected Delivery</Label>
                    <div className="relative">
                      <CalendarClock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="delivery-date"
                        type="date"
                        placeholder="Select a date"
                        className="pl-10"
                        value={expectedDelivery}
                        onChange={(e) => setExpectedDelivery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="payment-method" className="mb-2 block">Payment Method</Label>
                    <Select
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <SelectTrigger id="payment-method" className="w-full">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="cash">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="mb-2 block">Order Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any special instructions..."
                      className="min-h-[100px]"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium flex items-center gap-2 mb-4">
                  <ShoppingCart className="h-4 w-4 text-coffee-600" />
                  Order Summary
                </h3>

                {orderItems.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {orderItems.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${item.product.price.toFixed(2)} per {item.product.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="text-right ml-4 min-w-[80px]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/30 border border-dashed border-border rounded-md p-6 text-center mb-6">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground mb-1">Your order is empty</p>
                    <p className="text-xs text-muted-foreground">
                      {supplierId 
                        ? "Select products from the list on the left." 
                        : "Select a supplier to view available products."}
                    </p>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between py-2 border-t border-border">
                    <span className="font-medium">Subtotal:</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-border">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={orderItems.length === 0 || !supplierId}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Place Order
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderForm;
