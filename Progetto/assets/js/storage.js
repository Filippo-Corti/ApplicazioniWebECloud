/* --------------------------------------------------------------- 
Storage.js contains scripts used to deal with the Session and 
Local Storage of the Browser.
It is imported in every .html page.
--------------------------------------------------------------- */

/* -------------- General Utility -------------- */

//Empty the Local and Session Storage
function clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
}

//Get 'name' from Local or Session Storage
function getFromStorage(name) {
    let results = localStorage.getItem(name);
    if (results) {
        try {
            return JSON.parse(results);
        } catch (e) {
            return results;
        }
    }
    results = sessionStorage.getItem(name);
    if (results)
        try {
            return JSON.parse(results);
        } catch (e) {
            return results;
        }
    return null;
}

//Set favourite font
function setFavouriteFont(font) {
    localStorage.setItem("favourite_font", font);
}

/* -------------- Load API Data into Storage  -------------- */

//Load Categories from the API and put them into the Local Storage, if they aren't already there
async function loadCategoriesIntoStorage() {
    let categories_in_storage = getFromStorage("categories");

    if (!categories_in_storage) {
        //Categories aren't already in storage
        let results = await getAllCategories();
        let categories = [];
        for (let category of results) {
            categories.push({
                name: category.strCategory,
                description: category.strCategoryDescription,
            });
        }
        localStorage.setItem("categories", JSON.stringify(categories));
    }
}

//Load Ares from the API and put them into the Local Storage, if they aren't already there
async function loadAreasIntoStorage() {
    let areas_in_storage = getFromStorage("areas");

    if (!areas_in_storage) {
        //Ares aren't already in storage
        let results = await getAllAreas();
        let areas = [];
        for (let area of results) {
            areas.push({
                name: area.strArea,
            });
        }

        localStorage.setItem("areas", JSON.stringify(areas));
    }
}

//Load Ingredients from the API and put them into the Local Storage, if they aren't already there
async function loadIngredientsIntoStorage() {
    let ingredients_in_storage = getFromStorage("ingredients");

    if (!ingredients_in_storage) {
        //Ingredients aren't already in storage
        let results = await getAllIngredients();
        let ingredients = [];
        for (let ingredient of results) {
            ingredients.push({
                name: ingredient.strIngredient,
                description: ingredient.strDescription,
            });
        }
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    } 
}

//Load N Random recipes from the API and put them into the Local Storage. It overrides any previous recipes only if the previous recipes are over 5 seconds old. It puts only some essential detail of every recipe
async function loadRandomRecipesIntoStorage(n) {
    let now = new Date().getTime();
    let recipes_in_storage = getFromStorage("random_recipes");
    if (!recipes_in_storage || now - recipes_in_storage.timestamp > 5000) { //5000ms = 5s
        let results = await getRandomRecipes(n);
        let random_recipes = {
            timestamp: now,
            recipes: [],
        };
        for (let recipe of results) {
            random_recipes.recipes.push({
                id: recipe.idMeal,
                name: recipe.strMeal,
                image: recipe.strMealThumb,
                area: recipe.strArea,
            });
        }
        localStorage.setItem("random_recipes", JSON.stringify(random_recipes));
    }
}

//Load search results into the Session Storage, based on the first typed letter of the keyword
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
    sessionStorage.setItem("search_results", JSON.stringify(recipes));
}

//Load recipes based on logged user's interests into the Session Storage, if they aren't already there or if force_reload = true
async function loadSuggestedRecipesIntoStorage(force_reload) {
    let suggested_recipes = getFromStorage("suggested_recipes");
    if (!suggested_recipes || force_reload) {
        let interests = getLoggedUserData().interests;
        let recipes = [];
        for (let area of interests.areas) {
            recipes.push(... await searchByArea(area));
        }
        for (let category of interests.categories) {
            recipes.push(... await searchByCategory(category));
        }
        for (let ingredient of interests.ingredients) {
            recipes.push(... await searchByIngredient(ingredient));
        }
        //recipes = await addAreaToRecipes(recipes);
        let corrected_recipes = [];
        for (let recipe of recipes) {
            corrected_recipes.push({
                id: recipe.idMeal,
                name: recipe.strMeal,
                image: recipe.strMealThumb,
                area: recipe.area,
            });
        }
        //Avoid duplicates
        let jsonObject = corrected_recipes.map(JSON.stringify);
        let uniqueSet = new Set(jsonObject);
        corrected_recipes = Array.from(uniqueSet).map(JSON.parse);
        sessionStorage.setItem("suggested_recipes", JSON.stringify(corrected_recipes));
    } 
}

