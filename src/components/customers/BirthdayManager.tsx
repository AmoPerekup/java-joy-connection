
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  giftAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Gift amount must be a positive number",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters",
  }),
});

interface BirthdayManagerProps {
  customerId: number;
  customerName: string;
  birthdate: string | null;
  email: string;
}

const BirthdayManager = ({ customerId, customerName, birthdate, email }: BirthdayManagerProps) => {
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      giftAmount: "10",
      message: `Happy Birthday, ${customerName}! Here's a special discount just for you.`
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      
      toast({
        title: "Birthday gift sent!",
        description: `Successfully sent a $${values.giftAmount} gift discount to ${customerName}.`,
      });
      
      console.log("Sent birthday gift:", {
        customerId,
        amount: values.giftAmount,
        message: values.message,
        sentTo: email
      });
    }, 1500);
  };

  if (!birthdate) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Birthday Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">No birthday information recorded for this customer.</p>
          <Button variant="outline">Add Birthday</Button>
        </CardContent>
      </Card>
    );
  }

  const birthdateObj = new Date(birthdate);
  const today = new Date();
  const thisYearBirthday = new Date(today.getFullYear(), birthdateObj.getMonth(), birthdateObj.getDate());
  const isBirthdayPassed = thisYearBirthday < today;
  const nextBirthday = isBirthdayPassed 
    ? new Date(today.getFullYear() + 1, birthdateObj.getMonth(), birthdateObj.getDate())
    : thisYearBirthday;

  // Format the date nicely
  const formattedBirthdate = birthdateObj.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
  
  // Calculate days until next birthday
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Birthday Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-amber-100 text-amber-700">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Birth Date</p>
            <p className="font-medium">{formattedBirthdate}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {daysUntilBirthday === 0 
                ? "Today is their birthday! 🎉" 
                : `${daysUntilBirthday} days until next birthday`}
            </p>
          </div>
        </div>

        {daysUntilBirthday <= 7 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Send Birthday Gift</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="giftAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gift Amount ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birthday Message</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Birthday Gift"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BirthdayManager;
