-- Simplify the database schema by removing role-based complexity

-- First, let's create a simplified users table for additional user info
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" 
ON public.users 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own data" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own data" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Simplify products table - remove farmer_id restriction
-- Update products table to allow any authenticated user to create products
DROP POLICY IF EXISTS "Farmers can create their own products" ON public.products;
DROP POLICY IF EXISTS "Farmers can update their own products" ON public.products;
DROP POLICY IF EXISTS "Farmers can delete their own products" ON public.products;

-- Add user_id to products table to track who created each product
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create simplified policies for products
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
ON public.products 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create a cart table for shopping cart functionality
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for cart_items
CREATE POLICY "Users can view their own cart items" 
ON public.cart_items 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cart items" 
ON public.cart_items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items 
FOR DELETE 
USING (auth.uid() = user_id);

-- Simplify orders table
ALTER TABLE public.orders DROP COLUMN IF EXISTS buyer_id;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update orders policies
DROP POLICY IF EXISTS "Buyers can create orders" ON public.orders;
DROP POLICY IF EXISTS "Buyers can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Farmers can view orders for their products" ON public.orders;

CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_signup();