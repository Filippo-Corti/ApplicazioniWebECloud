const optionsGET = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

//Returns N random meals from the API
async function fetchRandomMeals(n) {
    let meals = new Set()
    while(meals.size < n) {
        await fetch("https://www.themealdb.com/api/json/v1/1/random.php", optionsGET)
        .then(response => response.json())
        .then((meal) => meals.add(meal.meals[0]))
        .catch(err => console.error(err));
    }
    return meals
}

//Returns the list of Ingredients, with Measures, for meal
function extractIngredients(meal) {
    for (let i = 1; i <= 20; i++) {
        if (ing)
    }
}
