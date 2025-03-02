import { fetchNews } from "@/lib/news";
import NewsList from "@/components/news-list";

export default async function NewsContainer({
  filters,
}: {
  filters: { country?: string; category?: string };
}) {
  const newsResponse = await fetchNews(filters.country, filters.category);

  return <NewsList articles={newsResponse.articles} />;
}
