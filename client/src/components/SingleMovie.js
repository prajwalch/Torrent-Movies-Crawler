import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Detail.css';

function SingleMovie({ match }) {
    const [movieName, setMovieName] = useState(match.params.movieName);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const getMovieFromServer = async () => {
            const response = await axios.get(`/movies/${movieName}?detailof=${movieName}`);
            const data = response.data;
            setMovieDetails(data);
            setIsLoading(false)
        }
        getMovieFromServer();
        return () => {
            setMovieName(null)
        }
    // eslint-disable-next-line        
    }, [] ) 

    return (
        <div className="movies-container">
            {isLoading ? 'Loading...' : (
               movieDetails.map(detail => (
                   <div className="movie-detail-wrapper" key={detail.movieTittle}>
                       <div className="movie-thumbnail-wrapper">
                            <img src={detail.movieThumbnail} alt={detail.movieTittle} className="movie-thumbnail" />
                       </div>
                       <div className="movie-infos">
                            <h2 className="movie-tittle">{detail.movieTittle}</h2>
                            <p className="movie-year dim-text">{detail.movieYear}</p>
                            <p className="movie-category dim-text">{detail.movieCategory}</p>
                       </div>
                       <div className="avaliable-quality">
                           <h3>Avaliable in:</h3>
                           <br />
                           <ul>
                               {detail.avaliableQuality.map(quality => (
                                   <li className="quality dim-text" >{quality.quality}@{quality.qualityType}</li>
                               ))}
                           </ul>
                       </div>
                       <div className="download-links">
                           <h3>Download links:</h3>
                           <br />
                           {detail.movieSubtitle ? <a href={detail.movieSubtitle} className="subtitle-link">Download subtitle</a> : false}
                           <br />
                           {detail.avaliableQuality.map(quality => (
                                <fieldset key={quality.qualitySize}>
                                    <legend>{quality.quality}</legend>
                                    <div className="file-info">
                                        <p className="picture-type dim-text">Print: {quality.qualityType}</p>
                                        <p className="file-size dim-text">Size: {quality.qualitySize}</p>
                                    </div>
                                    <div className="download-buttons">
                                        <span className="button"><a href={quality.downloadLink} className="torrent-file">Download</a></span> 
                                        <span className="button"><a href={quality.magnetLink} className="magnet-link">Magnet</a></span>
                                    </div>
                                </fieldset>
                               ))}
                       </div>
                   </div>
               )) 
            )}
        </div>
    )
}

export default SingleMovie
