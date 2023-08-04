import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const apiKey = '4f63df4bce5cf0f25ffc1ca28da5859a'; // Replace this with your actual TMDb API key

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a movie title to search.');
      return;
    }

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: searchTerm,
        },
      });

      setMovies(response.data.results);
    } catch (error) {
      alert('An error occurred while fetching movie data. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Enter a movie title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <h2>{movie.title}</h2>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
