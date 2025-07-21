import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onOpenChange,
  onProductAdded,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          image_url: formData.image_url || null,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Product added successfully!",
        description: `${formData.name} has been added to the marketplace.`,
      });

      // Reset form
      setFormData({
        name: '',
        price: '',
        quantity: '',
        image_url: '',
      });

      onProductAdded();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error adding product",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="e.g., Fresh Tomatoes"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price per kg (₹)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="50.00"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="100"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL (optional)</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="shadow-button"
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;