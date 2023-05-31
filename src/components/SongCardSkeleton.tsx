export default function SongCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-slate-200 h-56 rounded"></div>
      <div className="bg-slate-200 w-40 h-4 my-1 rounded"></div>
      <div className="bg-slate-200 w-24 h-4 rounded"></div>
    </div>
  );
}
