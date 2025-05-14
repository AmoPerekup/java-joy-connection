
import { supabase } from '@/lib/supabase';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  loyaltyPoints: number;
  preferences?: string[];
  birthday?: string;
  address?: string;
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
  
  return data || [];
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
  
  return data;
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'created_at'>): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .insert([customer])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
  
  return data;
}

export async function updateCustomer(id: number, updates: Partial<Customer>): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating customer with id ${id}:`, error);
    throw error;
  }
  
  return data;
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
