import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Database, MapPin, Building2 } from "lucide-react";

export default function DataSource() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="text-datasource-title">
                Data Source
              </h1>
              <p className="text-lg text-muted-foreground">
                Transparency about our data
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Database Statistics
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <div className="flex items-center justify-center mb-2">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-4xl font-bold text-primary" data-testid="stat-districts">
                        38
                      </div>
                      <div className="text-sm font-medium text-muted-foreground mt-2">Districts</div>
                    </div>
                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30">
                      <div className="flex items-center justify-center mb-2">
                        <Building2 className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="text-4xl font-bold text-foreground" data-testid="stat-circles">
                        654
                      </div>
                      <div className="text-sm font-medium text-muted-foreground mt-2">Circles</div>
                    </div>
                    <div className="text-center p-6 rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border">
                      <div className="flex items-center justify-center mb-2">
                        <Database className="h-6 w-6 text-foreground" />
                      </div>
                      <div className="text-4xl font-bold text-foreground" data-testid="stat-villages">
                        54K+
                      </div>
                      <div className="text-sm font-medium text-muted-foreground mt-2">Villages/Thanas</div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-center text-muted-foreground">
                      <strong className="text-foreground">Complete Coverage:</strong> All 38 districts of Bihar with comprehensive village and circle data
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Source Information
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      The data on JutaDhundo is compiled from publicly available Bihar 
                      land revenue records across all districts. This information is typically used for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Land record searches</li>
                      <li>Property registration purposes</li>
                      <li>Revenue department references</li>
                      <li>Administrative purposes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Geographic Coverage
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      <strong className="text-foreground">JutaDhundo now covers all 38 districts of Bihar!</strong> Our comprehensive 
                      database contains detailed information about villages, circles (Juta), and Thana numbers 
                      across the entire state's land revenue system.
                    </p>
                    <div className="mt-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                      <h3 className="font-semibold text-foreground mb-3">Districts Covered:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        <div>• Araria</div>
                        <div>• Arwal</div>
                        <div>• Aurangabad</div>
                        <div>• Banka</div>
                        <div>• Begusarai</div>
                        <div>• Bettiah</div>
                        <div>• Bhabhua</div>
                        <div>• Bhagalpur</div>
                        <div>• Bhojpur</div>
                        <div>• Buxar</div>
                        <div>• Darbhanga</div>
                        <div>• Gaya</div>
                        <div>• Gopalganj</div>
                        <div>• Jamui</div>
                        <div>• Jehanabad</div>
                        <div>• Katihar</div>
                        <div>• Khagaria</div>
                        <div>• Kishanganj</div>
                        <div>• Lakhisarai</div>
                        <div>• Madhepura</div>
                        <div>• Madhubani</div>
                        <div>• Motihari</div>
                        <div>• Munger</div>
                        <div>• Muzaffarpur</div>
                        <div>• Nalanda</div>
                        <div>• Nawada</div>
                        <div>• Patna</div>
                        <div>• Purnea</div>
                        <div>• Rohtas</div>
                        <div>• Saharsa</div>
                        <div>• Samastipur</div>
                        <div>• Saran</div>
                        <div>• Seikhpura</div>
                        <div>• Shivhar</div>
                        <div>• Sitamarhi</div>
                        <div>• Siwan</div>
                        <div>• Supaul</div>
                        <div>• Vaishali</div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-sm leading-relaxed">
                        <strong className="text-foreground">Statewide Service:</strong> We're committed to providing accurate, 
                        localized land record information for easier access to administrative data across all of Bihar.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Data Accuracy
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      We strive to maintain accurate and up-to-date information. However, 
                      please note:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>This is <strong className="text-foreground">not an official government website</strong></li>
                      <li>Data may not reflect the most recent changes</li>
                      <li>Always verify important information with official sources</li>
                      <li>Circle boundaries and assignments may change over time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/50">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Disclaimer
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The information provided on this website is for general informational 
                    purposes only. While we make every effort to keep the data accurate and 
                    current, we make no representations or warranties of any kind about the 
                    completeness, accuracy, or reliability of the information. Any reliance 
                    you place on such information is strictly at your own risk.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}