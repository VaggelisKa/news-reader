import NewsContainer from "@/components/news-container";
import NewsContainerSkeleton from "@/components/news-container-skeleton";
import NewsFilters from "@/components/news-filters";
import { Newspaper } from "lucide-react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { country, category, q } = await searchParams;

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
      <div className="container mx-auto py-6 px-4 md:px-6 space-y-4">
        <NewsFilters />
        <Suspense
          key={`${country}-${category}-${q}`}
          fallback={<NewsContainerSkeleton />}
        >
          <NewsContainer filters={{ country, category, query: q }} />
        </Suspense>
      </div>
    </main>
  );
}
