import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import AxiosAuth from "../Axios/Axios";

import "./MovieDetail.css";

function MovieDetail() {
  let params = useParams();

  const [movieInfo, setMovieInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleMovie();
  }, []);

  async function fetchSingleMovie() {
    try {
      let response = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&t=${params.title}`
      );

      setMovieInfo(response.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }

  async function handleAddToFavorite() {
    try {
      //image, title, plot
      // /add-favorite-movie
      // headers authorization - google axios bearer token
      //time limit 15 to 20 mins
      await AxiosAuth.post(
        "/api/user/add-favorite-movie",
        {
          image: movieInfo.Poster,
          title: movieInfo.Title,
          plot: movieInfo.Plot,
        },
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );
      toast.success("Congrats! favorite movie saved!");
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.payload[0]}`);
    }
  }

  return (
    <div className="movie-detail-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="movie-detail-column">
            <div className="movie-detail-poster">
              <img src={movieInfo.Poster} alt={movieInfo.Title} />
            </div>
          </div>
          <div className="movie-detail-column">
            <div className="movie-details">
              <div>
                <h1>{movieInfo.Title}</h1>
              </div>

              <div>
                <p>Year: {movieInfo.Year}</p>
              </div>

              <div>
                <p>Rating {movieInfo.Rated}</p>
              </div>

              <div>
                <p>Released {movieInfo.Released}</p>
              </div>

              <div>
                <p>Actors: {movieInfo.Actors}</p>
              </div>

              <div>
                <p>Awards: {movieInfo.Awards}</p>
              </div>

              <div className="plot-style">
                <p>Plot: {movieInfo.Plot}</p>
              </div>

              <div>
                <button onClick={handleAddToFavorite}>Add To Favorite</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetail;

/*
  1. setup the router in app.js /movie/:title
  2. MovieDetail component should console.log() out the single movie data

  time limit: 15 to 20 mins
*/
