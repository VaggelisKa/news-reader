"use client"

import { useState, useEffect } from "react"
import { fetchNews } from "@/lib/news"
import NewsFilters from "@/components/news-filters"
import NewsList from "@/components/news-list"
import type { Article } from "@/lib/types"

export default function NewsContainer() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState("us")
  const [category, setCategory] = useState("all")

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      try {
        const news = await fetchNews(country, category)
        setArticles(news.articles)
      } catch (error) {
        console.error("Error loading news:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [country, category])

  return (
    <div className="space-y-4">
      <NewsFilters
        selectedCountry={country}
        onCountryChange={setCountry}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      {loading ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border rounded-md p-4 space-y-2">
              <div className="animate-pulse rounded-md bg-muted h-4 w-3/4" />
              <div className="animate-pulse rounded-md bg-muted h-3 w-full" />
              <div className="animate-pulse rounded-md bg-muted h-3 w-full" />
              <div className="animate-pulse rounded-md bg-muted h-3 w-2/3" />
              <div className="flex justify-between items-center pt-2">
                <div className="animate-pulse rounded-md bg-muted h-3 w-1/4" />
                <div className="animate-pulse rounded-md bg-muted h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NewsList articles={articles} />
      )}
    </div>
  )
}

