/* ------------------------------- FETCH ------------------------------- */

var defaultURL = "https://image.tmdb.org/t/p/w220_and_h330_face";
var defaultURL_Backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
var defaultURL_Actors = "https://www.themoviedb.org/t/p/w276_and_h350_face";
var defaultHREF = "pages/scheda_film.html?id=";

let sessionId = null;

const optionsGET = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer YOUR_API_KEY'
    }
};

const POSToptions = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer YOUR_API_KEY'
    },
};

function getIdByURL() {
    var parametri = new URLSearchParams(window.location.search);
    id = parametri.get("id")
    return id;
}

function fetchMovieData(id, elaborateData) {
    /* Fetch Main data */

    fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-EN', optionsGET)
        .then(response => response.json())
        .then(response => elaborateData(response))
        .catch(err => console.error(err));
}

function fetchMovieCasting(id, elaborateData) {
    /* Fetch Actors */
    fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?language=en-EN', optionsGET)
        .then(response => response.json())
        .then(response => elaborateData(response))
        .catch(err => console.error(err));
}

function fetchPopularsPage(page, elaborateData) {
    let lingua;
    if (document.querySelector("#lingua") != null)
        lingua = document.querySelector("#lingua").value
    fetch('https://api.themoviedb.org/3/movie/popular?language=' + lingua + '&page=' + page, optionsGET)
        .then(response => response.json())
        .then(response => elaborateData(response))
        .catch(err => console.error(err));
}

function fetchByKeyword(keyword, elaborateData) {
    fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=' + keyword, optionsGET)
        .then(response => response.json())
        .then(response => elaborateData(response))
        .catch(err => console.error(err));
}

function fetchForRating(id, rating, elaborateData) {
    let payload = {
      value: rating,
    }
    let options = POSToptions;
    options.body = JSON.stringify(payload);

    fetch('https://api.themoviedb.org/3/movie/' + id + '/rating', POSToptions)
        .then(response => response.json())
        .then(response => elaborateData(response))
        .catch(err => console.error(err));
}

/* ------------------------------- GET GUEST SESSION ID ------------------------------- */
async function getSessionId() {
    if(sessionId == null) {
        await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', optionsGET)
        .then(response => response.json())
        .then(response => sessionId = response.guest_session_id)
        .catch(err => console.error(err));
    }
    return sessionId;
}
