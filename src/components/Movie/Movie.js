import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import MovieList from "./MovieList";
import Pagination from "../Pagination/Pagination";

import "./Movie.css";

let dopeMovieArray = [
  "the lord of the rings",
  "predator",
  "blade runner",
  "shield",
  "avengers",
  "dr strange",
];

function Movie() {
  let randomMovie =
    dopeMovieArray[Math.floor(Math.random() * dopeMovieArray.length)];

  const [movieTitle, setMovieTitle] = useState(randomMovie);

  const [movieArray, setMovieArray] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [totalMovieResult, setTotalMovieResult] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovie();
  }, [page]);

  function handleInputSearch(e) {
    setMovieTitle(e.target.value);
  }

  async function fetchMovie() {
    setIsLoading(true);

    try {
      let response = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&s=${movieTitle}&page=${page}`
      );

      // console.log(response);

      setTotalMovieResult(response.data.totalResults);
      setMovieArray(response.data.Search);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      // console.log(e);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      fetchMovie();
    }
  }

  return (
    <>
      <div className="movie-container">
        <div className="movie-input">
          <input
            type="text"
            onChange={handleInputSearch}
            onKeyPress={handleKeyPress}
          />
          <button onClick={fetchMovie}>Search</button>
        </div>
      </div>

      <>
        {movieArray && (
          <Pagination
            totalMovieResult={totalMovieResult}
            page={page}
            setPage={setPage}
            itemLimit={10}
          />
        )}
      </>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="movie-list-container">
          {movieArray && <MovieList movieArray={movieArray} />}
        </div>
      )}
    </>
  );
}

export default Movie;
