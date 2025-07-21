import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({
      fullName: '',
      email: '',
      role: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or need support? We're here to help farmers and customers
            make the most of KrishiSetu.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">I am a:</label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="business">Business Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-agriculture-green hover:bg-agriculture-green/90"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-agriculture-light rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-agriculture-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Support</h3>
                    <p className="text-muted-foreground">support@krishisetu.com</p>
                    <p className="text-muted-foreground">farmers@krishisetu.com</p>
                    <p className="text-muted-foreground">customers@krishisetu.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-agriculture-light rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-agriculture-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Support</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-agriculture-light rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-agriculture-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office Address</h3>
                    <p className="text-muted-foreground">123 Agriculture Street</p>
                    <p className="text-muted-foreground">Farm City, FC 12345</p>
                    <p className="text-muted-foreground">United States</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;