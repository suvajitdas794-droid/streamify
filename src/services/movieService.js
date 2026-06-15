import axios from 'axios';

const API_KEY = '8f8d0f9b1fab8feea94c32d1fba1d7fb';
const BASE_URL = 'https://api.themoviedb.org/3';

// Search movies by title
export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
    }
  });
  return response.data.results;
};

// Get movies by genre
export const getMoviesByGenre = async (genreId) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreId,
      sort_by: 'popularity.desc'
    }
  });
  return response.data.results;
};

// Get all genres list
export const getGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY }
  });
  return response.data.genres;
};

// Get popular movies (default load)
export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY }
  });
  return response.data.results;
};