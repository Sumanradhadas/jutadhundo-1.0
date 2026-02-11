import { useState, useMemo } from "react";
import { Check, ChevronDown, Search, MapPin } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DISTRICTS } from "@shared/schema";

interface DistrictSelectorProps {
  value: string | null;
  onChange: (district: string) => void;
}

export function DistrictSelector({ value, onChange }: DistrictSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-base h-14 bg-gradient-to-r from-background to-accent/5 hover:from-accent/10 hover:to-accent/20 border-2 border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
          data-testid="district-selector-button"
        >
          <span className="flex items-center gap-2 truncate">
            <MapPin className="h-5 w-5 text-primary" />
            <span className={cn("font-medium", !value && "text-muted-foreground")}>
              {value ? value : "Select your district..."}
            </span>
          </span>
          <ChevronDown className={cn(
            "ml-2 h-5 w-5 shrink-0 transition-transform duration-200",
            open && "transform rotate-180"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 shadow-lg" align="start">
        <Command>
          <CommandInput placeholder="Search district..." className="h-12" />
          <CommandEmpty>No district found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {DISTRICTS.map((district) => (
              <CommandItem
                key={district}
                value={district}
                onSelect={() => {
                  onChange(district);
                  setOpen(false);
                }}
                className="cursor-pointer hover:bg-accent/50"
                data-testid={`district-option-${district}`}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-primary",
                    value === district ? "opacity-100" : "opacity-0"
                  )}
                />
                {district}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}