import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import GenreFilter from './components/GenreFilter';
import RatingFilter from './components/RatingFilter';
import Loader from './components/Loader';
import {
  searchMovies,
  getPopularMovies,
  getGenres,
  getMoviesByGenre
} from './services/movieService';
import './App.css';

function App() {
  // State Management with useState
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [minRating, setMinRating] = useState(0);

  // Load popular movies + genres on start
  useEffect(() => {
    loadPopularMovies();
    loadGenres();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      console.error('Failed to load genres');
    }
  };

  // Search by title
  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setSelectedGenre('');
    try {
      const data = await searchMovies(query);
      if (data.length === 0) {
        setError('No movies found for your search.');
      }
      setMovies(data);
    } catch (err) {
      setError('Search failed. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Filter by genre
  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
    setLoading(true);
    setError('');
    try {
      const data = genreId
        ? await getMoviesByGenre(genreId)
        : await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to filter by genre.');
    } finally {
      setLoading(false);
    }
  };

  // Filter by rating (client-side)
  const filteredMovies = movies.filter(
    (movie) => movie.vote_average >= minRating
  );

  return (
    <div className="app">
      <header>
        <h1>🎬 Streamify</h1>
        <p>Browse and search your favorite movies</p>
      </header>

      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />
        <RatingFilter
          minRating={minRating}
          onRatingChange={setMinRating}
        />
      </div>

      {/* Conditional Rendering */}
      {loading && <Loader />}
      {error && <div className="error-msg">⚠️ {error}</div>}
      {!loading && !error && <MovieList movies={filteredMovies} />}
    </div>
  );
}

export default App;