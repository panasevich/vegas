import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "reactjs-popup/dist/index.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import "./app.scss";
import { Popup } from "./components/popup";
import {
  useGetMovieItemQuery,
  useGetMoviesQuery,
} from "./data/services/movies";

const App = () => {
  // here would be better use useReducer hook, but I don't have time, sorry
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [videoKey, setVideoKey] = useState();

  const { data: movies, isLoading: isMoviesLoading } = useGetMoviesQuery({
    search,
    page,
  });
  const { data: movieItemData } = useGetMovieItemQuery(
    { id: selectedMovie },
    { skip: !selectedMovie }
  );

  const viewTrailer = (movie) => {
    setSelectedMovie(movie.id);
    setIsOpen(true);
  };
  useEffect(() => {
    setPage(1);
  }, [search]);
  useEffect(() => {
    if (movieItemData?.videos && movieItemData?.videos.results.length) {
      const trailer = movieItemData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : movieItemData.videos.results[0].key);
    }
  }, [movieItemData?.id, movieItemData?.videos]);

  const onClose = () => {
    setIsOpen(false);
    setVideoKey(null);
    setSelectedMovie(null);
  };

  const handleSearchMovies = (value) => {
    setSearch(value);
  };

  const handleSetPage = () => {
    if (!isMoviesLoading) {
      setPage(movies.page + 1);
    }
  };

  return (
    <div className="App">
      <Header searchMovies={handleSearchMovies} search={search} />

      <div className="container">
        <Popup isOpen={isOpen} onClose={onClose} header="Trailer">
          {videoKey ? (
            <YouTubePlayer videoKey={videoKey} />
          ) : (
            <div style={{ padding: "30px" }}>
              <h6>no trailer available. Try another movie</h6>
            </div>
          )}
        </Popup>

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                handlePagination={handleSetPage}
                movies={movies}
                viewTrailer={viewTrailer}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
