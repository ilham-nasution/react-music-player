import { useEffect, useState } from "react";

import TrackInterface from "./types/TrackInterface";
import GenreInterface from "./types/GenreInterface";
import SongCard from "./components/SongCard";
import GenreBtn from "./components/GenreBtn";

function App() {
  const [chartList, setChartList] = useState<TrackInterface[]>([]);
  const [genreList, setGenreList] = useState<GenreInterface[]>([]);

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

  useEffect(() => {
    fetchChartList();
    fetchGenreList();
  }, []);

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
          <GenreBtn key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}

export default App;
