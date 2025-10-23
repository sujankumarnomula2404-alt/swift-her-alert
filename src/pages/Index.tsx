import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Users, MessageCircle, Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const startVoiceDetection = () => {
    setIsListening(true);
    // Voice detection will be implemented in Emergency page
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SafeHer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Your Safety,{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Our Priority
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            AI-powered emergency alerts at your fingertips. Stay protected with instant SOS,
            voice activation, and smart location sharing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/emergency">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-emergency hover:shadow-emergency transition-all duration-300 border-0"
              >
                <Shield className="mr-2 h-5 w-5" />
                Emergency SOS
              </Button>
            </Link>
            <Link to="/contacts">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10"
              >
                <Users className="mr-2 h-5 w-5" />
                My Contacts
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Link to="/emergency" className="group">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow transition-all duration-300 cursor-pointer h-full">
              <div className="h-12 w-12 bg-gradient-emergency rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency SOS</h3>
              <p className="text-muted-foreground">
                One-tap emergency alert to all your contacts and authorities
              </p>
            </div>
          </Link>

          <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow transition-all duration-300 h-full">
            <div className="h-12 w-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Location</h3>
            <p className="text-muted-foreground">
              Automatic real-time location sharing with emergency contacts
            </p>
          </div>

          <Link to="/contacts" className="group">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow transition-all duration-300 cursor-pointer h-full">
              <div className="h-12 w-12 bg-gradient-safe rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Contacts</h3>
              <p className="text-muted-foreground">
                Manage your emergency contacts, police, and helpline numbers
              </p>
            </div>
          </Link>

          <Link to="/chat" className="group">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow transition-all duration-300 cursor-pointer h-full">
              <div className="h-12 w-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-muted-foreground">
                Get instant safety tips and guidance from our AI chatbot
              </p>
            </div>
          </Link>
        </div>

        {/* Voice Activation Status */}
        {isListening && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary rounded-full px-6 py-3">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-medium">Voice detection active</span>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Always Active</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">&lt;2s</div>
            <div className="text-muted-foreground">Alert Response</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Secure & Private</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">∞</div>
            <div className="text-muted-foreground">Peace of Mind</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SafeHer. Empowering women's safety with AI technology.</p>
          <p className="mt-2 text-sm">Made with ❤️ for a safer world</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
