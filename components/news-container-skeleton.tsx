export default function NewsContainerSkeleton() {
  return (
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
  );
}
