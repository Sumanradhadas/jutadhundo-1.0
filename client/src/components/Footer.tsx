import { Link } from "wouter";
import { MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-gradient-to-b from-background to-muted/20 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">JutaDhundo</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="footer-link-home">
                Home
              </span>
            </Link>
            <Link href="/about">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="footer-link-about">
                About Juta
              </span>
            </Link>
            <Link href="/data-source">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="footer-link-data-source">
                Data Source
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="footer-link-contact">
                Contact
              </span>
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Data is for informational use only. This is not an official government website.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Source: Bihar Land Records | Circle (Juta) data may be subject to updates.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> by
              </span>
              <a 
                href="http://webglowx.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity group"
                title="WebGlow - Web Solutions"
              >
                <img 
                  src="https://webglowx.netlify.app/logo.png" 
                  alt="WebGlow"
                  className="h-5 w-auto group-hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-xs font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">WebGlow</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}