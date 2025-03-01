import NewsContainer from "@/components/news-container";
import { Newspaper } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Newspaper className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                News Reader
              </h1>
              <p className="text-sm text-muted-foreground">
                Global headlines at a glance
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <NewsContainer />
      </div>
    </main>
  );
}
