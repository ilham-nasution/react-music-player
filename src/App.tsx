import { useEffect, useState } from "react";
import TrackInterface from "./types/TrackInterface";
import SongCard from "./components/SongCard";

function App() {
  const [chartList, setChartList] = useState<TrackInterface[]>([]);

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

  useEffect(() => {
    fetchChartList();
  }, []);

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-3xl font-bold mb-3">Top Music Chart</h1>
      <div className="overflow-x-scroll flex gap-3">
        {chartList.map((track) => (
          <SongCard track={track} />
        ))}
      </div>
    </div>
  );
}

export default App;
