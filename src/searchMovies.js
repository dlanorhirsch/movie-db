import React from 'react';
import {useState} from 'react';
import MovieCard from "./movieCard";

export default function SearchMovies(){

  const [query, setQuery] = useState('');

  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=1e93866844da4c65aabfbe841f806b88&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results);
      setMovies(data.results);
    } catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie Name: </label>
        <input className="input" type="text" name="query"
          placeholder="enter name"
          value={query} onChange={(e) => setQuery(e.target.value)}
          />
        <button className="button" type="submit">Search</button>
      </form>
      <div className="card-list">
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie}  key={movie.id} />

        ))}
      </div>
    </div>
  )
}