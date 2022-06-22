import React from "react";
import { Link } from "react-router-dom";

function MovieList({ movieArray }) {
  return (
    <>
      {movieArray.map((item) => {
        let poster = item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/300x477"
        return (
          <div key={item.imdbID}>
            <div>
              <img src={poster} alt="poster" />
            </div>

            <div>
              <Link to={`${item.Title}`}>
                <h2>{item.Title}</h2>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MovieList;
