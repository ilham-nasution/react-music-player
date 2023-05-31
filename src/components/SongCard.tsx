import TrackInterface from "../types/TrackInterface";

export default function SongCard({ track }: { track: TrackInterface }) {
  return (
    <div>
      <img
        src={track.images.coverart}
        alt={track.title}
        className="rounded-lg"
      />
      <p className="text-xs line-clamp-2 w-40">{track.title}</p>
      <p className="text-sm font-bold line-clamp-2">by {track.subtitle}</p>
    </div>
  );
}
