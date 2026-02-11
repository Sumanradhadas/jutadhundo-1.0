import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, AlertTriangle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="w-full py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4" data-testid="text-contact-title">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                We'd love to hear from you
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Feedback & Suggestions
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Have ideas on how we can improve JutaDhundo? We're always looking 
                        to make the search experience better. Your feedback helps us serve 
                        the community more effectively.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/30">
                      <AlertTriangle className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Report Data Issues
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Found incorrect data? Missing villages? Wrong Circle assignments? 
                        Please let us know so we can verify and update our records. 
                        Community contributions help keep our database accurate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-muted">
                      <Mail className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Get in Touch
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        For any queries, corrections, or feedback, please reach out to us. 
                        We typically respond within 24-48 hours.
                      </p>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">
                          This is a community project aimed at helping people find their 
                          Circle information easily. We appreciate your patience and support.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
                    Important Note
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    JutaDhundo is <strong className="text-foreground">not affiliated</strong> with 
                    any government department. For official matters related to land records, 
                    please contact your local revenue office or visit the official Bihar 
                    government portals.
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
