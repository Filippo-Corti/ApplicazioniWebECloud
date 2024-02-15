/* --------------------------------------------------------------- 
Api.js contains the scripts that interact with the API https://www.themealdb.com/api.php
and some utility functions related to them
It is imported in every .html page.
--------------------------------------------------------------- */

/* -------------- API Fetch Operations -------------- */

const optionsGET = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    },
    cache: "no-cache", //Fixed some issues with Edge
}

//Returns the Recipes (with Full Details) whose name matches the keyword
async function searchByName(keyword) {
    let meals;
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + keyword, optionsGET)
        .then(response => response.json())
        .then((results) => meals = results.meals)
        .catch(err => console.error(err));
    if (!meals)
        return [];
    return meals;
}

//Returns the Recipes (with Full Details) whose name starts with the letter first_letter
async function searchByFirstLetter(first_letter) {
    if (first_letter.length != 1)
        return null;
    let meals;
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=" + first_letter, optionsGET)
        .then(response => response.json())
        .then((results) => meals = results.meals)
        .catch(err => console.error(err));
    if (!meals)
        return [];
    return meals;
}

//Returns the full details of the recipe having idMeal = id
async function getDetailsById(id) {
    let meal;
    await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id, optionsGET)
        .then(response => response.json())
        .then((results) => {
            if (results.meals?.length > 0)
                meal = results.meals[0]
        })
        .catch(err => console.error(err));
    return meal;
}

//Returns N random Recipes (with Full Details), they are all guaranteed to be different
async function getRandomRecipes(n) {
    let meals = new Map()
    while (meals.size < n) {
        await fetch("https://www.themealdb.com/api/json/v1/1/random.php", optionsGET)
            .then(response => response.json())
            .then((meal) => meals.set(meal.meals[0].idMeal, meal.meals[0]))
            .catch(err => console.error(err));
    }
    return meals.values();
}

//Returns a list of all the Categories, with some details
async function getAllCategories() {
    let categories;
    await fetch("https://www.themealdb.com/api/json/v1/1/categories.php", optionsGET)
        .then(response => response.json())
        .then((results) => categories = results.categories)
        .catch(err => console.error(err));
    return categories;
}

//Returns a list of all the Areas
async function getAllAreas() {
    let areas;
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list", optionsGET)
        .then(response => response.json())
        .then((results) => areas = results.meals)
        .catch(err => console.error(err));
    return areas;
}

//Returns a list of all the Ingredients, with some details 
async function getAllIngredients() {
    let ingredients;
    await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list", optionsGET)
        .then(response => response.json())
        .then((results) => ingredients = results.meals)
        .catch(err => console.error(err));
    return ingredients;
}

//Returns the Recipes (only minimal Data) that contain ingredient in their ingredients list
async function searchByIngredient(ingredient) {
    let meals;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient, optionsGET)
        .then(response => response.json())
        .then((results) => meals = results.meals)
        .catch(err => console.error(err));
    if (!meals)
        return [];
    return meals;
}

//Returns the Recipes (only minimal Data) of the specified category
async function searchByCategory(category) {
    let meals;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category, optionsGET)
        .then(response => response.json())
        .then((results) => meals = results.meals)
        .catch(err => console.error(err));
    if (!meals)
        return [];
    return meals;
}

//Returns the Recipes (only minimal Data) of the specified area
async function searchByArea(area) {
    let meals;
    await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area, optionsGET)
        .then(response => response.json())
        .then((results) => meals = results.meals)
        .catch(err => console.error(err));
    if (!meals)
        return [];
    return meals;
}

/* -------------- General API Utility -------------- */

//Returns the list of Ingredients, with Measures, for meal
function extractIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal["strIngredient" + i];
        let measure = meal["strMeasure" + i];
        if (ingredient && measure) {
            ingredients.push(
                {
                    name: ingredient,
                    measure: measure
                }
            );
        }
    }
    return ingredients;
}

//Finds the area of each recipe in recipes and updates the list with a area field (currently not in use due to too many requests error)
async function addAreaToRecipes(recipes) {
    let results = [];
    for (let recipe of recipes) {
        let full_details = await getDetailsById((recipe.idMeal) ? recipe.idMeal : recipe.id);
        recipe.area = full_details.strArea;
        results.push(recipe);
    }
    return results;
}


