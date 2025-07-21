import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, ShoppingCart, Package, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddProductDialog from '@/components/AddProductDialog';
import CartDialog from '@/components/CartDialog';
import OrderDialog from '@/components/OrderDialog';
import Header from '@/components/Header';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
  user_id: string;
  created_at: string;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  console.log('Current user:', user?.id);
  console.log('Current userRole:', userRole);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchProducts();
    fetchCartItems();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading products",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) return;

    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity: 1
          });

        if (error) throw error;
      }

      await fetchCartItems();
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart.",
      });
    } catch (error: any) {
      toast({
        title: "Error adding to cart",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const buyNow = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    setSelectedProduct(product);
    setShowOrderDialog(true);
  };

  const deleteProduct = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('user_id', user.id); // Ensure only owner can delete

      if (error) throw error;

      await fetchProducts();
      toast({
        title: "Product removed",
        description: "Product has been successfully removed from the marketplace.",
      });
    } catch (error: any) {
      toast({
        title: "Error removing product",
        description: error.message,
        variant: "destructive",
      });
    }
  };


  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Section with Role-Based Actions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-bold text-foreground">Marketplace</h2>
            {userRole && (
              <Badge variant={userRole === 'farmer' ? 'default' : 'secondary'} className="text-sm">
                {userRole === 'farmer' ? '🚜 Farmer' : '🛒 Customer'}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground max-w-4xl mb-6">
            {userRole === 'farmer' 
              ? 'Welcome, Farmer! Manage your products here. Add new items to sell in the marketplace and track your inventory.'
              : 'Welcome to the Marketplace! Here you can explore available products, add them to your cart, or buy directly from farmers. Every order supports a farmer and promotes sustainable agriculture.'
            }
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {userRole === 'farmer' ? (
              // Farmer Actions
              <Button 
                onClick={() => setShowAddProduct(true)}
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            ) : (
              // Customer Actions
              <Button 
                variant="outline" 
                onClick={() => setShowCart(true)}
                className="relative border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {getTotalCartItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalCartItems()}
                  </Badge>
                )}
              </Button>
            )}
            <div className="text-muted-foreground font-medium">
              {products.length} products available
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products available</h3>
            <p className="text-muted-foreground mb-4">Be the first to add a product!</p>
            <Button onClick={() => setShowAddProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  {product.image_url && (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-2"
                    />
                  )}
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        ₹{product.price}
                      </span>
                      <Badge variant="secondary">
                        {product.quantity} kg available
                      </Badge>
                    </div>
                    
                    {userRole === 'farmer' ? (
                      // Farmer can only see their own products and delete them
                      product.user_id === user?.id && (
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => deleteProduct(product.id)}
                          className="w-full"
                        >
                          🗑️ Remove Product
                        </Button>
                      )
                    ) : (
                      // Customer Actions
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => addToCart(product.id)}
                          className="flex-1"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => buyNow(product.id)}
                          className="flex-1 shadow-button"
                        >
                          Buy Now
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Dialogs - Show based on user role */}
      {userRole === 'farmer' && (
        <AddProductDialog 
          open={showAddProduct}
          onOpenChange={setShowAddProduct}
          onProductAdded={fetchProducts}
        />
      )}
      
      {userRole === 'customer' && (
        <>
          <CartDialog 
            open={showCart}
            onOpenChange={setShowCart}
            cartItems={cartItems}
            onCartUpdated={fetchCartItems}
          />

          <OrderDialog 
            open={showOrderDialog}
            onOpenChange={setShowOrderDialog}
            product={selectedProduct}
          />
        </>
      )}
    </div>
  );
};

export default Products;