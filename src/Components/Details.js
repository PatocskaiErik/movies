import { request } from "graphql-request";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popcorn from "../picture/popcorn.jpeg";
import { MetroSpinner } from "react-spinners-kit";
import ContentModal from "./ContentModal";

import "../App.css";

const Details = ({ title }) => {
  const [movies, setMovies] = useState();

  let moment = require("moment");

  const searchMovies = async () => {
    const query = `{
    searchMovies(query: "${title}") {
    id
    name
    runtime
    overview
    score
    releaseDate
    genres {
      id
      name
    }
    poster {
      large
    }
    cast {
      id
      person {
        name
      }
      role {
        ... on Cast {
          character
        }
      }
    }
  }
}`;

    const url = "https://tmdb.sandbox.zoosh.ie/dev/graphql";

    try {
      request("https://tmdb.sandbox.zoosh.ie/dev/graphql", query).then(
        (data) => {
          const response = data.searchMovies;
          setMovies(response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  if (!movies) {
    return (
      <div className="Home">
        <div className="topnav">
          <Link to={`/`}>
            <div className="#home">Home</div>
          </Link>
          <Link to={`/details`}>
            <div className="active">Results</div>
          </Link>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="spinner">
          <MetroSpinner size={50} color="#686769" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="topnav">
        <Link to={`/`}>
          <div className="#home">Home</div>
        </Link>
        <Link to={`/details`}>
          <div className="active">Results</div>
        </Link>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="border">
        {movies.map((movie) => {
          return (
            <ContentModal key={movie.id} movieName={movie.name}>
              <figure className="movie" key={movie.id}>
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
                      {movie.runtime % 60} m
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
