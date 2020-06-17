const cheerio = require('cheerio');
const rp = require('request-promise');

async function urlSetup(movieName) {
    const url = `https://yts.mx/movies/${movieName}`;
    const html = await rp(url);
    return html
  }

async function spider(movieName) {
    try {
        const html = await urlSetup(movieName);
        const $ = cheerio.load(html);
        
        const movieInfo = $('div#movie-info');

        const movieThumbnail = $('img.img-responsive').attr('data-cfsrc');
        const movieTittle = movieInfo.find('div.hidden-xs').children('h1').first().text();
        const movieYear = movieInfo.find('div.hidden-xs').children('h1').first().next().text();
        const movieCategory = movieInfo.find('div.hidden-xs').children('h2').last().text();
        const movieSubtitle = $('a.button').attr('href');

        const modelTorrent = $('div.modal-torrent');
        let avaliableQuality = [];

        modelTorrent.each((index, element) => {
            const quality = $(element).find('div.modal-quality').text();
            const qualityType = $(element).find('div.modal-quality').next('p.quality-size').text();
            const qualitySize = $(element).find('p').next('p.quality-size').text();
            const downloadLink = $(element).find('a.download-torrent').attr('href');
            const magnetLink = $(element).find('a.magnet-download').attr('href')

            avaliableQuality.push({quality, qualityType, qualitySize, downloadLink, magnetLink})
        });


        let movie = [];
        let movieDetails = {
            movieThumbnail,
            movieTittle,
            movieYear,
            movieCategory,
            movieSubtitle,
            avaliableQuality
        }
        movie.push(movieDetails);
        return movie;
    } catch (error) {
        console.log(`Connection error :( \n ${error}`)
    }
}

module.exports = spider