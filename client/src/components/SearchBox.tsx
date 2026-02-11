import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, MapPin, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VillageRecord } from "@shared/schema";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  suggestions: VillageRecord[];
  onSuggestionSelect: (record: VillageRecord) => void;
  isLoading?: boolean;
  className?: string;
  searchType: "village" | "thana";
  minChars?: number;
}

export function SearchBox({
  onSearch,
  suggestions,
  onSuggestionSelect,
  isLoading = false,
  className,
  searchType,
  minChars = 1,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setSelectedIndex(-1);
      
      if (value.length >= minChars) {
        onSearch(value);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    },
    [onSearch, minChars]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
    onSearch("");
  }, [onSearch]);

  const handleSuggestionClick = useCallback(
    (record: VillageRecord) => {
      setQuery(record.villageName);
      setShowSuggestions(false);
      onSuggestionSelect(record);
    },
    [onSuggestionSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSuggestions || suggestions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            handleSuggestionClick(suggestions[selectedIndex]);
          } else if (query.length >= minChars) {
            setShowSuggestions(false);
            onSearch(query);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setSelectedIndex(-1);
          break;
      }
    },
    [showSuggestions, suggestions, selectedIndex, handleSuggestionClick, query, onSearch, minChars]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const isThanaSearch = /^\d+$/.test(query.trim());

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative group">
        {searchType === "village" ? (
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        ) : (
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        )}
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= minChars && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={searchType === "village" ? "Enter Village Name" : "Enter Thana Number"}
          className={cn(
            "w-full h-14 pl-12 pr-12 text-base rounded-xl border-2",
            "bg-card shadow-sm",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent",
            "placeholder:text-muted-foreground/60",
            "transition-all duration-200",
            query && "pr-20"
          )}
          data-testid={`input-${searchType}-search`}
          aria-label={`Search for ${searchType === "village" ? "village name" : "thana number"}`}
          aria-autocomplete="list"
          aria-controls={`${searchType}-suggestions`}
          aria-expanded={showSuggestions}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            data-testid={`button-clear-${searchType}-search`}
            aria-label="Clear search"
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "h-8 w-8 flex items-center justify-center",
              "rounded-full transition-all duration-200",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-destructive/10 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            )}
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>
        )}
      </div>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          id={`${searchType}-suggestions`}
          role="listbox"
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-50",
            "bg-card border border-border rounded-xl shadow-lg",
            "max-h-80 overflow-y-auto",
            "animate-in fade-in-0 slide-in-from-top-2 duration-150"
          )}
          data-testid={`${searchType}-suggestions`}
        >
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground" data-testid="suggestions-loading">
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.slice(0, 8).map((record, index) => (
              <button
                key={`${record.villageName}-${record.thanaNo}-${index}`}
                type="button"
                role="option"
                aria-selected={index === selectedIndex}
                className={cn(
                  "w-full px-4 py-3 text-left flex items-start gap-3",
                  "border-b border-border last:border-b-0",
                  "transition-colors duration-100",
                  index === selectedIndex
                    ? "bg-accent/30"
                    : "hover:bg-muted/50"
                )}
                onClick={() => handleSuggestionClick(record)}
                data-testid={`${searchType}-suggestion-${index}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isThanaSearch ? (
                    <Hash className="h-4 w-4 text-primary" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">
                    {record.villageName}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5 flex-wrap">
                    <span>Thana: {record.thanaNo}</span>
                    <span className="text-border">|</span>
                    <span className="truncate">{record.circleName}</span>
                  </div>
                </div>
              </button>
            ))
          ) : query.length >= minChars ? (
            <div className="p-4 text-center text-muted-foreground" data-testid="no-suggestions">
              <p className="font-medium">No results found</p>
              <p className="text-sm mt-1">Try a different spelling or search term</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
