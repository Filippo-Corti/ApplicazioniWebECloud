/* ------------------------------- GLOBALS ------------------------------- */

var defaultURL = "https://image.tmdb.org/t/p/w220_and_h330_face";
var defaultURL_Backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
var defaultURL_Actors = "https://www.themoviedb.org/t/p/w276_and_h350_face";
var defaultHREF = "pages/scheda_film.html?id=";


/* ------------------------------- EDIT PAGE WITH FETCHED DATA ------------------------------- */

function fetchById() {
    id = getIdByURL();
    fetchActorData(id, x => addDetailsToPage(x));
    fetchActorCredits(id, x => addCreditsToPage(x));
}

function addDetailsToPage(actor) {
  /* General Movies Details */
  document.querySelector("#actor-name").innerHTML = actor.name;
  document.querySelector("#actor-biography").innerHTML = actor.biography;

}
