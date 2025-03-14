
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { CreditCard, DollarSign } from 'lucide-react';

const formSchema = z.object({
  supplier: z.string().min(1, { message: "Please select a supplier" }),
  items: z.string().min(3, { message: "Please enter item details" }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  deliveryDate: z.string().min(1, { message: "Please select a delivery date" }),
  paymentMethod: z.enum(["credit", "cash", "bank_transfer"], {
    required_error: "Please select a payment method",
  }),
});

type OrderFormValues = z.infer<typeof formSchema>;

interface CreateOrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data
const SUPPLIERS = [
  { id: 1, name: "Acme Coffee Beans" },
  { id: 2, name: "Sunrise Milk Supply" },
  { id: 3, name: "Sweet Delights Bakery" },
  { id: 4, name: "Premium Tea Imports" },
  { id: 5, name: "Coffee Equipment Co." },
];

const CreateOrderForm = ({ open, onOpenChange }: CreateOrderFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      items: "",
      amount: "",
      deliveryDate: "",
      paymentMethod: "credit",
    },
  });

  const onSubmit = (values: OrderFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call to create order
    console.log("Creating order:", values);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Order created",
        description: "Your order has been successfully placed.",
      });
      
      form.reset();
      onOpenChange(false);
      
      // Navigate to the orders page
      navigate("/orders");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SUPPLIERS.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Items</FormLabel>
                  <FormControl>
                    <Input placeholder="Colombian coffee beans (10kg), Filters (100pcs)" {...field} />
                  </FormControl>
                  <FormDescription>Enter the items you want to order</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Amount ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="250.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Delivery Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="credit">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          Credit Card
                        </div>
                      </SelectItem>
                      <SelectItem value="cash">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                          Cash
                        </div>
                      </SelectItem>
                      <SelectItem value="bank_transfer">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                          Bank Transfer
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderForm;
