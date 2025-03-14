
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Coffee, Plus, X, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock menu items data
const MENU_ITEMS = [
  { id: 1, name: 'Espresso', category: 'drinks' },
  { id: 2, name: 'Cappuccino', category: 'drinks' },
  { id: 3, name: 'Latte', category: 'drinks' },
  { id: 4, name: 'Americano', category: 'drinks' },
  { id: 5, name: 'Chocolate Cake', category: 'desserts' },
  { id: 6, name: 'Cheesecake', category: 'desserts' },
  { id: 7, name: 'Croissant', category: 'desserts' },
  { id: 8, name: 'Avocado Toast', category: 'snacks' },
  { id: 9, name: 'Granola Bar', category: 'snacks' },
  { id: 10, name: 'Fruit Cup', category: 'snacks' },
];

interface CustomerProductPreferencesProps {
  customerId: number;
  initialPreferences?: {id: number, name: string, category: string}[];
}

const CustomerProductPreferences = ({ customerId, initialPreferences = [] }: CustomerProductPreferencesProps) => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = (productId: number) => {
    const productToAdd = MENU_ITEMS.find(item => item.id === productId);
    
    if (!productToAdd) return;
    
    if (preferences.some(p => p.id === productId)) {
      toast({
        title: "Already Added",
        description: `${productToAdd.name} is already in the customer's preferences.`,
        variant: "destructive"
      });
      return;
    }
    
    setPreferences([...preferences, productToAdd]);
    setIsDialogOpen(false);
    
    toast({
      title: "Preference Added",
      description: `${productToAdd.name} has been added to customer's preferences.`
    });
  };

  const handleRemoveProduct = (productId: number) => {
    const productToRemove = MENU_ITEMS.find(item => item.id === productId);
    
    setPreferences(preferences.filter(p => p.id !== productId));
    
    toast({
      title: "Preference Removed",
      description: `${productToRemove?.name || 'Item'} has been removed from preferences.`
    });
  };

  const availableProducts = MENU_ITEMS.filter(
    item => !preferences.some(p => p.id === item.id)
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Product Preferences</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Product Preference</DialogTitle>
                <DialogDescription>
                  Select a product to add to this customer's preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
                {availableProducts.length > 0 ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Drinks</h3>
                      <div className="space-y-2">
                        {availableProducts
                          .filter(p => p.category === 'drinks')
                          .map(product => (
                            <div 
                              key={product.id}
                              className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                            >
                              <div className="flex items-center">
                                <Coffee className="h-4 w-4 mr-2 text-coffee-600" />
                                <span>{product.name}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleAddProduct(product.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Desserts</h3>
                      <div className="space-y-2">
                        {availableProducts
                          .filter(p => p.category === 'desserts')
                          .map(product => (
                            <div 
                              key={product.id}
                              className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                            >
                              <div className="flex items-center">
                                <Coffee className="h-4 w-4 mr-2 text-coffee-600" />
                                <span>{product.name}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleAddProduct(product.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Snacks</h3>
                      <div className="space-y-2">
                        {availableProducts
                          .filter(p => p.category === 'snacks')
                          .map(product => (
                            <div 
                              key={product.id}
                              className="flex justify-between items-center p-2 rounded-md hover:bg-muted"
                            >
                              <div className="flex items-center">
                                <Coffee className="h-4 w-4 mr-2 text-coffee-600" />
                                <span>{product.name}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleAddProduct(product.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No more products available to add
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {preferences.length > 0 ? (
          <div className="space-y-2">
            {preferences.map(product => (
              <div 
                key={product.id}
                className="flex justify-between items-center p-2 rounded-md bg-muted/50"
              >
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-rose-500" />
                  <span>{product.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No product preferences added yet</p>
            <p className="text-sm mt-1">Click "Add Product" to select customer favorites</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerProductPreferences;
