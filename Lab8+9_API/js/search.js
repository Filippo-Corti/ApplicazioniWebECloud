/* ------------------------------- GLOBALS ------------------------------- */

var defaultURL = "https://image.tmdb.org/t/p/w220_and_h330_face";
var defaultURL_Backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
var defaultURL_Actors = "https://www.themoviedb.org/t/p/w276_and_h350_face";
var defaultHREF = "pages/scheda_film.html?id=";

/* ------------------------------- EDIT PAGE WITH FETCHED DATA ------------------------------- */
function addPopularsToPage(populars) {
  let cards = document.querySelector(".cards");
  cards.innerHTML = "";
  for (let i = 0; i < populars.results.length; i++) {
    var card = document.querySelector(".card");
    var clone = card.cloneNode(true);
    clone.classList.remove("d-none")
    var movie = populars.results[i];
    clone.querySelector(".card-title").innerHTML = movie.title;
    clone.querySelector(".card-text").innerHTML = movie.overview;
    clone.querySelector(".card-img-top").src = defaultURL + movie.poster_path;
    clone.querySelector(".card-text>small").innerHTML = "Data di Rilascio: " + movie.release_date;
    clone.querySelector(".card-footer>a").href = defaultHREF + movie.id;
    i++;
    cards.appendChild(clone);
  }
}


/* ------------------------------- PAGINATION ------------------------------- */

let currentPage = 1;
fetchPopularsPage(currentPage, (x) => addPopularsToPage(x));
updatePaginationGUI();

function fetchPopulars(el) {
  fetchPopularsPage(el.innerHTML, (x) => addPopularsToPage(x))
  currentPage = parseInt(el.innerHTML);
  updatePaginationGUI();
}

function previousPage() {
  if (currentPage == 1)
    return;
  currentPage--;
  fetchPopularsPage(currentPage, (x) => addPopularsToPage(x))
  updatePaginationGUI();
}

function nextPage() {
  currentPage++;
  fetchPopularsPage(currentPage, (x) => addPopularsToPage(x))
  updatePaginationGUI();
}

function updatePaginationGUI() {
  let pageItems = document.querySelectorAll(".page-item.active");
  pageItems.forEach(pageItem => {
    pageItem.classList.remove("active");
  });
  if (currentPage == 1) {
    document.querySelectorAll(".page-item")[1].classList.add("active");
  }
  else {
    document.querySelectorAll(".page-item")[2].classList.add("active");
    document.querySelector(".page-item.previous-page>a").innerHTML = currentPage - 1;
    document.querySelector(".page-item.current-page>a").innerHTML = currentPage;
    document.querySelector(".page-item.next-page>a").innerHTML = currentPage + 1;
  }
}

/* ------------------------------- VOTE MODAL ------------------------------- */


function vote() {
  let voto = document.querySelector("#voto").value;
  fetchForRating(getIdByURL(), voto, (x) => notifyVoteReceived(x));
}

function notifyVoteReceived(response) {
    document.querySelector(".vote-alert").classList.remove("d-none");
    document.querySelector(".close-modal-btn").click();
}