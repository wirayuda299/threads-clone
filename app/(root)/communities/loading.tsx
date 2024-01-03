export default function Loading() {
  return (
    <div className="flex flex-wrap justify-center gap-5 p-5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="aspect-square min-h-60  max-w-60 animate-pulse rounded-lg bg-main"
        ></div>
      ))}
    </div>
  );
}
