import { request } from "graphql-request";
import axios from "axios";

export const searchMovies = async (title, setMovies, setErrorGraphQl) => {
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
    }
}`;

  const url = "https://tmdb.sandbox.zoosh.ie/dev/graphql";

  try {
    request("https://tmdb.sandbox.zoosh.ie/dev/graphql", query).then((data) => {
      const response = data.searchMovies;
      setMovies(response);
      console.log(response);
    });
  } catch (error) {
    setErrorGraphQl(error);
    console.warn("We have some issues with the GraphQl request!");
  }
};

export const fetchIMDBId = async (movieID, setImdbID, setErrorImdbID) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/external_ids?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*`
    );
    if (data) {
      setImdbID(data.imdb_id);
    }
  } catch (error) {
    setErrorImdbID(error);
    console.warn("We have some issues with the ImdbID request!");
  }
};

export const fetchMovieCast = async (
  movieID,
  setMovieCast,
  setErrorMovieCast
) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*&language=en-US`
    );

    if (data) {
      setMovieCast(data.cast);
    }
  } catch (error) {
    setErrorMovieCast(error);
    console.warn("We have some issues with the MovieCast request! ");
  }
};

export const fetchData = async (
  movieID,
  setOverview,
  setOriginalTitle,
  setTagline,
  setErrorFetchData
) => {
  try {
    const { data } = await axios.get(
      `https://www.myapifilms.com/tmdb/movieInfoImdb?idIMDB=${movieID}&token=268f32cd-409c-490e-bc9c-b6225e6ab4c2&format=json&language=en&alternativeTitles=0&casts=0&images=0&keywords=0&releases=0&videos=0&translations=0&similar=0&reviews=0&lists=0`
    );

    setOverview(data.data.overview);
    setOriginalTitle(data.data.original_title);
    setTagline(data.data.tagline);
  } catch (error) {
    setErrorFetchData(error);
    console.warn("We have some issues with the FetchTrailer request!");
  }
};

export const fetchTrailer = async (
  movieID,
  setVideoURL,
  setErrorFetchTrailer
) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*&language=en-US`
    );
    setVideoURL(data.results[0].key);
  } catch (error) {}
};

export const fetchWikiMedia = async (
  imdbID,
  setPlotShort,
  setErrorWikiMedia
) => {
  try {
    const { data } = await axios.get(
      `https://imdb-api.com/en/API/Wikipedia/k_w0if4ch2/${imdbID}`
    );

    if (data) {
      setPlotShort(data.plotShort.plainText);
    }
  } catch (error) {
    setErrorWikiMedia(error);
    console.warn("We have some issues with the WikiMedia request!");
  }
};
