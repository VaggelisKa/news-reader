"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, RotateCcw, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "./ui/input";

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
  const selectedQuery = searchParams.get("q") ?? "";
  const hasActiveFilters =
    selectedCountry !== "" ||
    (selectedCategory !== "top" && !!selectedCategory) ||
    selectedQuery !== "";

  return (
    <div className="space-y-4 mb-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const query = formData.get("q") as string;

          router.push(`${pathname}?${createQueryString("q", query)}`);
        }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            defaultValue={selectedQuery}
            name="q"
            className="pl-8"
            placeholder="Search for news"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Select
            value={selectedCountry}
            onValueChange={(country) =>
              router.push(
                `${pathname}?${createQueryString("country", country)}`
              )
            }
          >
            <SelectTrigger className="w-full md:w-[180px]">
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
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                tabIndex={-1}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              router.push(pathname);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
