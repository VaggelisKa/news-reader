"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const categories = [
  { id: "top", name: "All" },
  { id: "business", name: "Business" },
  { id: "technology", name: "Technology" },
  { id: "science", name: "Science" },
  { id: "health", name: "Health" },
  { id: "entertainment", name: "Entertainment" },
  { id: "sports", name: "Sports" },
  { id: "world", name: "World" },
];

const countries = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "gr", name: "Greece" },
  { code: "dk", name: "Denmark" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "in", name: "India" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
];

export default function NewsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const selectedCountry = searchParams.get("country") ?? "";
  const selectedCategory = searchParams.get("category") ?? "top";

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <Select
          value={selectedCountry}
          onValueChange={(country) =>
            router.push(`${pathname}?${createQueryString("country", country)}`)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            className="focus-visible:outline-1 focus-visible:outline-primary rounded-md"
            key={category.id}
            href={`${pathname}?${createQueryString("category", category.id)}`}
            prefetch
          >
            <Button
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              tabIndex={-1}
            >
              {category.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
