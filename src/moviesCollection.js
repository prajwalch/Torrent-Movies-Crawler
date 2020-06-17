const cheerio = require('cheerio');
const rp = require('request-promise');

async function urlSetup(pageNumber) {
  const DEFAULT_URL = 'https://yts.mx/browse-movies';
  const hasPageNumber = parseInt(pageNumber);
  let customUrl = null;
  if (hasPageNumber && hasPageNumber >= 2) customUrl = `${DEFAULT_URL}?page=${hasPageNumber}`;
  const html = await rp(customUrl || DEFAULT_URL);
  return html
}

async function spider(pageNumber) {
  try {
    const html = await urlSetup(pageNumber);
    const $ = cheerio.load(html);
    const movieWrapper = $('div.browse-movie-wrap');
  
    let movies = [];
    movieWrapper.each((index, element) => {
      const orginalMovieLink = $(element).find('a.browse-movie-link').attr('href');
      const movieThumbnail = $(element).find('img.img-responsive').attr('data-cfsrc');
      const orginalMovieTittle = $(element).find('a.browse-movie-title').text();
      const movieRating = $(element).find('h4.rating').text();
      const movieYear = $(element).find('div.browse-movie-year').text();
     
      const movieLink = orginalMovieLink.slice(22);
      const movieTittle = orginalMovieTittle.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
      
      const movie = {
        movieLink,
        movieThumbnail,
        movieTittle,
        movieRating,
        movieYear
      }
      movies.push(movie)  
    })
    // console.log(movies)
    return movies
  } catch (error) {
    console.log(`Connection error 😈🚧❌ \n ${error}`)
  }
}

module.exports = spider;