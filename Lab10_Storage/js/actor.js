/* ------------------------------- GLOBALS ------------------------------- */

var defaultURL_Actor = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
var defaultURL_Movie = "https://www.themoviedb.org/t/p/w150_and_h225_bestv2";
var defaultHREF = "scheda_film.html?id=";

/* ------------------------------- EDIT PAGE WITH FETCHED DATA ------------------------------- */

function fetchById() {
  id = getIdByURL();
  fetchActorData(id, x => addDetailsToPage(x));
  fetchActorCredits(id, x => addCreditsToPage(x));
}

function addDetailsToPage(actor) {
  /* General Movies Details */
  document.querySelector("head>title").innerHTML = "[My] " + actor.name + " - The Movie DataBase";
  document.querySelector("#actor-name").innerHTML = actor.name;
  document.querySelector("#actor-biography").innerHTML = actor.biography;
  document.querySelector("#actor-picture").src = defaultURL_Actor + actor.profile_path;
  document.querySelector("#actor-picture").src = defaultURL_Actor + actor.profile_path;
  document.querySelector("#known-for-role").innerHTML = actor.known_for_department;
  document.querySelector("#gender").innerHTML = getGenderString(actor.gender);
  document.querySelector("#birthday").innerHTML = formatDate(actor.birthday);
  document.querySelector("#birthplace").innerHTML = actor.place_of_birth;

  /* Aliases */
  let alias = document.querySelector(".actor-alias");
  actor.also_known_as.forEach(aka => {
    let clone = alias.cloneNode(true);
    clone.innerHTML = aka;
    clone.classList.remove("d-none");
    alias.parentNode.appendChild(clone);
  });
}

function addCreditsToPage(credits) {
  /* Movie Credits */
  let movies = credits.cast;
  movies.sort((a, b) => b.popularity - a.popularity);
  let card = document.querySelector("#movie-card");
  movies.forEach(movie => {
    let clone = card.cloneNode(true);
    clone.querySelector("img").src = defaultURL_Movie + movie.poster_path;
    clone.querySelector("a").href = defaultHREF + movie.id;
    clone.querySelector(".card-text").innerHTML = movie.title;
    clone.classList.remove("d-none");
    card.parentNode.appendChild(clone);
  });
}


/* ------------------------------- UTILITY ------------------------------- */
function getGenderString(i) {
  switch (i) {
    case 0:
      return "Not Specified";
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
  }
}

function formatDate(date) {
  //From yyyy-mm-dd to dd/mm/yyyy
  return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
}