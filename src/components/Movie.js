import React from "react";

const Movie = ({ movie, onClick }) => {
  // console.log(movie);
  const {
    title,
    release_date,
    vote_average,
    overview,
    poster_path,
    backdrop_path
  } = movie;

  return (
    <div>
      {title} - {release_date} - {vote_average}
      <p>{overview || "Maaf, tidak ada dekripsi"}</p>
      <img src={"https://image.tmdb.org/t/p/w200" + poster_path} alt={title} />
      <img
        src={
          backdrop_path
            ? "https://image.tmdb.org/t/p/w200" + backdrop_path
            : "#"
        }
        alt={title}
      />
    </div>
  );
};
// const Movie = ({ data }) => console.log(data);
export default Movie;
