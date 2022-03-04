import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { MetroSpinner } from "react-spinners-kit";
import "../styles/detailButton.css";
import ReactPlayer from "react-player";
import { fetchIMDBId } from "../Service/Service";
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

const ContentModal = ({ children, id, movieName, movieID, moviePoster }) => {
  const [open, setOpen] = useState(false);
  const [wikiMedia, setWikiMedia] = useState({});
  const [myApiFilms, setMyApiFilms] = useState();
  const [imdbID, setImdbID] = useState("");
  const [plotShort, setPlotShort] = useState("");
  const [wikimediaName, setWikimediaName] = useState("");
  const [movieCast, setMovieCast] = useState();
  const [overview, setOverview] = useState();
  const [originalTitle, setOriginalTitle] = useState();
  const [videoURL, setVideoURL] = useState();
  const [tagline, setTagline] = useState();
  const [error, setError] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchIMDBId = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/external_ids?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*`
    );

    if (data) {
      setImdbID(data.imdb_id);
    }
  };

  const fetchWikiMedia = async () => {
    const { data } = await axios.get(
      `https://imdb-api.com/en/API/Wikipedia/k_w0if4ch2/${imdbID}`
    );

    if (data) {
      setWikiMedia(data);
      setPlotShort(data.plotShort.plainText);
    }
  };

  const fetchMovieCast = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*&language=en-US`
    );

    if (data) {
      setMovieCast(data.cast);
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://www.myapifilms.com/tmdb/movieInfoImdb?idIMDB=${movieID}&token=268f32cd-409c-490e-bc9c-b6225e6ab4c2&format=json&language=en&alternativeTitles=0&casts=0&images=0&keywords=0&releases=0&videos=0&translations=0&similar=0&reviews=0&lists=0`
    );
    setOverview(data.data.overview);
    setOriginalTitle(data.data.original_title);
    setTagline(data.data.tagline);
  };

  const fetchTrailer = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*&language=en-US`
    );
    setVideoURL(data.results[0].key);
  };

  const fetchDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*&language=en-US`
    );
  };

  useEffect(() => {
    if (open) {
      fetchIMDBId();
    }
    if (!movieCast) {
      fetchMovieCast();
    }
    if (!overview && !originalTitle) {
      fetchData();
    }
    if (!videoURL) {
      fetchTrailer();
    }
  }, [open]);

  if (open && !wikiMedia) {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="spinner">
              <MetroSpinner size={50} color="#686769" />
            </div>
          </Box>
        </Modal>
      </>
    );
  }

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
            <div>({tagline})</div>
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
              : ""}
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
            <div className="container">
              <Button>Wikipedia</Button>
              <Button>IMDB</Button>
            </div>
          </>
        </Box>
      </Modal>
    </div>
  );
};
export default ContentModal;
