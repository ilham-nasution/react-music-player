import TrackInterface from "../types/TrackInterface";

export default function SongCard({ track }: { track: TrackInterface }) {
  return (
    <div>
      <img
        src={track.images.coverart}
        alt={track.title}
        className="h-20 rounded-lg"
      />
      <p className="text-xs w-20 line-clamp-2">{track.title}</p>
      <p className="text-xs font-bold line-clamp-2">by {track.subtitle}</p>
    </div>
  );
}
