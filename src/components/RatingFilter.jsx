function RatingFilter({ minRating, onRatingChange }) {
  return (
    <div className="rating-filter">
      <label>Min Rating: {minRating} ⭐</label>
      <input
        type="range"
        min="0"
        max="10"
        step="0.5"
        value={minRating}
        onChange={(e) => onRatingChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

export default RatingFilter;