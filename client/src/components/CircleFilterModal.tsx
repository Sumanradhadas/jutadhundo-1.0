import { useState, useMemo } from "react";
import { ArrowUpDown, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { VillageRecord } from "@shared/schema";

interface CircleFilterModalProps {
  villageData: VillageRecord[];
}

type SortOption = "name-asc" | "thana-asc";

export function CircleFilterModal({ villageData }: CircleFilterModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique circles
  const circles = useMemo(() => {
    const circleSet = new Set<string>();
    villageData.forEach((record) => {
      if (record.circleName) {
        circleSet.add(record.circleName);
      }
    });
    return Array.from(circleSet).sort();
  }, [villageData]);

  // Filter and sort villages by selected circle
  const filteredVillages = useMemo(() => {
    if (!selectedCircle) return [];

    let filtered = villageData.filter(
      (record) => record.circleName === selectedCircle
    );

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter((record) =>
        record.villageName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.villageName.localeCompare(b.villageName));
    } else if (sortBy === "thana-asc") {
      filtered.sort((a, b) => {
        const thanaA = parseInt(a.thanaNo, 10) || 0;
        const thanaB = parseInt(b.thanaNo, 10) || 0;
        return thanaA - thanaB;
      });
    }

    return filtered;
  }, [villageData, selectedCircle, sortBy, searchQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="circle-filter-button">
          <Filter className="h-4 w-4" />
          View All Villages by Circle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Filter Villages by Circle</DialogTitle>
          <DialogDescription>
            Select a circle to view all villages in that area
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
          {/* Circle Selection */}
          <div className="border-r pr-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Select Circle
            </h3>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {circles.map((circle) => (
                  <button
                    key={circle}
                    onClick={() => setSelectedCircle(circle)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCircle === circle
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    data-testid={`circle-option-${circle}`}
                  >
                    {circle}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Village List */}
          <div className="md:col-span-2">
            {selectedCircle ? (
              <>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      Villages in {selectedCircle}
                    </h3>
                    <Badge variant="secondary">
                      {filteredVillages.length} villages
                    </Badge>
                  </div>

                  <Input
                    placeholder="Search villages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="village-search-input"
                  />

                  <RadioGroup
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="name-asc" id="name-sort" />
                      <Label htmlFor="name-sort" className="cursor-pointer">
                        Sort by Name (A-Z)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="thana-asc" id="thana-sort" />
                      <Label htmlFor="thana-sort" className="cursor-pointer">
                        Sort by Thana No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <ScrollArea className="h-[calc(60vh-150px)]">
                  <div className="space-y-2">
                    {filteredVillages.map((village, index) => (
                      <div
                        key={`${village.thanaNo}-${index}`}
                        className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{village.villageName}</p>
                            <p className="text-sm text-muted-foreground">
                              Thana No: {village.thanaNo}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredVillages.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No villages found
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Select a circle to view villages</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}