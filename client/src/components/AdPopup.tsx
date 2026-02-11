import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface AdPopupProps {
  adHtml: string;
  duration: number;
  onClose: () => void;
}

export function AdPopup({ adHtml, duration, onClose }: AdPopupProps) {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(duration);
  const [canClose, setCanClose] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show ad after 3 seconds
    const showTimer = setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  // Execute JavaScript from the ad HTML
  useEffect(() => {
    if (!open || !containerRef.current) return;

    // Small delay to ensure DOM is ready
    const executeScripts = setTimeout(() => {
      if (!containerRef.current) return;

      // Find all script tags in the ad HTML
      const scriptTags = containerRef.current.querySelectorAll('script');
      
      scriptTags.forEach((oldScript) => {
        const newScript = document.createElement('script');
        
        // Copy all attributes
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // Copy inline script content
        if (oldScript.innerHTML) {
          newScript.innerHTML = oldScript.innerHTML;
        }
        
        // Replace old script with new one to trigger execution
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }, 100);

    return () => clearTimeout(executeScripts);
  }, [open, adHtml]);

  const handleClose = () => {
    if (canClose) {
      setOpen(false);
      onClose();
    }
  };

  const progress = ((duration - countdown) / duration) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-auto p-0" 
        hideClose={!canClose}
        data-testid="ad-popup"
      >
        <div className="relative">
          {!canClose && (
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Ad will close in {countdown} seconds
                </span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {canClose && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 rounded-full bg-background/80 p-2 hover:bg-background transition-colors shadow-lg"
              data-testid="ad-close-button"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          <div 
            ref={containerRef}
            className="p-6"
            dangerouslySetInnerHTML={{ __html: adHtml }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}