-- Add role enum type
CREATE TYPE public.user_role AS ENUM ('farmer', 'customer');

-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role public.user_role NOT NULL DEFAULT 'customer';

-- Update the handle_new_user function to set default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'display_name', 
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'customer')
  );
  RETURN NEW;
END;
$$;