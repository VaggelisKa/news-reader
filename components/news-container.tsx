import { fetchNews } from "@/lib/news";
import NewsList from "@/components/news-list";
import EmptyNewsState from "./empty-news-state";

export default async function NewsContainer({
  filters,
}: {
  filters: { country?: string; category?: string };
}) {
  const newsResponse = await fetchNews(filters.country, filters.category);

  if (!newsResponse.results.length) {
    return <EmptyNewsState />;
  }

  return <NewsList results={newsResponse.results} />;
}
