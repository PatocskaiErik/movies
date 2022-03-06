import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import "../styles/detailButton.css";
import ReactPlayer from "react-player";
import axios from "axios";

import {
  fetchIMDBId,
  fetchMovieCast,
  fetchData,
  fetchTrailer,
  fetchWikiMedia
} from "../Service/Service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "120vh",
  height: "90vh",
  backgroundColor: "#1B2631",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 4
};

const ContentModal = ({ children, movieID, moviePoster }) => {
  const [open, setOpen] = useState(false);
  const [imdbID, setImdbID] = useState("");
  const [plotShort, setPlotShort] = useState("");
  const [movieCast, setMovieCast] = useState();
  const [overview, setOverview] = useState();
  const [originalTitle, setOriginalTitle] = useState();
  const [videoURL, setVideoURL] = useState();
  const [tagline, setTagline] = useState();
  const [errorImdbID, setErrorImdbID] = useState();
  const [errorMovieCast, setErrorMovieCast] = useState();
  const [errorFetchData, setErrorFetchData] = useState();
  const [errorFetchTrailer, setErrorFetchTrailer] = useState();
  const [errorWikiMedia, setErrorWikiMedia] = useState();
  const [releaseDate, setReleaseDate] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!imdbID && !errorImdbID) {
      fetchIMDBId(movieID, setImdbID, setErrorImdbID);
    }
    if (!plotShort && !errorWikiMedia) {
      fetchWikiMedia(imdbID, setPlotShort, setErrorWikiMedia);
    }
    if (!movieCast && !errorMovieCast) {
      fetchMovieCast(movieID, setMovieCast, setErrorMovieCast);
    }
    if (!overview && !originalTitle) {
      fetchData(
        movieID,
        setOverview,
        setOriginalTitle,
        setTagline,
        setReleaseDate,
        setErrorFetchData
      );
    }
    if (!videoURL && !errorFetchTrailer) {
      fetchTrailer(movieID, setVideoURL, setErrorFetchTrailer);
    }
  }, []);

  return (
    <div>
      <Button className="media" onClick={handleOpen}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {originalTitle}
            <div>({tagline ? tagline : releaseDate})</div>
          </Typography>
          <div className="poster-hero">
            <img src={moviePoster} className="movie-poster" />
            {plotShort ? plotShort : overview}
          </div>
          <div className="actor-title">Actors</div>
          <div className="actor-container">
            {movieCast
              ? movieCast.map((actor) => {
                  return (
                    <div className="actor" key={actor.id}>
                      <img
                        className="actor-photo"
                        alt="Photo"
                        src={
                          actor.profile_path
                            ? "https://image.tmdb.org/t/p/w185/" +
                              actor.profile_path
                            : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                        }
                      />
                      <div className="actor-name">{actor.name}</div>
                    </div>
                  );
                })
              : "Missing data"}
          </div>
          <div className="trailer-container">
            <div className="trailer-title">Trailer</div>
            <div>
              {!videoURL ? (
                <div>Video is missing :(</div>
              ) : (
                <ReactPlayer
                  className="react-player"
                  url={`https://www.youtube.com/watch?v=${videoURL}`}
                  controls={true}
                />
              )}
            </div>
          </div>
          <>
            <div className="button-container">
              <Button
                sx={{ margin: 1 }}
                className="button-links"
                href={`https://en.wikipedia.org/wiki/${originalTitle}`}
                target="_blank"
                variant="outlined"
              >
                WIKIPEDIA
              </Button>
              <Button
                sx={{ margin: 1 }}
                href={`https://www.imdb.com/title/${imdbID}`}
                target="_blank"
                variant="outlined"
              >
                IMDB
              </Button>
            </div>
          </>
        </Box>
      </Modal>
    </div>
  );
};
export default ContentModal;
