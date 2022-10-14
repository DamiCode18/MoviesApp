import axios from "axios";

export const fetchMovies = (title) => {
  return axios
    .get(`https://www.omdbapi.com/?t=${title}&apikey=f6da9117`)
    .then((res) => res.data);
};
