import React from "react";
import { Button } from "@mui/material";
import "../App.css";
import backgroundVideo from "../videos/Top10.mp4";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home({ title, setTitle }) {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <div className="commercial-container">
        <div className="title">MOVIE DATABASE</div>
        <video src={backgroundVideo} autoPlay loop muted />
      </div>
      <div className="Container">
        <form className="form" onSubmit={() => navigate("/details")}>
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
        </form>
      </div>
    </div>
  );
}

export default Home;
