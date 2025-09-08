export default async function Pulse() {
  return (
    <div className="space-y-3">
      <div className="bg-muted h-4 animate-pulse rounded" />
      <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
      <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
    </div>
  );
}
