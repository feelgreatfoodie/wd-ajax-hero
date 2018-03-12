(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  // ADD YOUR CODE HERE
  $('#search').attr('required')
  let x = $("#search").prop('required')
  console.log(x)

  let apiBaseSearchURL = "https://omdb-api.now.sh/?s="
  let movieSearch = $("#search")

  $(".btn-large").click((e) => {

    e.preventDefault()
    movies.splice(0)

    movieSearch = $("#search").val()
    let requestURL = apiBaseSearchURL.concat(movieSearch)
    goToMovieSearch(requestURL)
  })
// get movies from API
  const goToMovieSearch = (requestURL) => {
    fetch(requestURL).then((response) => {
      return response.json()
    }).then((data) => {
      makeMovieObj(data)
    }).catch(() => {
      console.log("Chuck Norris was here")
    })
  }
// change API data into a movie object
  const makeMovieObj = (data) => {
      data.Search.map((i) => {
        let movie = {
          'id': i.imdbID,
          'poster': i.Poster,
          'title': i.Title,
          'year': i.Year
        }
        movies.push(movie)
      })
    renderMovies()
  }
})();
