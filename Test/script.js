async function ricettaRandom() {
    var ricetta;
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => response.json())
        .then((data) => {
            ricetta = data.meals[0];
        });

    return ricetta;
}

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

//Fonte: https://stackoverflow.com/questions/47419854/delay-between-promises-when-using-promise-all


async function ricetteSearch(keyword) {
    var ricette;
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + keyword)
        .then((response) => response.json())
        .then((data) => {
            ricette = data.meals;
        });

    return ricette;
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