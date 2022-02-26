import { request } from "graphql-request";
import { useEffect, useState } from "react";

const Details = ({ title }) => {
  const [movies, setMovies] = useState();

  const searchMovies = async () => {
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
      request("https://tmdb.sandbox.zoosh.ie/dev/graphql", query).then(
        (data) => {
          const response = data.searchMovies;
          setMovies(response);
          console.log(response);
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
    return <div>Betöltés</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return <div>{movie.name}</div>;
      })}
    </div>
  );
};
export default Details;
