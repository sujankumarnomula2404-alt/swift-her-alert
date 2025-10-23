import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Shield, Plus, Trash2, Phone, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
}

const Contacts = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Emergency Police",
      phone: "112",
      relationship: "Police",
    },
    {
      id: "2",
      name: "Women Helpline",
      phone: "181",
      relationship: "Helpline",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing Information",
        description: "Please provide at least name and phone number",
        variant: "destructive",
      });
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      relationship: newContact.relationship,
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", phone: "", email: "", relationship: "" });
    setShowAddForm(false);

    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to your emergency contacts`,
    });
  };

  const handleDeleteContact = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    setContacts(contacts.filter(c => c.id !== id));
    
    toast({
      title: "Contact Removed",
      description: `${contact?.name} has been removed from your emergency contacts`,
    });
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
          <Link to="/emergency">
            <Button className="bg-gradient-emergency">
              Emergency SOS
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Emergency Contacts</h2>
          <p className="text-lg text-muted-foreground">
            Manage the contacts who will be notified during an emergency
          </p>
        </div>

        {/* Add Contact Button */}
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            size="lg"
            className="mb-8 bg-gradient-primary"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Emergency Contact
          </Button>
        )}

        {/* Add Contact Form */}
        {showAddForm && (
          <Card className="p-6 mb-8 border-2 border-primary/20">
            <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter contact name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@example.com"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  placeholder="e.g., Mother, Friend, Colleague"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleAddContact} className="bg-gradient-primary">
                  Add Contact
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewContact({ name: "", phone: "", email: "", relationship: "" });
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-6 hover:shadow-glow transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{contact.name}</h3>
                      {contact.relationship && (
                        <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 ml-15">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </div>
                    {contact.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{contact.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                {contact.relationship !== "Police" && contact.relationship !== "Helpline" && (
                  <Button
                    onClick={() => handleDeleteContact(contact.id)}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <Phone className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">No emergency contacts added yet</p>
            <p className="text-sm text-muted-foreground mt-2">Add contacts to receive alerts during emergencies</p>
          </div>
        )}

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Important Information
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1 ml-7">
            <li>• All contacts will receive SMS and calls during an emergency</li>
            <li>• Your live location will be shared automatically</li>
            <li>• Police (112) and Women Helpline (181) are always included</li>
            <li>• Keep your contact list updated for best protection</li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Contacts;
