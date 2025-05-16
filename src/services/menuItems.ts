
import { supabase } from '@/integrations/supabase/client'; // Changed import

export interface MenuItem {
  id?: number;
  name: string;
  price: number;
  description: string;
  category: 'drinks' | 'desserts' | 'snacks';
  popular: boolean;
  created_at?: string;
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
  
  return data || [];
}

export async function getMenuItemsByCategory(category: MenuItem['category']): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('category', category)
    .order('name');
    
  if (error) {
    console.error(`Error fetching menu items for category ${category}:`, error);
    throw error;
  }
  
  return data || [];
}

export async function createMenuItem(item: Omit<MenuItem, 'id' | 'created_at'>): Promise<MenuItem> {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([item])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating menu item:', error);
    throw error;
  }
  
  return data;
}

export async function updateMenuItem(id: number, updates: Partial<MenuItem>): Promise<MenuItem> {
  const { data, error } = await supabase
    .from('menu_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating menu item with id ${id}:`, error);
    throw error;
  }
  
  return data;
}

export async function deleteMenuItem(id: number): Promise<void> {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting menu item with id ${id}:`, error);
    throw error;
  }
}
