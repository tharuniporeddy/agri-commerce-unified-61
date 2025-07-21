import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
  } | null;
}

const OrderDialog = ({ open, onOpenChange, product }: OrderDialogProps) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !product || !address.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
          status: 'pending',
          address: address.trim()
        });

      if (error) throw error;

      toast({
        title: "🎉 Order received successfully!",
        description: `Your order for ${product.name} has been placed.`,
      });

      setAddress('');
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            You're ordering {product.name} for ₹{product.price}. Please provide your delivery address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your complete delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={4}
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !address.trim()}
              className="flex-1 shadow-button"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;