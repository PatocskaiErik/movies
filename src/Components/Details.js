import { request } from "graphql-request";
import { useEffect, useState } from "react";
import "../App.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "material-ui-icons/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Details = ({ title }) => {
  const [movies, setMovies] = useState();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch"
        }
      }
    }
  }));

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        {movies.map((movie) => {
          return (
            <div class="movie_card" id="bright">
              <div class="info_section">
                <div class="movie_header">
                  <img
                    class="locandina"
                    src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
                  />
                  <h1>Bright</h1>
                  <h4>2017, David Ayer</h4>
                  <span class="minutes">117 min</span>
                  <p class="type">Action, Crime, Fantasy</p>
                </div>
                <div class="movie_desc">
                  <p class="text">
                    Set in a world where fantasy creatures live side by side
                    with humans. A human cop is forced to work with an Orc to
                    find a weapon everyone is prepared to kill for.
                  </p>
                </div>
                <div class="movie_social">
                  <ul>
                    <li>
                      <i class="material-icons">share</i>
                    </li>
                    <li>
                      <i class="material-icons"></i>
                    </li>
                    <li>
                      <i class="material-icons">chat_bubble</i>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="blur_back bright_back"></div>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};
export default Details;
