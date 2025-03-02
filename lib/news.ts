import type { NewsResponse } from "./types";

const API_KEY = process.env.NEWS_API_KEY;

export async function fetchNews(
  country = "us",
  category = ""
): Promise<NewsResponse> {
  try {
    let apiUrl = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&max=20&country=${country}`;

    if (category && category !== "general") {
      apiUrl += `&category=${category}`;
    }

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();

    // Map the API response to include the image field
    // @ts-expect-error Disabled for now
    const articles = data.articles.map((article) => ({
      ...article,
      image: article.image || article.urlToImage || null,
    }));

    return {
      ...data,
      articles,
    };
  } catch (error) {
    console.error("Error fetching news:", error);

    return {
      status: "error",
      totalResults: mockArticles.length,
      articles: mockArticles,
    };
  }
}

// Update mock articles to include image URLs
const mockArticles = [
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "John Doe",
    title: "New AI breakthrough could revolutionize healthcare",
    description:
      "Researchers have developed a new AI model that can predict disease progression with unprecedented accuracy.",
    url: "https://example.com/article1",
    urlToImage: "https://picsum.photos/seed/ai-healthcare/800/600",
    image: "https://picsum.photos/seed/ai-healthcare/800/600",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: null,
  },
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: "Jane Smith",
    title: "Global climate summit reaches historic agreement",
    description:
      "World leaders have agreed to ambitious new targets to reduce carbon emissions by 2030.",
    url: "https://example.com/article2",
    urlToImage: "https://picsum.photos/seed/climate-summit/800/600",
    image: "https://picsum.photos/seed/climate-summit/800/600",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: null,
  },
  {
    source: { id: "wired", name: "Wired" },
    author: "Alex Johnson",
    title: "The future of work: How remote collaboration is evolving",
    description:
      "New tools and methodologies are changing how teams collaborate across distances.",
    url: "https://example.com/article3",
    urlToImage: "https://picsum.photos/seed/remote-work/800/600",
    image: "https://picsum.photos/seed/remote-work/800/600",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    content: null,
  },
  {
    source: { id: "financial-times", name: "Financial Times" },
    author: "Michael Brown",
    title: "Markets react to central bank interest rate decision",
    description:
      "Global markets showed mixed reactions to the latest interest rate announcement.",
    url: "https://example.com/article4",
    urlToImage: "https://picsum.photos/seed/market-reaction/800/600",
    image: "https://picsum.photos/seed/market-reaction/800/600",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: null,
  },
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Sarah Wilson",
    title: "Review: The latest smartphone that's changing the game",
    description:
      "This new device brings several innovations that could set new standards for the industry.",
    url: "https://example.com/article5",
    urlToImage: "https://picsum.photos/seed/smartphone-review/800/600",
    image: "https://picsum.photos/seed/smartphone-review/800/600",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    content: null,
  },
  {
    source: { id: "nature", name: "Nature" },
    author: "Dr. Robert Chen",
    title: "Breakthrough in quantum computing achieves new milestone",
    description:
      "Scientists have demonstrated quantum supremacy in a new class of problems.",
    url: "https://example.com/article6",
    urlToImage: "https://picsum.photos/seed/quantum-computing/800/600",
    image: "https://picsum.photos/seed/quantum-computing/800/600",
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    content: null,
  },
];
