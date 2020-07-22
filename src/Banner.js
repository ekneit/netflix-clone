import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const requst = await axios.get(requests.fetchNetFlixOriginals);
      setMovie(
        requst.data.results[
          Math.floor(Math.random() * requst.data.results.length - 1)
        ]
      );
      return requst;
    }

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      {/*header  <<< Background image  */}
      <div className="banner__content">
        {/* title */}
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        {/* div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
