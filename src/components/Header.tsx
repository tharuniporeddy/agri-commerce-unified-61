import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sprout, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sprout className="h-8 w-8 text-agriculture-green" />
            <h1 className="text-2xl font-bold text-foreground">KrishiSetu</h1>
          </div>

          {/* Navigation Links - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className={`text-sm font-medium transition-colors hover:text-agriculture-green ${
                isActive('/') ? 'text-agriculture-green' : 'text-muted-foreground'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const element = document.getElementById('how-it-works');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-sm font-medium text-muted-foreground hover:text-agriculture-green transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => navigate('/about')}
              className={`text-sm font-medium transition-colors hover:text-agriculture-green ${
                isActive('/about') ? 'text-agriculture-green' : 'text-muted-foreground'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`text-sm font-medium transition-colors hover:text-agriculture-green ${
                isActive('/contact') ? 'text-agriculture-green' : 'text-muted-foreground'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Auth Buttons - Right */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/products')}
                  className="text-sm"
                >
                  Products
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-agriculture-green text-white">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.name || user.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => navigate('/products')}
                      className="cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Products</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="text-sm bg-agriculture-green hover:bg-agriculture-green/90 text-white"
              >
                Login / Signup
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;