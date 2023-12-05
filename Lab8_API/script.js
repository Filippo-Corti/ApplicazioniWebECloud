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

function fetchById() {
    var parametri = new URLSearchParams(window.location.search);
    id = parametri.get("id")
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'your_api_key'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US', options)
        .then(response => response.json())
        .then(response => addDetailsToPage(response))
        .catch(err => alert("Movie doesn't exist"));


      const options2 = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:  'your_api_key'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?language=en-US', options2)
        .then(response => response.json())
        .then(response => addCastToPage(response))
        .catch(err => console.error(err));

}


function addDetailsToPage(movie) {
        /* General Movies Details */
        document.querySelector("#movie-title>span:first-of-type").innerHTML= movie.title;
        document.querySelector("#movie-title>span:last-of-type").innerHTML = "(" + movie.release_date.substring(0, 4) + ")";
        document.querySelector("#movie-overview").innerHTML = movie.overview;
        document.querySelector("#movie-banner").src = defaultURL + movie.poster_path;
        document.querySelector("#movie-backdrop").style.backgroundImage = "url(" + defaultURL_Backdrop + movie.backdrop_path + ")";
        document.querySelector("#movie-generi").innerHTML = getStringaGeneri(movie.genres);
        document.querySelector("#movie-tagline").innerHTML = movie.tagline;
        document.querySelector("#movie-release-date").innerHTML = formatDate(movie.release_date);
        document.querySelector("#movie-runtime").innerHTML = formatRuntime(movie.runtime);
}

function addCastToPage(details) {
     /* Actors */
     var template = document.querySelector("#actor-card");
     var scroller = document.querySelector(".card-scroller");
     for (actor of details.cast) {
         var clone = template.cloneNode(true);
         clone.classList.remove("d-none");
         clone.querySelector("#actor-card>img").src = defaultURL_Actors + actor.profile_path;
         clone.querySelector(".card-title").innerHTML = actor.name;
         clone.querySelector(".card-text").innerHTML = actor.character;
         scroller.appendChild(clone);
     }

}