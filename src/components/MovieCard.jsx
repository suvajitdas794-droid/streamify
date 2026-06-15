const IMG_BASE = 'https://image.tmdb.org/t/p/w300';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `${IMG_BASE}${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'
        }
        alt={movie.title}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="rating">⭐ {movie.vote_average?.toFixed(1)}</p>
        <p className="year">
          📅 {movie.release_date?.split('-')[0] || 'N/A'}
        </p>
        <p className="overview">
          {movie.overview?.slice(0, 100)}...
        </p>
      </div>
    </div>
  );
}

export default MovieCard;