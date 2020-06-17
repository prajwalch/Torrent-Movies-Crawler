import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    async function getMoviesFromServer(customPage) {
        try {
            const DEFAULT_PAGE= Number(0);
            const response = await axios.get(`/movies?page=${customPage || DEFAULT_PAGE}`);
            const data = await response.data;
            setMovies(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMoviesFromServer()
        return () => {
            console.log('Cleared ...')
        }
    }, []);

    useEffect(() => {
        getMoviesFromServer(page)
        return () => {
            console.log('Cleared ...')
        }
    }, [page]);

    return (
        <div className="movies-container">
            <header className="browse-movies-header header">
                <h3 className="browse-movies">Browse Movies</h3>
            </header>
            <div className="movies">
                {isLoading ? 'Loading....' : (movies.map(movie => (
                    <div className="movie-wrapper" key={movie.movieTittle}>
                        <Link to={`/movies/${movie.movieLink}`}>
                            <img 
                            className="movie-thumbnail" 
                            src={movie.movieThumbnail} 
                            alt={movie.movieTittle} 
                            height="225" 
                            width="150"
                            />
                        </Link>
                        <div className="movie-details">
                            <p className="movie-year dim-text">{movie.movieYear}</p>
                            <Link to={`/movies/${movie.movieTittle}`}>
                                <h4 className="movie-tittle">{movie.movieTittle}</h4>
                            </Link>
                        </div>
                    </div>  
                )))}  
            </div>
            <p className="page-number">{page}</p>
            <button onClick={() => setPage(prev => prev + 1)} className="next-page">Next Page</button>
        </div>
    )
}

export default Home;