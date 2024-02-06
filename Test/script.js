async function ricettaRandom() {
    var ricetta;
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => response.json())
        .then((data) => {
            ricetta = data.meals[0];
        });

    return ricetta;
}

//Fonte: https://stackoverflow.com/questions/47419854/delay-between-promises-when-using-promise-all
async function ricetteRandom(n) {
    const delay = 10; //ms

    //Costruisci array di Promise
    var richieste = Array();
    for (var i = 0; i < n; i++) {
        richieste.push(new Promise(resolve => setTimeout(resolve, delay)).then(() =>
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(resp => resp.json())
                .then(res => res.meals[0]))
        );
    }

    var risultato;

    //Lancia tutte le Promise
    await Promise.all(richieste)
        .then((ricette) => {
            risultato = ricette;
        });

    return risultato;
}


async function ricetteSearch(keyword) {
    var ricette;
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + keyword)
        .then((response) => response.json())
        .then((data) => {
            ricette = data.meals;
        });

    return ricette;
}

async function getAree() {
    var aree;
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then((response) => response.json())
        .then((data) => {
            //Qui abbiamo ottenuto i dati come JSON
            aree = data.meals;
        });
    return aree;
}

async function getCategorie() {
    var categorie;
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((response) => response.json())
        .then((data) => {
            //Qui abbiamo ottenuto i dati come JSON
            categorie = data.meals;
        });
    return categorie;
}

async function getRicetteByCategoria(categoria) {
    var ricette;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categoria)
        .then((response) => response.json())
        .then((data) => {
            ricette = data.meals;
        });

    return {
        ricette: ricette,
        categoria: categoria 
    };
}

async function getRicetteByArea(area) {
    var ricette;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area)
        .then((response) => response.json())
        .then((data) => {
            ricette = data.meals;
        });

    return {
        ricette: ricette,
        area: area
    };
}

async function getDettagliRicetta(id) {
    var ricetta;

    await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then((response) => response.json())
        .then((data) => {
            ricetta = data.meals[0];
        });

    return ricetta;
}

function getUtenteByEmail(email) {
    var utenti_string = localStorage.getItem("utenti");
    var utenti = JSON.parse(utenti_string);

    for (var utente of utenti.utenti) {
        if (utente.email == email) {
            return utente;
        }
    }
    
    return null;
}

function updateUtente(utente) {
    var email = utente.email;

    var utenti_string = localStorage.getItem("utenti");
    var utenti = JSON.parse(utenti_string);

    for (var i = 0; i < utenti.utenti.length; i++) {
        var utente_corrente = utenti.utenti[i];
        if (utente_corrente.email == email) {
            //Utente trovato
            utenti.utenti[i] = utente;
        }
    }
    localStorage.setItem("utenti", JSON.stringify(utenti));
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function logout() {
    localStorage.removeItem("utente_loggato");
    location.reload();
}

