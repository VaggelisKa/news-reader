"use client"

import { useState } from "react"
import type { Article } from "@/lib/types"
import NewsCard from "@/components/news-card"

interface NewsListProps {
  articles: Article[]
}

export default function NewsList({ articles }: NewsListProps) {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedArticle(expandedArticle === id ? null : id)
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard
          key={article.url}
          article={article}
          isExpanded={expandedArticle === article.url}
          onToggleExpand={() => toggleExpand(article.url)}
        />
      ))}
    </div>
  )
}

