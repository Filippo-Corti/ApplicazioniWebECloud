

async function ricettaRandom() {
    var ricetta;
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then ((response) => response.json())
    .then ((data) => {
        ricetta = data.meals[0];
    });

    return ricetta;
}
