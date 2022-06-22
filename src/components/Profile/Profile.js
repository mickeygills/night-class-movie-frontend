import React, { useState, useEffect } from "react";
// import axios from "axios";
import { toast } from "react-toastify";
import axios from "axios";

import Spinner from "../Spinner/Spinner";
import "./Profile.css";
import AxiosAuth from "../Axios/Axios";
// hook up the delete button - 10 mins
function Profile() {
  const [favoriteMovieArray, setFavoriteMovieArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchFavoriteMovie();
  }, []);

  async function fetchFavoriteMovie() {
    try {
      let payload = await AxiosAuth.get(
        `/api/user/get-user-favorite-movie`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
        }
      );
      setFavoriteMovieArray(payload.data.payload.favoriteMovie);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteFavoriteMovie(id, title) {
    try {
      let response = await AxiosAuth.delete(
        `/api/user/delete-favorite-movie`,
        {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
          },
          data: {
            movieId: id,
          },
        }
      );

      setFavoriteMovieArray(response.data.payload);
      toast.success(`${title} movie deleted`);
    } catch (e) {
      console.log(e);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (favoriteMovieArray.length === 0) {
    return (
      <div className="profile-container">
        <h1>Please go add some favorite movie</h1>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div>
        {favoriteMovieArray.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <div className="favorite-container">
                <div className="favorite-container-column favorite-one">
                  <img src={`${item.image}`} alt={item.title} />
                </div>

                <div className="favorite-container-column favorite-two">
                  <h1>{item.title}</h1>
                  <div>{item.plot}</div>
                  <div className="delete-button">
                    <button
                      onClick={() =>
                        handleDeleteFavoriteMovie(item._id, item.title)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
