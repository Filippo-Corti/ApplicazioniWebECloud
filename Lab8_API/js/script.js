/* ------------------------------- FETCH ------------------------------- */

var defaultURL = "https://image.tmdb.org/t/p/w220_and_h330_face";
var defaultURL_Backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
var defaultURL_Actors = "https://www.themoviedb.org/t/p/w276_and_h350_face";

function fetchById() {
  var parametri = new URLSearchParams(window.location.search);
  id = parametri.get("id")
  fetchMovieData();
  fetchMovieCasting();
}

function fetchMovieData() {
  /* Fetch Main data */
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWM0Y2VlYzZmODFhYTk1NDcwZDkwYzBiZGYwNDkwNCIsInN1YiI6IjY1NjVmYTBlODlkOTdmMDBhYjE1ZGUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IMewZuyxwPpR-TG8XR27JvdsXwwSFiOB21ZsRGlH62k'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-EN', options)
    .then(response => response.json())
    .then(response => addDetailsToPage(response))
    .catch(err => alert("Error: " + err));
}

function fetchMovieCasting() {
  /* Fetch Actors */
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWM0Y2VlYzZmODFhYTk1NDcwZDkwYzBiZGYwNDkwNCIsInN1YiI6IjY1NjVmYTBlODlkOTdmMDBhYjE1ZGUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IMewZuyxwPpR-TG8XR27JvdsXwwSFiOB21ZsRGlH62k'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?language=en-EN', options)
    .then(response => response.json())
    .then(response => addCastToPage(response))
    .catch(err => alert("Error: " + err));
}

/* ------------------------------- EDIT PAGE WITH FETCHED DATA ------------------------------- */

function addDetailsToPage(movie) {
  /* General Movies Details */
  document.querySelector("head>title").innerHTML = "[My] " + movie.title;
  document.querySelector("#movie-title>span:first-of-type").innerHTML = movie.title;
  document.querySelector("#original-title").innerHTML = (movie.original_title) ? movie.original_title : movie.title;
  document.querySelector("#movie-title>span:last-of-type").innerHTML = "(" + movie.release_date.substring(0, 4) + ")";
  document.querySelector("#movie-overview").innerHTML = movie.overview;
  document.querySelector("#movie-banner").src = defaultURL + movie.poster_path;
  document.querySelector("#movie-backdrop").style.backgroundImage = "url(" + defaultURL_Backdrop + movie.backdrop_path + ")";
  document.querySelector("#movie-generi").innerHTML = getStringaGeneri(movie.genres);
  document.querySelector("#movie-tagline").innerHTML = movie.tagline;
  document.querySelector("#movie-release-date").innerHTML = formatDate(movie.release_date);
  document.querySelector("#movie-runtime").innerHTML = formatRuntime(movie.runtime);

  editUserScore(movie.vote_average);
  editPageColors();
}

function addCastToPage(details) {
  /* Actors */
  var template = document.querySelector("#actor-card");
  var scroller = document.querySelector(".card-scroller");
  for (actor of details.cast) {
    var clone = template.cloneNode(true);
    clone.classList.remove("d-none");
    if (actor.profile_path)
      clone.querySelector("#actor-card>img").src = defaultURL_Actors + actor.profile_path;
    clone.querySelector(".card-title").innerHTML = actor.name;
    clone.querySelector(".card-text").innerHTML = actor.character;
    scroller.appendChild(clone);
  }

  /* Crew */
  for (person of details.crew) {
    if (person.job == "Director") {
      document.querySelector("#movie-director").innerHTML = person.name;
    } else if (person.job == "Writer") {
      document.querySelector("#movie-writer").innerHTML = person.name;
    }
  } 

}

function editPageColors() {
  const colorThief = new ColorThief();
  const img = new Image();

  let imageURL = document.querySelector("#movie-banner").src;
  let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

  img.crossOrigin = 'Anonymous';
  img.src = googleProxyURL + encodeURIComponent(imageURL);

  img.addEventListener('load', function () {
    let RGBcolors = colorThief.getColor(img);
    editBannerShadow(RGBcolors);
    chooseTextColor(RGBcolors);
  });

}

function editBannerShadow(RGBcolors) {
  document.querySelector("#banner-shadow").style.backgroundImage =
  'linear-gradient(to right, rgba(' + RGBcolors[0] + ', ' + RGBcolors[1] + ', ' + RGBcolors[2] + ', 1) calc((50vw - 170px) - 340px),' +
  'rgba(' + RGBcolors[0] + ', ' + RGBcolors[1] + ', ' + RGBcolors[2] + ', 0.84) 50%, rgba(' + RGBcolors[0] + ', ' + RGBcolors[1] + ', ' + RGBcolors[2] + ', 0.84) 100%)';
}

function chooseTextColor(RGBcolors) {
  const luminance = 0.2126 * RGBcolors[0] + 0.7152 * RGBcolors[1] + 0.0722 * RGBcolors[2];
  const contrastRatio = (luminance + 0.05) / (0.05 + 1);
  console.log(contrastRatio)
  if (contrastRatio >= 100) {
    document.querySelector("#movie-backdrop").classList.add("text-dark")
    document.querySelector("#movie-backdrop").classList.remove("text-light")
  }
  else  {
    document.querySelector("#movie-backdrop").classList.add("text-light")
    document.querySelector("#movie-backdrop").classList.remove("text-dark")
  }
}

function editUserScore(vote) {
  document.querySelector("#user-score>p").innerHTML = parseInt(vote * 10) + '<sup class="fs-6">%</sup>'
  if (vote <= 5) {
    document.querySelector("#user-score").classList.add("border-danger")
  } else if (vote <= 7) {
    document.querySelector("#user-score").classList.add("border-warning")
  } else {
      document.querySelector("#user-score").classList.add("border-success")
  }
} 

/* ------------------------------- UTILITY ------------------------------- */
function getStringaGeneri(genres) {
  var s = "";
  for (genere of genres) {
    s += genere.name + ", ";
  }
  return s.substring(0, s.length - 2)
}

function formatDate(date) {
  //From yyyy-mm-dd to dd/mm/yyyy
  return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
}

function formatRuntime(time) {
  var s = "";
  if (time >= 60) {
    s += parseInt(time / 60) + "h ";
  }
  s += time % 60 + "m";
  return s;
}