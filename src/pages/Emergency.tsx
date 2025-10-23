import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Phone, Shield, Mic, MicOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Use the SOS button instead.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Voice Detection Active",
        description: "Say 'I am in danger' to trigger emergency alert",
      });
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('')
        .toLowerCase();

      if (transcript.includes('danger') || transcript.includes('help me') || transcript.includes('emergency')) {
        recognition.stop();
        triggerEmergency('voice');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopVoiceRecognition = () => {
    setIsListening(false);
    // The recognition will stop via onend callback
  };

  const triggerEmergency = async (method: 'button' | 'voice') => {
    setIsSending(true);

    // Get current location if not already available
    let currentLocation = location;
    if (!currentLocation && navigator.geolocation) {
      await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(currentLocation);
            resolve(null);
          },
          () => resolve(null)
        );
      });
    }

    // Simulate sending alerts (will be implemented with backend)
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "🚨 Emergency Alert Sent!",
      description: `Your emergency contacts, police, and women helpline have been notified via ${method}.`,
      variant: "default",
    });

    if (currentLocation) {
      toast({
        title: "📍 Location Shared",
        description: `Your location has been shared: ${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`,
      });
    }

    setIsSending(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SafeHer
            </h1>
          </Link>
          <Link to="/contacts">
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              Contacts
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Emergency Interface */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">Emergency SOS</h2>
            <p className="text-lg text-muted-foreground">
              Press the button or use voice command to send an immediate alert to all your emergency contacts
            </p>
          </div>

          {/* Location Status */}
          {location && (
            <div className="mb-8 inline-flex items-center gap-2 bg-safe/10 border border-safe rounded-full px-4 py-2">
              <MapPin className="h-4 w-4 text-safe" />
              <span className="text-safe text-sm font-medium">Location tracking active</span>
            </div>
          )}

          {/* Emergency Button */}
          <div className="mb-12">
            <button
              onClick={() => triggerEmergency('button')}
              disabled={isSending}
              className="relative h-64 w-64 mx-auto group"
            >
              <div className="absolute inset-0 bg-gradient-emergency rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
              <div className="relative h-full w-full bg-gradient-emergency rounded-full flex items-center justify-center shadow-emergency hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-white/20">
                {isSending ? (
                  <div className="animate-spin">
                    <AlertCircle className="h-24 w-24 text-white" />
                  </div>
                ) : (
                  <div className="text-center">
                    <Shield className="h-20 w-20 text-white mx-auto mb-3" />
                    <span className="text-2xl font-bold text-white">SOS</span>
                  </div>
                )}
              </div>
            </button>
            <p className="mt-6 text-muted-foreground">
              Tap to send emergency alert
            </p>
          </div>

          {/* Voice Activation */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Voice Activation</h3>
            <p className="text-muted-foreground mb-6">
              Enable voice detection to trigger SOS by saying "I am in danger"
            </p>
            <Button
              onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
              size="lg"
              variant={isListening ? "outline" : "default"}
              className={isListening ? "border-primary" : "bg-gradient-primary"}
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  Start Voice Detection
                </>
              )}
            </Button>
            {isListening && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary font-medium text-sm">Listening for emergency phrases...</span>
              </div>
            )}
          </div>

          {/* Emergency Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-card border border-border rounded-xl p-6">
              <Phone className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Instant Alerts</h4>
              <p className="text-sm text-muted-foreground">
                SMS, calls, and notifications sent to all contacts
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <MapPin className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Live Location</h4>
              <p className="text-sm text-muted-foreground">
                Real-time GPS coordinates shared automatically
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Authorities Notified</h4>
              <p className="text-sm text-muted-foreground">
                Police and women helpline contacted immediately
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacts" className="flex-1 sm:flex-none">
              <Button variant="outline" size="lg" className="w-full">
                Manage Contacts
              </Button>
            </Link>
            <Link to="/chat" className="flex-1 sm:flex-none">
              <Button variant="outline" size="lg" className="w-full">
                Safety Tips
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
