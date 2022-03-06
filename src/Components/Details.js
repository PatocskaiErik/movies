import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popcorn from "../picture/popcorn.jpeg";
import { MetroSpinner } from "react-spinners-kit";
import ContentModal from "./ContentModal";
import { searchMovies } from "../Service/Service";

import "../App.css";

const Details = ({ title }) => {
  const [movies, setMovies] = useState();
  const [errorGraphQl, setErrorGraphQl] = useState();

  let moment = require("moment");

  useEffect(() => {
    searchMovies(title, setMovies, setErrorGraphQl);
  }, []);

  if (!movies && !errorGraphQl) {
    return (
      <div className="Home">
        <div className="topnav">
          <Link to={`/`}>
            <div className="#home">Home</div>
          </Link>
        </div>
        <div className="spinner">
          <MetroSpinner size={50} color="#686769" />
        </div>
      </div>
    );
  }

  if (errorGraphQl) {
    return (
      <div className="Home">
        <div className="topnav">
          <Link to={`/`}>
            <div className="#home">Home</div>
          </Link>
        </div>
        <div>Please try again later... :(</div>
      </div>
    );
  }

  return (
    <div>
      <div className="topnav">
        <Link to={`/`}>
          <div className="#home">Home</div>
        </Link>
      </div>
      <div className="border">
        {movies.map((movie) => {
          return (
            <ContentModal
              key={movie.id}
              movieName={movie.name}
              movieID={movie.id}
              moviePoster={movie.poster == null ? Popcorn : movie.poster.large}
            >
              <figure className="movie" key={movie.id} id="mov">
                <div className="movie__hero">
                  <img
                    src={movie.poster == null ? Popcorn : movie.poster.large}
                    alt="Poster"
                    className="movie__img"
                  />
                </div>
                <div className="movie__content">
                  <div className="movie__title">
                    <h1 className="heading__primary">
                      {movie.name} <i className="fas fa-fire"></i>
                    </h1>
                    <div className="movie__tag movie__tag--1">
                      #{movie.genres[0] ? movie.genres[0].name : ""}
                    </div>
                    <div className="movie__tag movie__tag--2">
                      #{movie.genres[1] ? movie.genres[1].name : ""}
                    </div>
                  </div>
                  <p className="movie__description">{movie.overview}</p>
                  <div className="movie__details">
                    <p className="movie__detail">
                      <span className="icons icons-grey">
                        <i className="fas fa-clock"></i>{" "}
                      </span>
                      Duration: {Math.floor(movie.runtime / 60)}h{" "}
                      {movie.runtime % 60}m
                    </p>
                    <p className="movie__detail">
                      Release date:{" "}
                      {moment.utc(movie.releaseDate).format("MM/DD/YYYY")}
                    </p>
                    <p className="scores">
                      Scores: {movie.score ? movie.score : ""}
                    </p>
                  </div>
                </div>
              </figure>
            </ContentModal>
          );
        })}
      </div>
    </div>
  );
};
export default Details;
