import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="text-about-title">
                About Juta
              </h1>
              <p className="text-lg text-muted-foreground">
                Understanding Circles in Bihar Land Records
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    What is a Circle (Juta)?
                  </h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      In the context of Bihar land records, a <strong className="text-foreground">Circle</strong> is an 
                      administrative unit that groups multiple villages together for land revenue and 
                      record-keeping purposes. Locally, people often refer to it as "Juta" - which is 
                      why we named our platform JutaDhundo ("Find your Juta").
                    </p>
                    <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                      <h3 className="font-semibold text-foreground mb-2">Why is it called "Juta"?</h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        In many regions, a village is locally called <strong className="text-foreground">"Mauja"</strong> - 
                        interestingly, "Mauja" is also the Hindi word for <strong className="text-foreground">socks</strong>.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Now, just like socks come under a shoe <strong className="text-foreground">(Juta)</strong>, 
                        Mauja (villages) come under a Circle. This is why we call the administrative group of villages a "Circle" or "Juta"!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    What is a Thana Number?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Each village in Bihar is assigned a unique <strong className="text-foreground">Thana Number</strong> for 
                    identification in land records. This number helps in locating specific village 
                    records in the revenue department's database. One Thana number may be shared by 
                    multiple localities or sub-divisions within a village area.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Why JutaDhundo?
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Many people face challenges when trying to find their Circle information:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>They don't know their Circle name</li>
                      <li>They only have partial village names</li>
                      <li>They make spelling mistakes when searching</li>
                      <li>They know the Thana number but not the village name</li>
                    </ul>
                    <p className="leading-relaxed mt-4">
                      <strong className="text-foreground">JutaDhundo solves this problem instantly.</strong> Our smart 
                      search understands typos, partial names, and even shows you all villages 
                      under a particular Thana number.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h3 className="font-medium text-foreground mb-2">Spelling Tolerance</h3>
                      <p className="text-sm text-muted-foreground">
                        Don't know the exact spelling? No problem - we'll find it anyway.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h3 className="font-medium text-foreground mb-2">Instant Suggestions</h3>
                      <p className="text-sm text-muted-foreground">
                        See matching results as you type, starting from just 3 characters.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h3 className="font-medium text-foreground mb-2">Grouped Results</h3>
                      <p className="text-sm text-muted-foreground">
                        Multiple villages under one Thana? We show them all together.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h3 className="font-medium text-foreground mb-2">Lightning Fast</h3>
                      <p className="text-sm text-muted-foreground">
                        Works instantly, even on slow internet connections.
                      </p>
                    </div>
                  </div>
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
