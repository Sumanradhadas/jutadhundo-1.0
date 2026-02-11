import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Home", href: "/" },
  { title: "About Juta", href: "/about" },
  { title: "Data Source", href: "/data-source" },
  { title: "Contact", href: "/contact" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group" data-testid="link-home-logo">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-110">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">JutaDhundo</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="text-sm font-medium hover:bg-accent/50 transition-all"
                  data-testid={`nav-link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border mt-3 animate-in slide-in-from-top-2 duration-200" data-testid="nav-mobile">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`nav-mobile-link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}