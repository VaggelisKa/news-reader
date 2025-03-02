"use client";

import { FileQuestion, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyNewsState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">No articles found</h2>
      <p className="text-muted-foreground mb-4">
        No articles found for the selected "world" category. Try changing your
        filters.
      </p>
      <Button onClick={() => router.push("/")}>
        Reset Filters <RotateCcw className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
