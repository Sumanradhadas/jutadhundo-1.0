import { useState, useCallback, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { MapPin, Search, Zap, Smartphone, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBox } from "@/components/SearchBox";
import { ResultCard } from "@/components/ResultCard";
import { DistrictSelector } from "@/components/DistrictSelector";
import { SignUpModal } from "@/components/SignUpModal";
import { AdPopup } from "@/components/AdPopup";
import { CircleFilterModal } from "@/components/CircleFilterModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { VillageRecord, GroupedResult, UserData } from "@shared/schema";

export default function Home() {
  const [villageSearchQuery, setVillageSearchQuery] = useState("");
  const [thanaSearchQuery, setThanaSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<VillageRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [adData, setAdData] = useState<{ html: string; duration: number } | null>(null);
  const { toast } = useToast();

  // Load saved district and user data from localStorage
  useEffect(() => {
    const savedDistrict = localStorage.getItem("selectedDistrict");
    if (savedDistrict) {
      setSelectedDistrict(savedDistrict);
    }

    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    } else {
      setShowSignUp(true);
    }
  }, []);

  // Check and show ad
  useEffect(() => {
    const checkAndShowAd = async () => {
      // Check if user signed up
      if (!userData) return;

      // Check last ad shown time
      const lastAdShown = localStorage.getItem("lastAdShown");
      const now = Date.now();
      const twoHoursInMs = 2 * 60 * 60 * 1000;

      if (lastAdShown && now - parseInt(lastAdShown, 10) < twoHoursInMs) {
        return; // Don't show ad yet
      }

      try {
        // Fetch user IP
        const ipResponse = await fetch("/api/get-user-ip");
        const ipData = await ipResponse.json();
        const userIp = ipData.ip;

        // Fetch ad data
        const adResponse = await fetch("/api/fetch-ad");
        const adResult = await adResponse.json();

        // Check if user IP is blacklisted
        if (adResult.blacklistedIps.includes(userIp)) {
          console.log("Ad blocked for this IP");
          return;
        }

        // Check if ad HTML exists
        if (adResult.adHtml) {
          setAdData({
            html: adResult.adHtml,
            duration: adResult.adDuration,
          });
          setShowAd(true);
        }
      } catch (error) {
        console.error("Error loading ad:", error);
      }
    };

    checkAndShowAd();
  }, [userData]);

  const handleAdClose = () => {
    setShowAd(false);
    localStorage.setItem("lastAdShown", Date.now().toString());
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    localStorage.setItem("selectedDistrict", district);
    setVillageSearchQuery("");
    setThanaSearchQuery("");
    setSelectedRecord(null);
    setHasSearched(false);
    
    toast({
      title: "District Selected",
      description: `Now showing data for ${district}`,
    });
  };

  const handleSignUpComplete = (user: UserData) => {
    setUserData(user);
    setShowSignUp(false);
  };

  // Fetch district data
  const { data: villageData = [], isLoading: isLoadingData } = useQuery<VillageRecord[]>({
    queryKey: ["/api/fetch-district", selectedDistrict],
    queryFn: async () => {
      if (!selectedDistrict) return [];
      
      const response = await fetch(`/api/fetch-district?district=${encodeURIComponent(selectedDistrict)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch district data");
      }
      const data = await response.json();
      
      // Transform data to match VillageRecord format
      return data.map((item: any) => ({
        villageName: item.village_en || item.villageName || "",
        thanaNo: item.othana_no || item.thanaNo || "",
        circleName: item.CIRCLE || item.circleName || "",
      }));
    },
    enabled: !!selectedDistrict,
  });

  const fuse = useMemo(() => {
    if (villageData.length === 0) return null;
    
    return new Fuse(villageData, {
      keys: ["villageName"],
      threshold: 0.4,
      distance: 100,
      minMatchCharLength: 2,
      includeScore: true,
      ignoreLocation: true,
      findAllMatches: true,
    });
  }, [villageData]);

  const villageSuggestions = useMemo(() => {
    if (!fuse || villageSearchQuery.length < 3) return [];
    
    const results = fuse.search(villageSearchQuery);
    return results.map((r) => r.item).slice(0, 8);
  }, [fuse, villageSearchQuery]);

  const thanaSuggestions = useMemo(() => {
    if (thanaSearchQuery.length < 1) return [];
    
    const thanaMatches = new Map<string, VillageRecord>();
    villageData.forEach((record) => {
      if (record.thanaNo.startsWith(thanaSearchQuery.trim())) {
        if (!thanaMatches.has(record.thanaNo)) {
          thanaMatches.set(record.thanaNo, record);
        }
      }
    });
    
    return Array.from(thanaMatches.values()).slice(0, 8);
  }, [villageData, thanaSearchQuery]);

  const activeQuery = villageSearchQuery || thanaSearchQuery;
  const isThanaSearch = /^\d+$/.test(thanaSearchQuery.trim());

  const groupedResults = useMemo((): GroupedResult[] => {
    if (!hasSearched || activeQuery.length < 1) return [];

    let matchingRecords: VillageRecord[];

    if (isThanaSearch) {
      matchingRecords = villageData.filter(
        (record) => record.thanaNo === thanaSearchQuery.trim()
      );
    } else if (selectedRecord) {
      matchingRecords = villageData.filter(
        (record) =>
          record.thanaNo === selectedRecord.thanaNo &&
          record.circleName === selectedRecord.circleName
      );
    } else if (villageSearchQuery && fuse) {
      const results = fuse.search(villageSearchQuery);
      matchingRecords = results.slice(0, 50).map((r) => r.item);
    } else {
      matchingRecords = [];
    }

    const grouped = new Map<string, GroupedResult>();

    matchingRecords.forEach((record) => {
      const key = `${record.thanaNo}-${record.circleName}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          thanaNo: record.thanaNo,
          circleName: record.circleName,
          villages: [],
        });
      }
      const group = grouped.get(key)!;
      if (!group.villages.includes(record.villageName)) {
        group.villages.push(record.villageName);
      }
    });

    return Array.from(grouped.values()).sort((a, b) => {
      const thanaA = parseInt(a.thanaNo, 10) || 0;
      const thanaB = parseInt(b.thanaNo, 10) || 0;
      return thanaA - thanaB;
    });
  }, [hasSearched, villageSearchQuery, thanaSearchQuery, selectedRecord, villageData, fuse, isThanaSearch, activeQuery]);

  const handleVillageSearch = useCallback((query: string) => {
    setVillageSearchQuery(query);
    setThanaSearchQuery("");
    setSelectedRecord(null);
    if (query.length >= 3) {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
  }, []);

  const handleThanaSearch = useCallback((query: string) => {
    setThanaSearchQuery(query);
    setVillageSearchQuery("");
    setSelectedRecord(null);
    if (query.length >= 1) {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
  }, []);

  const handleVillageSuggestionSelect = useCallback((record: VillageRecord) => {
    setVillageSearchQuery(record.villageName);
    setThanaSearchQuery("");
    setSelectedRecord(record);
    setHasSearched(true);
  }, []);

  const handleThanaSuggestionSelect = useCallback((record: VillageRecord) => {
    setThanaSearchQuery(record.thanaNo);
    setVillageSearchQuery("");
    setSelectedRecord(null);
    setHasSearched(true);
  }, []);

  const totalVillages = groupedResults.reduce(
    (acc, group) => acc + group.villages.length,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section
          className={`w-full transition-all duration-500 ease-out ${
            hasSearched ? "py-8" : "py-16 md:py-24"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div
              className={`text-center mb-8 transition-all duration-500 ${
                hasSearched ? "opacity-0 h-0 overflow-hidden mb-0" : "opacity-100"
              }`}
            >
              <div className="flex items-center justify-center gap-3 mb-4 animate-in fade-in-0 slide-in-from-top-4 duration-700">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <MapPin className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient" data-testid="text-title">
                  JutaDhundo
                </h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150" data-testid="text-tagline">
                Find your Circle in seconds - Now across all Bihar districts ✨
              </p>
            </div>

            {/* District Selector */}
            <div className="mb-6">
              <DistrictSelector
                value={selectedDistrict}
                onChange={handleDistrictChange}
              />
            </div>

            {selectedDistrict && (
              <>
                <div className="space-y-4 mb-4">
                  <SearchBox
                    onSearch={handleVillageSearch}
                    suggestions={villageSuggestions}
                    onSuggestionSelect={handleVillageSuggestionSelect}
                    isLoading={isLoadingData}
                    searchType="village"
                    minChars={3}
                  />
                  <SearchBox
                    onSearch={handleThanaSearch}
                    suggestions={thanaSuggestions}
                    onSuggestionSelect={handleThanaSuggestionSelect}
                    isLoading={isLoadingData}
                    searchType="thana"
                    minChars={1}
                  />
                </div>

                {/* Circle Filter Button */}
                {villageData.length > 0 && (
                  <div className="flex justify-center mt-4">
                    <CircleFilterModal villageData={villageData} />
                  </div>
                )}
              </>
            )}

            {!selectedDistrict && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Please select a district to start searching</p>
              </div>
            )}
          </div>
        </section>

        {hasSearched && selectedDistrict && (
          <section className="w-full pb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            <div className="max-w-3xl mx-auto px-4">
              {isLoadingData ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                  ))}
                </div>
              ) : groupedResults.length > 0 ? (
                <>
                  <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-lg font-semibold text-foreground" data-testid="text-results-title">
                      Search Results
                    </h2>
                    <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                      Found {totalVillages} village{totalVillages !== 1 ? "s" : ""} in{" "}
                      {groupedResults.length} group{groupedResults.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {groupedResults.map((result) => (
                      <ResultCard
                        key={`${result.thanaNo}-${result.circleName}`}
                        result={result}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12" data-testid="no-results">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No results found
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find any villages or thana numbers matching your search.
                    Try a different spelling or search term.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {!hasSearched && (
          <section className="w-full py-12 bg-muted/30 border-t border-border">
            <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-xl font-semibold text-center text-foreground mb-8" data-testid="text-features-title">
                How it works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-card border border-border hover-elevate transition-transform duration-200">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Select District</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your district from all 38 districts across Bihar.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-card border border-border hover-elevate transition-transform duration-200">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Smart Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Type your village name or thana number. We'll find it even with spelling mistakes.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-card border border-border hover-elevate transition-transform duration-200">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/30 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get suggestions as you type. See all matching villages grouped by Circle.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Sign Up Modal */}
      {showSignUp && (
        <SignUpModal open={showSignUp} onComplete={handleSignUpComplete} />
      )}

      {/* Ad Popup */}
      {showAd && adData && (
        <AdPopup
          adHtml={adData.html}
          duration={adData.duration}
          onClose={handleAdClose}
        />
      )}
    </div>
  );
}
