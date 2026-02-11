import { useState, useEffect } from "react";
import { X, User, Mail, Phone, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { UserData } from "@shared/schema";

interface SignUpModalProps {
  open: boolean;
  onComplete: (userData: UserData) => void;
}

export function SignUpModal({ open, onComplete }: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      // Fetch user location
      fetch("/api/get-user-ip")
        .then((res) => res.json())
        .then((data) => {
          if (data.city && data.city !== "Unknown") {
            setCity(data.city);
          }
          setFetchingLocation(false);
        })
        .catch(() => {
          setFetchingLocation(false);
        });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get IP info
      const ipResponse = await fetch("/api/get-user-ip");
      const ipData = await ipResponse.json();

      const userData: UserData = {
        name,
        email,
        phone,
        city,
        ip: ipData.ip,
        region: ipData.region,
        country: ipData.country,
      };

      // Save to GitHub
      const saveResponse = await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (saveResponse.ok) {
        // Save to localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
        
        toast({
          title: "🎉 Welcome!",
          description: "Your information has been saved successfully.",
        });

        onComplete(userData);
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md border-2 border-primary/20 shadow-2xl" hideClose>
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to JutaDhundo!
          </DialogTitle>
          <DialogDescription className="text-center">
            Please provide your details to continue. This is a one-time setup.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-2 focus:border-primary transition-colors"
              data-testid="signup-name-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 focus:border-primary transition-colors"
              data-testid="signup-email-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border-2 focus:border-primary transition-colors"
              data-testid="signup-phone-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              City *
            </Label>
            <Input
              id="city"
              placeholder={fetchingLocation ? "Fetching location..." : "Enter your city"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              disabled={fetchingLocation}
              className="border-2 focus:border-primary transition-colors"
              data-testid="signup-city-input"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md hover:shadow-lg transition-all"
            disabled={loading || fetchingLocation}
            data-testid="signup-submit-button"
          >
            {loading ? "Saving..." : "Get Started 🚀"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}