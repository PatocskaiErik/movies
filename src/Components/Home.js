import React from "react";
import { Button } from "@mui/material";
import "../App.css";
import backgroundVideo from "../videos/Top10.mp4";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { useState } from "react";
import { TextField } from "@mui/material";
import { responsePathAsArray } from "graphql";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Home() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState();
  const [success, setSuccess] = useState();

  const searchInputRef = useRef(null);

  const navigate = useNavigate();

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const query = `{
    searchMovies(query: "${title}") {
    id
    name
    overview
    releaseDate
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
      request("https://tmdb.sandbox.zoosh.ie/dev/graphql", query).then((data) =>
        console.log(data)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Home">
      <form className="form" onSubmit={searchMovies}>
        <div className="commercial-container">
          <div className="title">MOVIE DATABASE</div>
          <video src={backgroundVideo} autoPlay loop muted />
        </div>
        <div className="Container">
          <div className="Searchbar">
            <TextField
              className="textfield"
              label="Search a movie"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: 400 }}
            />
            <Button variant="outlined" type="submit">
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Home;
