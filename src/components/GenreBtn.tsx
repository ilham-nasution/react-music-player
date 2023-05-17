import GenreInterface from "../types/GenreInterface";

export default function GenreBtn({ genre }: { genre: GenreInterface }) {
  return (
    <div className="border-2 border-black py-1 px-2 rounded-full">
      <p className="text-xs whitespace-nowrap">{genre.name}</p>
    </div>
  );
}
