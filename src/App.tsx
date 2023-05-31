import { useEffect, useState } from "react";

import TrackInterface from "./types/TrackInterface";
import GenreInterface from "./types/GenreInterface";
import SongCard from "./components/SongCard";
import GenreBtn from "./components/GenreBtn";
import SongCardSkeleton from "./components/SongCardSkeleton";

function App() {
  const [chartList, setChartList] = useState<TrackInterface[]>([]);
  const [genreList, setGenreList] = useState<GenreInterface[]>([]);
  const [genreTrackList, setGenreTrackList] = useState<TrackInterface[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreInterface>({
    count: 0,
    countryid: "",
    id: "",
    listid: "genre-global-chart-1",
    name: "Pop",
    urlPath: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleGenreBtn = (genre: GenreInterface) => {
    setSelectedGenre(genre);
  };

  const fetchChartList = async () => {
    try {
      const response = await fetch(
        "https://shazam.p.rapidapi.com/charts/track",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
            "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setChartList(result.tracks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGenreList = async () => {
    try {
      const response = await fetch(
        "https://shazam.p.rapidapi.com/charts/list",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
            "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setGenreList(result.global.genres);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGenreTracks = async (listId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://shazam.p.rapidapi.com/charts/track?listId=${listId}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
            "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setGenreTrackList(result.tracks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartList();
    fetchGenreList();
  }, []);

  useEffect(() => {
    fetchGenreTracks(selectedGenre.listid);
  }, [selectedGenre]);

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-3xl font-bold mb-3">Top Music Chart</h1>
      <div className="overflow-x-scroll flex gap-3">
        {chartList.map((track) => (
          <SongCard key={track.key} track={track} />
        ))}
      </div>
      <div className="flex overflow-x-scroll gap-3 my-3">
        {genreList.map((genre) => (
          <GenreBtn
            key={genre.id}
            genre={genre}
            selectedGenre={selectedGenre}
            handleGenreBtn={handleGenreBtn}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? [...Array(20).keys()].map(() => <SongCardSkeleton />)
          : genreTrackList.map((track) => (
              <SongCard key={track.key} track={track} />
            ))}
      </div>
    </div>
  );
}

export default App;
