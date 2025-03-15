"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import NewsCard from "@/components/news-card";

interface NewsListProps {
  results: Article[];
}

export default function NewsList({ results }: NewsListProps) {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {results.map((article) => (
        <NewsCard
          key={article.article_id}
          article={article}
          isExpanded={expandedArticle === article.article_id}
          onToggleExpand={() => toggleExpand(article.article_id)}
        />
      ))}
    </div>
  );
}