/* -------------- Users Management  -------------- */

//Check whether the email is already in use
function isEmailTaken(email) {
    let users = getFromStorage("users");
    if (users) {
        return users.filter((user) => user.email === email).length !== 0;
    }
    return false;
}

function registerNewUserIntoStorage(user) {
    let users = getFromStorage("users");
    if (!users) {
        users = [];
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

//Check whether the credentials correspond to an existing user
function checkCredentials(email, password) {
    let users = getFromStorage("users");
    if (users) {
        return users.filter((user) => user.email === email && user.password === password).length !== 0;
    }
    return false;
}

//Set email to the currently logged user
function loginUser(email) {
    sessionStorage.setItem("current_user", email);
    loadSuggestedRecipesIntoStorage();
    location.reload();
}

//Return true if a user is currently logged
function isAnyUserLoggedIn() {
    return getFromStorage("current_user");
}

//Return user data of the user whose email is email
function getUserByEmail(email) {
    let users = getFromStorage("users");
    if (users) {
        return users.filter((user) => user.email === email)[0];
    }
    return null;
}

//Return user data of the logged user
function getLoggedUserData() {
    let user = getFromStorage("current_user");
    if (user) {
        return getUserByEmail(user);
    }
    return null;
}

//Update user data in Storage
function updateUser(new_user_data) {
    if (!new_user_data.username) {
        new_user_data.username = new_user_data.email.substring(0, new_user_data.email.indexOf('@'));
    }
    let users = getFromStorage("users");
    if (users) {
        for (let user of users) {
            if (user.email == new_user_data.email)
                users[users.indexOf(user)] = new_user_data;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
}

//Log currently logged user out
function logout() {
    sessionStorage.removeItem("current_user");
    localStorage.removeItem("suggested_recipes");
    location.reload();
}

//Delete currently logged user's account
function deleteLoggedAccount() {
    let user = getLoggedUserData();
    let users = getFromStorage("users");
    if (users) {
        users = users.filter((u) => u.email != user.email);
    }
    localStorage.setItem("users", JSON.stringify(users));

    logout();
}

/* -------------- Cookbooks Management  -------------- */

//Add recipe to currently logged user's cookbook or updates it if it's already in it
function addToCookbook(recipe) {
    let user = getLoggedUserData();
    if (user.cookbook.filter((r) => r.id == recipe.id).length == 0) {
        //Recipe is not currently in the cookbook
        user.cookbook.push(recipe);
    } else {
        //Recipe is currently in the cookbook - we can update the note
        for (let r of user.cookbook) {
            if (r.id == recipe.id)
                user.cookbook[user.cookbook.indexOf(r)] = recipe;
        }
    }
    updateUser(user);
}

//Remove recipe from currently logged user's cookbook 
function removeFromCookbook(id) {
    let user = getLoggedUserData();
    user.cookbook = user.cookbook.filter((r) => r.id != id);
    updateUser(user);
}

//Return true if the recipe with id = id is in the currently logged user's cookbook
function isInCookbook(id) {
    let user = getLoggedUserData();
    if (user)
        return user.cookbook.filter((r) => r.id == id).length != 0;
    return false;
}

/* -------------- Reviews Management  -------------- */

//Load new review into the Local Storage
function addReviewToStorage(review) {
    let reviews = getFromStorage("reviews");
    if (!reviews)
        reviews = {};
    if (!reviews[review.recipe_id])
        reviews[review.recipe_id] = [];

    reviews[review.recipe_id].push(review);

    localStorage.setItem("reviews", JSON.stringify(reviews));
}

//Remove the review with the specified data from the Local Storage
function removeReviewFromStorage(id, email, timestamp) {
    let reviews = getFromStorage("reviews");
    reviews[id] = reviews[id].filter((review) => review.email != email && review.timestamp != timestamp);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

//Return average taste score, average difficulty score and number of reviews of the identified recipe
function getRecipeReviewStats(id) {
    let reviews = getFromStorage("reviews");
    if (reviews) {
        let related_reviews = reviews[id];
        if (related_reviews && related_reviews.length > 0) {
            return {
                taste: (related_reviews.map((review) => parseInt(review.taste)).reduce((a, b) => a + b, 0) / related_reviews.length).toFixed(1),
                difficulty: (related_reviews.map((review) => parseInt(review.difficulty)).reduce((a, b) => a + b, 0) / related_reviews.length).toFixed(1),
                reviews: related_reviews.length,
            }
        }
    } else {
        localStorage.setItem("reviews", JSON.stringify({}));
    }
    return {
        taste: '-',
        difficulty: '-',
        reviews: 0,
    }
}