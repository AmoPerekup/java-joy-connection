import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Coffee, Candy, Pizza, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getAllMenuItems, createMenuItem, deleteMenuItem, MenuItem } from '@/services/menuItems';

const MenuManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'drinks',
    popular: false
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: menuItemsData = [], isLoading } = useQuery({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems
  });

  // Transform the flat array into categories
  const menuItems = {
    drinks: Array.isArray(menuItemsData) ? menuItemsData.filter(item => item.category === 'drinks') : [],
    desserts: Array.isArray(menuItemsData) ? menuItemsData.filter(item => item.category === 'desserts') : [],
    snacks: Array.isArray(menuItemsData) ? menuItemsData.filter(item => item.category === 'snacks') : []
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a name and price.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createMenuItem({
        name: newItem.name,
        price: parseFloat(newItem.price),
        description: newItem.description,
        category: newItem.category as 'drinks' | 'desserts' | 'snacks',
        popular: newItem.popular
      });

      toast({
        title: "Item Added",
        description: `${newItem.name} has been added to the menu.`
      });
      
      // Reset form and close dialog
      setNewItem({
        name: '',
        price: '',
        description: '',
        category: 'drinks',
        popular: false
      });
      
      setIsAddDialogOpen(false);
      
      // Refetch menu items
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add menu item. Please try again.",
        variant: "destructive"
      });
      console.error("Error adding menu item:", error);
    }
  };

  const handleDeleteItem = async (id: number | undefined, category: 'drinks' | 'desserts' | 'snacks') => {
    if (!id) return;
    
    try {
      await deleteMenuItem(id);
      
      toast({
        title: "Item Deleted",
        description: "The menu item has been removed."
      });
      
      // Refetch menu items
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete menu item. Please try again.",
        variant: "destructive"
      });
      console.error("Error deleting menu item:", error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'drinks':
        return <Coffee className="h-5 w-5" />;
      case 'desserts':
        return <Candy className="h-5 w-5" />;
      case 'snacks':
        return <Pizza className="h-5 w-5" />;
      default:
        return <Coffee className="h-5 w-5" />;
    }
  };

  const renderMenuItems = (items: MenuItem[], category: 'drinks' | 'desserts' | 'snacks') => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading menu items...</p>
        </div>
      );
    }
    
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No items found in this category</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="mt-1">${item.price.toFixed(2)}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteItem(item.id, category)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {item.popular && (
                <Badge className="mt-1 bg-amber-100 text-amber-800 hover:bg-amber-200">
                  Popular
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Menu Items</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Fill in the details for the new menu item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="Cappuccino" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  placeholder="4.75" 
                  type="number" 
                  step="0.01" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Describe the menu item..." 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value as any})}
                >
                  <option value="drinks">Drinks</option>
                  <option value="desserts">Desserts</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="popular" 
                  checked={newItem.popular}
                  onChange={(e) => setNewItem({...newItem, popular: e.target.checked})}
                  className="rounded border-gray-300" 
                />
                <Label htmlFor="popular">Mark as popular</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="drinks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drinks" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            Drinks
          </TabsTrigger>
          <TabsTrigger value="desserts" className="flex items-center gap-2">
            <Candy className="h-4 w-4" />
            Desserts
          </TabsTrigger>
          <TabsTrigger value="snacks" className="flex items-center gap-2">
            <Pizza className="h-4 w-4" />
            Snacks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="drinks">
          {renderMenuItems(menuItems.drinks, 'drinks')}
        </TabsContent>
        <TabsContent value="desserts">
          {renderMenuItems(menuItems.desserts, 'desserts')}
        </TabsContent>
        <TabsContent value="snacks">
          {renderMenuItems(menuItems.snacks, 'snacks')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagement;
