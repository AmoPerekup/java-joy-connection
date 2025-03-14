
import React, { useState } from 'react';
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

// Mock data for menu items by category
const INITIAL_MENU_ITEMS = {
  drinks: [
    { id: 1, name: 'Espresso', price: 3.50, description: 'Strong black coffee', popular: true },
    { id: 2, name: 'Cappuccino', price: 4.75, description: 'Espresso with steamed milk and foam', popular: true },
    { id: 3, name: 'Latte', price: 4.50, description: 'Espresso with steamed milk', popular: false },
    { id: 4, name: 'Americano', price: 3.75, description: 'Espresso with hot water', popular: false },
  ],
  desserts: [
    { id: 5, name: 'Chocolate Cake', price: 5.50, description: 'Rich chocolate cake with ganache', popular: true },
    { id: 6, name: 'Cheesecake', price: 5.75, description: 'New York style cheesecake', popular: true },
    { id: 7, name: 'Croissant', price: 3.25, description: 'Buttery, flaky pastry', popular: false },
  ],
  snacks: [
    { id: 8, name: 'Avocado Toast', price: 6.50, description: 'Sourdough bread with avocado spread', popular: false },
    { id: 9, name: 'Granola Bar', price: 2.75, description: 'Oats, honey, and mixed nuts', popular: true },
    { id: 10, name: 'Fruit Cup', price: 4.25, description: 'Selection of fresh seasonal fruits', popular: false },
  ]
};

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'drinks',
    popular: false
  });
  const { toast } = useToast();

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a name and price.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(
      ...menuItems.drinks.map(item => item.id),
      ...menuItems.desserts.map(item => item.id),
      ...menuItems.snacks.map(item => item.id)
    ) + 1;

    const itemToAdd = {
      id: newId,
      name: newItem.name,
      price: parseFloat(newItem.price),
      description: newItem.description,
      popular: newItem.popular
    };

    setMenuItems(prev => ({
      ...prev,
      [newItem.category]: [...prev[newItem.category], itemToAdd]
    }));

    setNewItem({
      name: '',
      price: '',
      description: '',
      category: 'drinks',
      popular: false
    });

    setIsAddDialogOpen(false);
    
    toast({
      title: "Item Added",
      description: `${itemToAdd.name} has been added to the menu.`
    });
  };

  const handleDeleteItem = (id: number, category: 'drinks' | 'desserts' | 'snacks') => {
    setMenuItems(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));

    toast({
      title: "Item Deleted",
      description: "The menu item has been removed."
    });
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

  const renderMenuItems = (items: any[], category: 'drinks' | 'desserts' | 'snacks') => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {items.map(item => (
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
