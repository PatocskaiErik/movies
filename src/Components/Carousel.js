import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/Carousel.css";

const handleDragStart = (e) => e.preventDefault();

export const Carousel = ({ movieCast }) => {
  const responsive = {
    0: {
      items: 3
    },
    512: {
      items: 5
    },
    1024: {
      items: 5
    }
  };
  const items = movieCast
    ? movieCast.map((actor) => (
        <div className="carouselItem">
          <img
            src={
              actor.profile_path
                ? "https://image.tmdb.org/t/p/w300/" + actor.profile_path
                : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
            }
            alt={actor?.name}
            ondDragStart={handleDragStart}
            autoplay={true}
            className="carouselItem_img"
          />
          <div className="carouselItem_txt">{actor?.name}</div>
        </div>
      ))
    : "Missing data";
  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      disableDotsControls
      items={items}
    />
  );
};
