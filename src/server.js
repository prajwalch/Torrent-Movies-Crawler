const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const authorization = require('./middlewares/pathAuthorization');
const extractMovieCollection = require('./moviesCollection');
const extractMovieDetails = require('./movieDetails');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000/'
}));
app.use(authorization);

app.get('/movies', async (request, response) => {
  try {
    process.stdout.write('Loading.....' + '\n');
    const pageNumber = request.query.page;
    const hasMovies = await extractMovieCollection(pageNumber);
    if (!hasMovies) return console.log('Cannot get data due to connection error.');
    response.json(hasMovies);
  } catch (error) {
    console.log(error)
  }
});

app.get('/movies/:movieName', async (request, response) => {
  try {
    process.stdout.write('Loading.....' + '\n');
    const movieName = request.params.movieName;
    const hasMovieDetails = await extractMovieDetails(movieName);
    if (!hasMovieDetails) return console.log('Cannot get data due to connection error.');
    response.json(hasMovieDetails);
  } catch (error) {
    console.log(error)
  }
});

// async function extractMovieData(functionName, urlData) {
//   process.stdout.write('Loading.....' + '\n');
//   const hasData = await (urlData);
//   if (!hasData) return console.log('Cannot get data from server due to connection error.');
//   return hasData
// }

const port = process.env.PORT || 2058;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})