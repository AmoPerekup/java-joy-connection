import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id?: number;
  supplier_id: number;
  items: string;
  amount: number;
  delivery_date: string;
  payment_method: 'credit' | 'cash' | 'bank_transfer';
  notes?: string;
  status: 'pending' | 'delivered' | 'cancelled';
  created_at?: string;
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: string;
  quantity: number;
  price: number;
  created_at?: string;
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, suppliers(name)')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
  
  return data || [];
}

export async function getOrderById(id: number): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, suppliers(name)')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
  
  return data;
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating order:', error);
    throw error;
  }
  
  return data;
}

export async function updateOrder(id: number, updates: Partial<Order>): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating order with id ${id}:`, error);
    throw error;
  }
  
  return data;
}

export async function deleteOrder(id: number): Promise<void> {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
}

export async function createOrderItems(items: Omit<OrderItem, 'id' | 'created_at'>[]): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('order_items')
    .insert(items)
    .select();
    
  if (error) {
    console.error('Error creating order items:', error);
    throw error;
  }
  
  return data || [];
}

export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select('*, supplier_products(name, unit)')
    .eq('order_id', orderId);
    
  if (error) {
    console.error(`Error fetching items for order ${orderId}:`, error);
    throw error;
  }
  
  return data || [];
}
