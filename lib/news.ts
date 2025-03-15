import type { NewsResponse } from "./types";

const API_KEY = process.env.NEWS_API_KEY;

export async function fetchNews(
  country = "us",
  category = ""
): Promise<NewsResponse> {
  try {
    let apiUrl = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=${country}&language=en&removeduplicate=1&prioritydomain=medium`;

    if (category && category !== "top") {
      apiUrl += `&category=${category}`;
    }

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = (await response.json()) as NewsResponse;

    return data;
  } catch (error) {
    console.error("Error fetching news:", error);

    return {
      status: "error",
      results: [],
    };
  }
}
