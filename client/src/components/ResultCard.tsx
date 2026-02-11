import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Hash, Building2 } from "lucide-react";
import type { GroupedResult, VillageRecord } from "@shared/schema";

interface ResultCardProps {
  result: GroupedResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card 
      className="w-full transition-all duration-200 hover-elevate"
      data-testid={`result-card-thana-${result.thanaNo}`}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium">Thana No:</span>
            <span className="text-lg font-bold text-foreground">{result.thanaNo}</span>
          </div>
          <Badge 
            variant="default" 
            className="bg-accent text-accent-foreground w-fit"
            data-testid={`badge-circle-${result.thanaNo}`}
          >
            <Building2 className="h-3 w-3 mr-1.5" />
            {result.circleName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            {result.villages.length === 1 ? "Village" : `Villages (${result.villages.length})`}
          </h4>
          <ul className="space-y-2">
            {result.villages.map((village, index) => (
              <li
                key={`${village}-${index}`}
                className="flex items-start gap-2 py-2 px-3 rounded-lg bg-muted/50"
                data-testid={`village-item-${result.thanaNo}-${index}`}
              >
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-base font-medium text-foreground">{village}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

interface SingleResultCardProps {
  record: VillageRecord;
}

export function SingleResultCard({ record }: SingleResultCardProps) {
  return (
    <Card 
      className="w-full transition-all duration-200 hover-elevate"
      data-testid={`single-result-card-${record.villageName.replace(/\s+/g, "-")}`}
    >
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">{record.villageName}</h3>
              <p className="text-sm text-muted-foreground">Village Name</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Thana No:</span>
              <span className="font-semibold text-foreground">{record.thanaNo}</span>
            </div>

            <Badge 
              variant="default" 
              className="bg-accent text-accent-foreground w-fit"
            >
              <Building2 className="h-3 w-3 mr-1.5" />
              {record.circleName}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
