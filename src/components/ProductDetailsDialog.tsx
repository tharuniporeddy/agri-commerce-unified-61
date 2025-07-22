import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  user_id: string;
  created_at: string;
}

interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onAddToCart?: (productId: string) => void;
  onBuyNow?: (productId: string) => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  open,
  onOpenChange,
  product,
  onAddToCart,
  onBuyNow,
}) => {
  const [farmerName, setFarmerName] = useState('');

  useEffect(() => {
    if (product?.user_id) {
      fetchFarmerDetails(product.user_id);
    }
  }, [product]);

  const fetchFarmerDetails = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setFarmerName(data?.display_name || 'Unknown Farmer');
    } catch (error) {
      console.error('Error fetching farmer details:', error);
      setFarmerName('Unknown Farmer');
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Image */}
          {product.image_url && (
            <div className="w-full h-64 overflow-hidden rounded-lg">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price}
              </span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {product.quantity} kg available
              </Badge>
            </div>

            {/* Farmer Information */}
            <div className="flex items-center space-x-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Sold by: <strong>{farmerName}</strong></span>
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <h3 className="font-semibold">Product Description</h3>
              <p className="text-muted-foreground">
                Fresh {product.name.toLowerCase()} directly from the farm. 
                High quality produce grown with care and harvested at the perfect time. 
                Rich in nutrients and bursting with natural flavor.
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <span className="font-medium">Category:</span>
                <p className="text-muted-foreground">Fresh Produce</p>
              </div>
              <div>
                <span className="font-medium">Listed on:</span>
                <p className="text-muted-foreground">
                  {new Date(product.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => onAddToCart?.(product.id)}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              onClick={() => onBuyNow?.(product.id)}
              className="flex-1"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;