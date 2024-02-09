/* --------------------------------------------------------------- 
Storage.js contains scripts used to deal with the Session and 
Local Storage of the Browser.
It is imported in every .html page.
--------------------------------------------------------------- */

//Empty the Local and Session Storage
function clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
}

//Get 'name' from Local or Session Storage
function getFromStorage(name) {
    let results = localStorage.getItem(name);
    if (results)
        return JSON.parse(results);
    results = sessionStorage.getItem(name);
    if (results)
        return JSON.parse(results);
    return null;
}

//Load Categories from the API and put them into the Local Storage, if they aren't already there
async function loadCategoriesIntoStorage() {
    let results = await getAllCategories();
    let categories = [];
    for (let category of results) {
        categories.push({
            name: category.strCategory,
            description: category.strCategoryDescription,
        });
    }

    let categories_in_storage = localStorage.getItem("categories");

    if (!categories_in_storage) {
        //Categories aren't already in storage
        localStorage.setItem("categories", JSON.stringify(categories));
    }
}

//Load Ares from the API and put them into the Local Storage, if they aren't already there
async function loadAreasIntoStorage() {
    let results = await getAllAreas();
    let areas = [];
    for (let area of results) {
        areas.push({
            name: area.strArea,
        });
    }

    let areas_in_storage = localStorage.getItem("areas");

    if (!areas_in_storage) {
        //Ares aren't already in storage
        localStorage.setItem("areas", JSON.stringify(areas));
    }
}

//Load Ingredients from the API and put them into the Local Storage, if they aren't already there
async function loadIngredientsIntoStorage() {
    let results = await getAllIngredients();
    let ingredients = [];
    for (let ingredient of results) {
        ingredients.push({
            name: ingredient.strIngredient,
            description: ingredient.strDescription,
        });
    }

    let ingredients_in_storage = localStorage.getItem("ingredients");

    if (!ingredients_in_storage) {
        //Ingredients aren't already in storage
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }
}

//Load N Random recipes from the API and put them into the Local Storage. It overrides any previous recipes. It puts only some essential detail of every recipe
async function loadRandomRecipesIntoStorage(n) {
    let results = await getRandomRecipes(n);
    let random_recipes = [];
    for (let recipe of results) {
        random_recipes.push({
            id: recipe.idMeal,
            name: recipe.strMeal,
            image: recipe.strMealThumb,
            area: recipe.strArea,
        });
    }
    localStorage.setItem("random_recipes", JSON.stringify(random_recipes));
}

async function loadSearchResultsIntoStorage(first_Letter) {
    let results = await searchByFirstLetter(first_Letter);
    if (!results)
        return;
    let recipes = [];
    for (let recipe of results) {
        recipes.push({
            id: recipe.idMeal,
            name: recipe.strMeal,
            image: recipe.strMealThumb,
            area: recipe.strArea,
        });
    }
    localStorage.setItem("search_results", JSON.stringify(recipes));
}

