import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sprout, 
  ShoppingCart, 
  TrendingUp, 
  Shield, 
  Clock, 
  MapPin,
  Users,
  Upload,
  CheckCircle,
  Search,
  ShoppingBag,
  Star,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import Header from '@/components/Header';
import farmingBackground from '@/assets/farming-background.jpg';
import customerShoppingBackground from '@/assets/customer-shopping-background.jpg';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Sprout className="h-8 w-8 animate-pulse mx-auto mb-4 text-agriculture-green" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative text-white py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${farmingBackground})`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Connecting <span className="text-yellow-300">Farmers</span> with{' '}
            <span className="text-yellow-300">Customers</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in">
            Fresh produce directly from farms to your table. No middlemen, fair
            prices, and supporting local agriculture. Join KrishiSetu today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              🛒 I'm a Customer
            </Button>
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              🌱 I'm a Farmer
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-agriculture-accent">500+</div>
              <div className="text-white/80">Registered Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-agriculture-accent">1000+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-agriculture-accent">2000+</div>
              <div className="text-white/80">Fresh Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose KrishiSetu */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose KrishiSetu?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing the way farmers and customers connect for fresh, quality produce
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-agriculture-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Direct Connection</h3>
                <p className="text-muted-foreground">
                  Connect farmers directly with customers, eliminating middlemen and ensuring fair prices for all.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-8 w-8 text-agriculture-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Easy Shopping</h3>
                <p className="text-muted-foreground">
                  Browse fresh produce from local farms with detailed product information and farmer profiles.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-agriculture-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Fair Pricing</h3>
                <p className="text-muted-foreground">
                  Farmers get better prices for their produce while customers pay reasonable rates.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-agriculture-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Assured</h3>
                <p className="text-muted-foreground">
                  All products are verified and farmers are authenticated for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-agriculture-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Fresh Delivery</h3>
                <p className="text-muted-foreground">
                  Get the freshest produce delivered quickly from nearby farms to your doorstep.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-agriculture-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Local Focus</h3>
                <p className="text-muted-foreground">
                  Support local agriculture and reduce carbon footprint with nearby farm connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Farmers and Customers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Farmers */}
            <div className="relative">
              <div 
                className="rounded-2xl p-8 h-64 flex items-end relative overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(${farmingBackground})`
                }}
              >
                <div className="relative z-10">
                  <Sprout className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-2xl font-bold text-white">For Farmers</h3>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Get better prices for your produce</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Direct access to customers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Build your reputation and customer base</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Manage orders and inventory easily</p>
                </div>
              </div>
            </div>

            {/* For Customers */}
            <div className="relative">
              <div 
                className="rounded-2xl p-8 h-64 flex items-end relative overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${customerShoppingBackground})`
                }}
              >
                <div className="relative z-10">
                  <Users className="h-8 w-8 text-white mb-3" />
                  <h3 className="text-2xl font-bold text-white">For Customers</h3>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start space-x-3">
                  <Sprout className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Fresh, organic produce from local farms</p>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Fair prices without middleman markup</p>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Know exactly where your food comes from</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-agriculture-green mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">Quality guaranteed by verified farmers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How KrishiSetu Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How KrishiSetu Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to connect farmers with customers for fresh produce trading
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* For Farmers */}
            <div>
              <h3 className="text-2xl font-bold text-amber-600 mb-8 text-center">For Farmers</h3>
              <p className="text-center text-muted-foreground mb-12">
                Start selling your fresh produce directly to customers
              </p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Sign Up as Farmer</h4>
                      <p className="text-sm text-muted-foreground mb-1">Step 1</p>
                      <p className="text-muted-foreground">Create your farmer account and complete verification process</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Upload className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">List Your Products</h4>
                      <p className="text-sm text-muted-foreground mb-1">Step 2</p>
                      <p className="text-muted-foreground">Upload photos and details of your fresh produce with pricing</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Manage Orders</h4>
                      <p className="text-sm text-muted-foreground mb-1">Step 3</p>
                      <p className="text-muted-foreground">Receive and fulfill orders from customers efficiently</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* For Customers */}
            <div>
              <h3 className="text-2xl font-bold text-agriculture-green mb-8 text-center">For Customers</h3>
              <p className="text-center text-muted-foreground mb-12">
                Get fresh produce directly from local farms
              </p>
              
              <div className="space-y-8">
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-agriculture-light rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-agriculture-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Create Account</h4>
                      <p className="text-sm text-muted-foreground mb-1">Step 1</p>
                      <p className="text-muted-foreground">Sign up as a customer to start browsing fresh produce</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-agriculture-light rounded-full flex items-center justify-center flex-shrink-0">
                      <Search className="h-6 w-6 text-agriculture-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Browse Products</h4>
                      <p className="text-sm text-muted-foreground mb-1">Step 2</p>
                      <p className="text-muted-foreground">Explore fresh produce from verified local farmers</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-agriculture-light rounded-full flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="h-6 w-6 text-agriculture-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Order & Enjoy</h4>
                      <p className="text-sm text-muted-foreground mb-1">Step 3</p>
                      <p className="text-muted-foreground">Place your order and enjoy fresh farm-to-table produce</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Join */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <Sprout className="h-16 w-16 text-agriculture-green mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Join KrishiSetu?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a farmer looking to sell your produce or a customer
              wanting fresh, local products, KrishiSetu is your digital marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4"
              >
                🌱 Join as Farmer
              </Button>
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-agriculture-green hover:bg-agriculture-green/90 text-white px-8 py-4"
              >
                🛒 Start Shopping
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Join thousands of farmers and customers already using KrishiSetu
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="h-8 w-8 text-agriculture-accent" />
                <h3 className="text-xl font-bold">KrishiSetu</h3>
              </div>
              <p className="text-muted mb-6">
                Connecting farmers directly with customers for fresh, quality produce. Supporting local agriculture and fair trade.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <Facebook className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/')} className="text-muted hover:text-agriculture-accent transition-colors">Home</button></li>
                <li><button onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} className="text-muted hover:text-agriculture-accent transition-colors">Features</button></li>
                <li><button onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} className="text-muted hover:text-agriculture-accent transition-colors">How It Works</button></li>
                <li><button onClick={() => navigate('/about')} className="text-muted hover:text-agriculture-accent transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-muted hover:text-agriculture-accent transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2">
                <li><button className="text-muted hover:text-agriculture-accent transition-colors">Farmer Registration</button></li>
                <li><button className="text-muted hover:text-agriculture-accent transition-colors">Customer Sign Up</button></li>
                <li><button onClick={() => navigate('/products')} className="text-muted hover:text-agriculture-accent transition-colors">Product Listing</button></li>
                <li><button className="text-muted hover:text-agriculture-accent transition-colors">Order Tracking</button></li>
                <li><button className="text-muted hover:text-agriculture-accent transition-colors">Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-agriculture-accent">✉</span>
                  <span className="text-muted">support@krishisetu.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-agriculture-accent">📞</span>
                  <span className="text-muted">+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-agriculture-accent">📍</span>
                  <span className="text-muted">Rural Development Center, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted/20 mt-12 pt-8 text-center">
            <p className="text-muted">
              © 2024 KrishiSetu. All rights reserved. Empowering farmers, nourishing communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;