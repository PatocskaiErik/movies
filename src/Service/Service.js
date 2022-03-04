import axios from "axios";

export const fetchIMDBId = async (movieID, setImdbID, setError) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/external_ids?api_key=5b931ae178d3d6e44b7f162d68bebb43&origin=*`
    );
    if (data) {
      setImdbID(data.imdb_id);
    }
  } catch (error) {
    setError(error);
  }
};
