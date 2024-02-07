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

/* FUNZIONI PER TUTTE LE PAGINE */

function logout() {
    localStorage.removeItem("utente_loggato");
    location.reload();
}

//Categorie e Aree all'interno del Sottomenu
getCategorie().then((categorie) => {

    //Elaborazione delle Categorie Nel Menu

    var category_list = document.getElementById("category-list");
    var category_item_layout = category_list.firstElementChild;

    for (var i = 0; i < categorie.length; i++) {
        var new_category_item = category_item_layout.cloneNode(true);
        new_category_item.classList.remove("d-none");
        if (location.href.includes("pages")) {
            new_category_item.getElementsByClassName("category-item_link")[0].href = "risultati.html?category=" + categorie[i].strCategory;
        } else {
            new_category_item.getElementsByClassName("category-item_link")[0].href = "pages/risultati.html?category=" + categorie[i].strCategory;
        }
        new_category_item.getElementsByClassName("category-item_link")[0].innerHTML = categorie[i].strCategory;
        category_list.appendChild(new_category_item);
    }

});

getAree().then((aree) => {
    //Elaborazione delle Aree Nel Menu

    var area_list = document.getElementById("area-list");
    var area_item_layout = area_list.firstElementChild;


    for (var i = 0; i < aree.length; i++) {
        var new_area_item = area_item_layout.cloneNode(true);
        new_area_item.classList.remove("d-none");
        if (location.href.includes("pages")) {
            new_area_item.getElementsByClassName("area-item_link")[0].href = "risultati.html?area=" + aree[i].strArea;
        } else {
            new_area_item.getElementsByClassName("area-item_link")[0].href = "pages/risultati.html?area=" + aree[i].strArea;
        }
        new_area_item.getElementsByClassName("area-item_link")[0].innerHTML = aree[i].strArea;
        area_list.appendChild(new_area_item);
    }
});

