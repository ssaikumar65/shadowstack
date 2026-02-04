const Row = () => (
  <div className="flex justify-between items-center py-3 border-b">
    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
  </div>
);

export default function Loading() {
  return (
    <div className="mt-10 border rounded-lg p-6">
      <div className="space-y-4">
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>

      <div className="mt-8 p-6 bg-muted rounded-lg">
        <div className="h-4 w-32 mb-4 bg-background rounded animate-pulse" />
        <div className="h-10 w-48 bg-background rounded animate-pulse" />
      </div>
    </div>
  );
}
