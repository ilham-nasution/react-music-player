import GenreInterface from "../types/GenreInterface";

export default function GenreBtn({
  genre,
  selectedGenre,
  handleGenreBtn,
}: {
  genre: GenreInterface;
  selectedGenre: GenreInterface;
  handleGenreBtn: (genre: GenreInterface) => void;
}) {
  return (
    <button
      onClick={() => handleGenreBtn(genre)}
      className={`${
        selectedGenre.name === genre.name && "bg-black text-white"
      } border-2 border-black py-1 px-2 rounded-full`}
    >
      <p className="text-xs whitespace-nowrap">{genre.name}</p>
    </button>
  );
}
