
import { supabase } from '@/integrations/supabase/client';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  joindate: string; // Changed from joinDate, matches DB schema
  loyaltypoints?: number | null; // Changed from loyaltyPoints, matches DB schema and nullability
  preferences?: any | null; // Changed type to any for JSONB compatibility
  birthday?: string | null;
  created_at?: string;
}

export async function getAllCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
  
  // Ensure the returned data matches the Customer interface as much as possible.
  // Supabase client should handle type mapping based on src/integrations/supabase/types.ts
  return (data as any[] || []) as Customer[];
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching customer with id ${id}:`, error);
    throw error;
  }
  
  return (data as any || null) as Customer | null;
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'created_at'>): Promise<Customer> {
  // Ensure the object sent to Supabase has keys matching DB columns
  const customerDataForDb: any = { ...customer };
  if (customerDataForDb.loyaltyPoints !== undefined) {
    customerDataForDb.loyaltypoints = customerDataForDb.loyaltyPoints;
    delete customerDataForDb.loyaltyPoints;
  }
  if (customerDataForDb.joinDate !== undefined) {
    customerDataForDb.joindate = customerDataForDb.joinDate;
    delete customerDataForDb.joinDate;
  }

  const { data, error } = await supabase
    .from('customers')
    .insert([customerDataForDb])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
  
  return (data as any) as Customer;
}

export async function updateCustomer(id: number, updates: Partial<Customer>): Promise<Customer> {
  // Ensure the object sent to Supabase has keys matching DB columns
  const updateDataForDb: any = { ...updates };
  if (updateDataForDb.loyaltyPoints !== undefined) {
    updateDataForDb.loyaltypoints = updateDataForDb.loyaltyPoints;
    delete updateDataForDb.loyaltyPoints;
  }
  if (updateDataForDb.joinDate !== undefined) {
    updateDataForDb.joindate = updateDataForDb.joinDate;
    delete updateDataForDb.joinDate;
  }
  
  const { data, error } = await supabase
    .from('customers')
    .update(updateDataForDb)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating customer with id ${id}:`, error);
    throw error;
  }
  
  return (data as any) as Customer;
}

export async function deleteCustomer(id: number): Promise<void> {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting customer with id ${id}:`, error);
    throw error;
  }
}

