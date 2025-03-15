import { formatDistanceToNow } from "date-fns";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import type { Article } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: Article;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function NewsCard({
  article,
  isExpanded,
  onToggleExpand,
}: NewsCardProps) {
  const publishedDate = article.pubDate
    ? formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })
    : "Recently";

  return (
    <div className="border rounded-md overflow-hidden hover:shadow-sm transition-shadow bg-card">
      <div className="relative animate-in h-48 w-full">
        <Image
          src={article.image_url || "/news-placeholder.jpg"}
          alt=""
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-medium line-clamp-2 hover:underline">
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1"
          >
            {article.title}
            <ExternalLink className="h-3 w-3 mt-1 flex-shrink-0" />
          </a>
        </h3>

        <p
          className={cn(
            "text-sm text-muted-foreground",
            isExpanded ? "" : "line-clamp-2"
          )}
        >
          {article.description || "No description available."}
        </p>

        <div className="flex justify-between items-center text-xs pt-2">
          <span className="text-muted-foreground">{article.source_name}</span>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{publishedDate}</span>
            <button
              onClick={onToggleExpand}
              className="p-1 rounded-full hover:bg-accent"
              aria-label={isExpanded ? "Collapse article" : "Expand article"}
            >
              {isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
