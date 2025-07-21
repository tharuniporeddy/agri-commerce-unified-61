import { Card, CardContent } from '@/components/ui/card';
import { Sprout, Target, Heart, Award } from 'lucide-react';
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Sprout className="h-16 w-16 text-agriculture-green mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About KrishiSetu
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Bridging the gap between farmers and customers through technology, ensuring fresh
            produce reaches your table while farmers get fair prices.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center p-8 shadow-lg">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-agriculture-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To eliminate middlemen and create a direct connection between farmers and customers,
                ensuring fair prices and fresh produce.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 shadow-lg">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-agriculture-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where every farmer thrives and every customer has access to the freshest, highest-quality
                produce directly from the source.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 shadow-lg">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-agriculture-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-agriculture-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-muted-foreground">
                Transparency, sustainability, community support, and empowering both farmers and customers
                through technology.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              KrishiSetu was born from a simple observation: farmers work hard to grow fresh, quality produce,
              but often struggle to get fair prices due to multiple intermediaries. Meanwhile, customers pay
              high prices for produce that may not be as fresh as it could be.
            </p>
            <p className="mb-6">
              Our platform bridges this gap by connecting farmers directly with customers, ensuring that farmers
              get better prices for their hard work while customers receive the freshest possible produce at
              reasonable rates.
            </p>
            <p>
              Today, KrishiSetu serves thousands of farmers and customers across the country, promoting
              sustainable agriculture, supporting local communities, and ensuring food security for all.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-agriculture-green mb-2">500+</div>
            <div className="text-muted-foreground">Farmers Empowered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-agriculture-green mb-2">1000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-agriculture-green mb-2">₹50L+</div>
            <div className="text-muted-foreground">Farmer Income</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-agriculture-green mb-2">100+</div>
            <div className="text-muted-foreground">Cities Reached</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;