import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onCartUpdated: () => void;
}

const CartDialog: React.FC<CartDialogProps> = ({
  open,
  onOpenChange,
  cartItems,
  onCartUpdated,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return removeItem(itemId);
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      onCartUpdated();
    } catch (error: any) {
      toast({
        title: "Error updating cart",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      onCartUpdated();
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error: any) {
      toast({
        title: "Error removing item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const checkout = async () => {
    if (!user || cartItems.length === 0) return;

    try {
      // Create orders for all cart items
      const orders = cartItems.map(item => ({
        user_id: user.id,
        product_id: item.product_id,
        quantity: item.quantity,
        status: 'pending'
      }));

      const { error: orderError } = await supabase
        .from('orders')
        .insert(orders);

      if (orderError) throw orderError;

      // Clear cart
      const { error: clearError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearError) throw clearError;

      toast({
        title: "Order placed successfully!",
        description: `${cartItems.length} items have been ordered.`,
      });

      onCartUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Shopping Cart
            {cartItems.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getTotalItems()} items
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  {item.product.image_url && (
                    <img 
                      src={item.product.image_url} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{item.product.price} per kg</p>
                    <p className="text-sm font-medium text-primary">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-2xl font-bold text-primary">
                ₹{getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Continue Shopping
              </Button>
              <Button 
                onClick={checkout}
                className="flex-1 shadow-button"
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;