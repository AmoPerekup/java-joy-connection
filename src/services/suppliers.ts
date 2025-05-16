
import { supabase } from '@/integrations/supabase/client'; // Changed import

export interface Supplier {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  created_at?: string;
}

export interface SupplierProduct {
  id?: string;
  supplier_id: number;
  name: string;
  price: number;
  unit: string;
  created_at?: string;
}

export async function getAllSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
  
  return data || [];
}

export async function getSupplierById(id: number): Promise<Supplier | null> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching supplier with id ${id}:`, error);
    throw error;
  }
  
  return data;
}

export async function createSupplier(supplier: Omit<Supplier, 'id' | 'created_at'>): Promise<Supplier> {
  const { data, error } = await supabase
    .from('suppliers')
    .insert([supplier])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
  
  return data;
}

export async function updateSupplier(id: number, updates: Partial<Supplier>): Promise<Supplier> {
  const { data, error } = await supabase
    .from('suppliers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating supplier with id ${id}:`, error);
    throw error;
  }
  
  return data;
}

export async function deleteSupplier(id: number): Promise<void> {
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting supplier with id ${id}:`, error);
    throw error;
  }
}

export async function getSupplierProducts(supplierId: number): Promise<SupplierProduct[]> {
  const { data, error } = await supabase
    .from('supplier_products')
    .select('*')
    .eq('supplier_id', supplierId)
    .order('name');
    
  if (error) {
    console.error(`Error fetching products for supplier ${supplierId}:`, error);
    throw error;
  }
  
  return data || [];
}

export async function addSupplierProduct(product: Omit<SupplierProduct, 'id' | 'created_at'>): Promise<SupplierProduct> {
  const { data, error } = await supabase
    .from('supplier_products')
    .insert([product])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating supplier product:', error);
    throw error;
  }
  
  return data;
}
