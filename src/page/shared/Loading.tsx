export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      <p className="mt-4 text-muted-foreground text-lg font-medium">
        Loading...
      </p>
    </div>
  );
}
