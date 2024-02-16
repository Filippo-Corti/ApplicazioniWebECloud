/* --------------------------------------------------------------- 
Utils.js contains scripts used generally around the website, mainly
regarding elements creation and interaction.
It is imported in every .html page.
--------------------------------------------------------------- */

//Page Load
let logged_in = isAnyUserLoggedIn();
let fav_font = getFromStorage("favourite_font");
if (!fav_font) {
    fav_font = "fancy";
    setFavouriteFont(fav_font);
}
document.body.setAttribute("data-font", fav_font);
buildBackground();
loadPageBasedOnLogState();
initializeBootstrapComponentsAndEvents();

//Load Storage if empty
loadCategoriesIntoStorage();
loadAreasIntoStorage();
loadIngredientsIntoStorage();

/* -------------- General Utility -------------- */

// Check Logged In / Logged Out
function loadPageBasedOnLogState() {
    let logged_in_elements = document.querySelectorAll(".logged-in-only");
    let logged_out_elements = document.querySelectorAll(".logged-out-only");
    for (let el of logged_in_elements) {
        if (logged_in)
            el.classList.remove("logged-in-only"); //Show
    }
    for (let el of logged_out_elements) {
        if (logged_in)
            el.style.display = "none"; //Hide
    }
    if (logged_in) {
        let user_data = getLoggedUserData();
        document.querySelector(".username").textContent = user_data.username;
        document.querySelectorAll(".profile-picture").forEach((el) => el.style.backgroundColor = user_data.color);
    }
}

// Toggle Password Visibility for Forms 
function toggleShowPassword() {
    let password_fields = document.querySelectorAll(".toggle-visibility");

    for (let password_field of password_fields) {
        if (password_field.type == "password")
            password_field.type = "text";
        else
            password_field.type = "password";
    }
}

// Position main Scrollers to the Center 
function centerScrollers() {
    let scrollers = document.querySelectorAll(".scroll-to-center");
    scrollers.forEach((scroller) => {
        let scroll_to = (scroller.scrollWidth - scroller.clientWidth) / 2;
        scroller.scroll({
            top: 0,
            left: scroll_to,
        });
    })
}

//Return the Param 'name' in the URL of the window
function getURLParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

//Shuffle array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5); //50% chance of being >0
}

//Switch fonts in the page
function switchFonts() {
    if (document.body.getAttribute("data-font") == "flat") {
        document.body.setAttribute("data-font", "fancy");
        setFavouriteFont("fancy");
    } else {
        document.body.setAttribute("data-font", "flat");
        setFavouriteFont("flat");
    }
}

//Get random int in the range [0, max)        
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/* -------------- Background Building -------------- */

// Build Background Grid & Initialize Stripe Events
function buildBackground() {
    buildBackgroundGrid();
    initializeStripe();
}

// Build Background Grid
function buildBackgroundGrid() {
    let grid_container = document.querySelector(".background-grid");
    let grid_col = document.querySelector(".background-grid-col");
    const COL_SIZE = 90; //px
    const COLS = document.body.clientWidth / COL_SIZE;
    let grid_row = document.querySelector(".background-grid-row");
    const ROW_SIZE = COL_SIZE;
    const ROWS = window.innerHeight / ROW_SIZE + 2;

    for (let i = 1; i < COLS; i++) {
        let new_col = grid_col.cloneNode(true);
        new_col.classList.remove("d-none");
        new_col.style.left = COL_SIZE * i - 50 + "px";
        grid_container.appendChild(new_col);
    }

    for (let i = 1; i < ROWS + 1; i++) {
        let new_row = grid_row.cloneNode(true);
        new_row.classList.remove("d-none");
        new_row.style.top = ROW_SIZE * i - 50 + "px";
        grid_container.appendChild(new_row);
    }
}

// Initialize Stripe Events
function initializeStripe() {
    let background_stripe = document.querySelector(".background-stripe");
    document.addEventListener("scroll", (event) => {
        let currentScrollPercentage = window.scrollY / (document.body.scrollHeight - window.screen.height);
        background_stripe.style.filter = "blur(" + 10000 * currentScrollPercentage + "px)";
    })
}

/* -------------- Bootstrap Elements -------------- */

// Initialize Modals, Tooltips and other Bootstrap components needed
function initializeBootstrapComponentsAndEvents() {
    initializeModalEvents();
    initializeTooltips();
}

// Initialize Custom Events for Modals - from https://getbootstrap.com/docs/5.3/components/modal/#varying-modal-content
function initializeModalEvents() {
    // Save Recipe Modal 
    const saveRecipeModal = document.getElementById('saveRecipeModal')
    if (saveRecipeModal) {
        saveRecipeModal.addEventListener('show.bs.modal', event => {

            //if not logged in event.preventDefault() + show del modal di Login
            if (!logged_in) {
                event.preventDefault();
                const loginModal = new bootstrap.Modal('#loginModal')
                loginModal.show();
            }

            // Button that triggered the modal
            const button = event.relatedTarget

            // Extract info from data-* attributes
            const recipe_name = button.getAttribute('data-bs-recipe')
            const recipe_href = button.parentNode.querySelector("a")?.href;
            let recipe_id;
            if (recipe_href) {
                recipe_id = recipe_href.substring(recipe_href.indexOf("id=") + 3);
            } else {
                recipe_id = getURLParam("id");
            }


            //if the recipe is in the cookbook just remove it 
            if (button.parentNode.getAttribute("data-favourite") == "true") {
                button.parentNode.setAttribute("data-favourite", "false");
                removeFromCookbook(recipe_id);
                event.preventDefault();
                return;
            }

            // Update the modal's content.
            const modalBodyLabel = saveRecipeModal.querySelector('.modal-recipe-label')
            const modalRecipeId = saveRecipeModal.querySelector('input#recipe_id')

            modalBodyLabel.textContent = recipe_name;
            modalRecipeId.value = recipe_id;
        })
    }

    // Delete Review Modal
    const deleteReviewModal = document.getElementById('deleteReviewModal')
    if (deleteReviewModal) {
        deleteReviewModal.addEventListener('show.bs.modal', event => {

            // Button that triggered the modal
            const button = event.relatedTarget

            // Extract info from data-bs-* attributes
            const recipe_name = button.getAttribute('data-bs-recipe')
            const timestamp = button.parentNode.querySelector("[data-template-value='timestamp']").getAttribute("data-timestamp")
            const recipe_id = button.parentNode.querySelector("[data-template-value='recipe_id']").getAttribute("data-recipe_id")

            // Update the modal's content.
            const modalBodyLabel = deleteReviewModal.querySelector('.modal-recipe-label')
            const deleteButton = deleteReviewModal.querySelector("button.delete-review")

            modalBodyLabel.textContent = recipe_name;
            deleteButton.setAttribute("data-author", getFromStorage("current_user"));
            deleteButton.setAttribute("data-timestamp", timestamp);
            deleteButton.setAttribute("data-id", recipe_id);
        })
    }
}

// Enable Bootstrap Tooltips - from https://getbootstrap.com/docs/5.3/components/tooltips/#enable-tooltips 
function initializeTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    for (let tooltipTrigger of tooltipTriggerList) {
        enableTooltip(tooltipTrigger);
    }
}

//Create Tooltip instance
function enableTooltip(tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
}

/* -------------- Dynamic Elements Creation -------------- */

//Get HTML of a Document Fragment 
function getElementHTML(element) {
    if (element)
        return element.querySelector("*").outerHTML;
    return "";
}

//Build a Dynamic Element based on a Template and some Data, then return it
function buildDynamicElement(templateId, data) {
    let template = document.querySelector("template#" + templateId);
    let new_element = template.content.cloneNode(true);

    let slots = new_element.querySelectorAll("[data-template-type]");

    //Fill in the slots
    for (let slot of slots) {
        let value = data[slot.getAttribute("data-template-value")];
        switch (slot.getAttribute("data-template-type")) {
            case "content":
                slot.textContent = value;
                break;
            case "attribute":
                slot.setAttribute(slot.getAttribute("data-template-attribute"), value);
                break;
            case "element":
                slot.innerHTML = value;
                break;
            case "value":
                slot.value = value;
                break;
            case "color":
                slot.style.backgroundColor = value;
                break;
        }
    }

    //Activate eventual tooltips
    var tooltipTriggerList = new_element.querySelectorAll('[data-bs-toggle="tooltip"]')
    for (let tooltipTrigger of tooltipTriggerList) {
        enableTooltip(tooltipTrigger);
    }

    return new_element;

}

/* -------------- Editable Inputs -------------- */

//Enable edit of the sibling with class "editable"
function enableEdit(clicked_element) {
    let editable_element = clicked_element.parentNode.querySelector(".editable");
    editable_element.disabled = false;
}

//Disable edit of the element, if new value is valid.
function disableEdit(editable_element) {
    //Check validity of field
    if (!editable_element.checkValidity()) {
        editable_element.classList.add("is-invalid");
        return false;
    }
    editable_element.classList.remove("is-invalid");
    editable_element.disabled = true;
    return true;
}

//Save edit in local storage and disable field 
function saveAndDisableEdit(clicked_element) {
    let editable_element = clicked_element.parentNode.querySelector(".editable");
    if (disableEdit(editable_element)) {
        //Valid Edit
        let field = editable_element.name;
        let user = getLoggedUserData();
        if (field == "note") {
            //Save Note 
            let recipe_href = clicked_element.parentNode.parentNode.parentNode.href;
            let recipe_id = recipe_href.substring(recipe_href.indexOf("id=") + 3);
            for (let saved_recipe of user.cookbook) {
                if (saved_recipe.id == recipe_id)
                    user.cookbook[user.cookbook.indexOf(saved_recipe)].note = editable_element.value;
            }
        } else {
            //Save a standard field
            user[field] = editable_element.value;
        }
        updateUser(user);
    }
}

//Checks Passwords, then calls disableEdit
function confirmPasswordEdit(clicked_element) {
    let password = clicked_element.parentNode.querySelector("input#password");
    let password_confirm = clicked_element.parentNode.querySelector("input#password_confirm");
    if (password.value !== password_confirm.value) {
        password_confirm.classList.remove("is-valid");
        password_confirm.classList.add("is-invalid");
        return false;
    }
    if (password.type == "text")
        toggleShowPassword();
    disableEdit(clicked_element.parentNode.querySelector(".editable"));
    return true;
}

//Save color edit in local storage and disable field + change color in the page
function saveColorAndDisableEdit(clicked_element) {
    saveAndDisableEdit(clicked_element);
    let editable_element = clicked_element.parentNode.querySelector(".editable");
    document.querySelectorAll('.profile-picture').forEach((el) => el.style.backgroundColor = editable_element.value);
}


//Save edit in local storage and Disable Password field 
function saveAndConfirmPasswordEdit(clicked_element) {
    let editable_element = clicked_element.parentNode.querySelector(".editable");
    if (confirmPasswordEdit(clicked_element)) {
        //Valid Edit
        let field = editable_element.name;
        let user = getLoggedUserData();
        user[field] = editable_element.value;
        updateUser(user);
    }
}

/* -------------- Search Bar & Search Results -------------- */

// Scroll when Search Bar is Selected
function scrollToHere(element) {
    let element_y = element.getBoundingClientRect().top + window.scrollY; //Relative to the document, not the viewport
    window.scroll({
        top: element_y - 100,
        left: 0,
        behaviour: "smooth",
    });
}

// Hide Results when anything is clicked
function hideSearchResults() {
    let search_results = document.querySelectorAll(".search-result");
    for (let result of search_results) {
        result.remove();
    }
}

//Elaborate Search Results for Search Bar and return them
async function getSearchResults(keyword, href_prefix) {
    if (keyword.length == 0) {
        return;
    }

    if (keyword.length == 1) {
        await loadSearchResultsIntoStorage(keyword);
    }

    keyword = keyword.toLowerCase();

    let matching_recipes = getFromStorage("search_results")?.filter((recipe) => isAMatch(recipe.name, keyword));
    let matching_categories = getFromStorage("categories").filter((category) => isAMatch(category.name, keyword));
    let matching_areas = getFromStorage("areas").filter((area) => isAMatch(area.name, keyword));
    let matching_ingredients = getFromStorage("ingredients").filter((ingredient) => isAMatch(ingredient.name, keyword));

    let to_show = []; //Max: 2 Categories, 2 Areas, 3 Recipes, 1 Ingredient
    let i = 0;

    for (let j = 0; i < 2 && j < matching_categories?.length; i++, j++) {
        to_show.push({
            type: "category",
            name: matching_categories[j].name + " (Category)",
            description: matching_categories[j].description,
            image: "https://www.themealdb.com/images/category/" + matching_categories[j].name + ".png",
            href: href_prefix + "search.html?category=" + matching_categories[j].name,
        });
    }

    for (let j = 0; i < 4 && j < matching_areas?.length; i++, j++) {
        to_show.push({
            type: "area",
            name: matching_areas[j].name + " (Area)",
            description: "",
            image: "",
            href: href_prefix + "search.html?area=" + matching_areas[j].name,
        });
    }

    for (let j = 0; i < 7 && j < matching_recipes?.length; i++, j++) {
        to_show.push({
            type: "recipe",
            name: matching_recipes[j].name,
            description: "",
            image: matching_recipes[j].image,
            href: href_prefix + "recipe.html?id=" + matching_recipes[j].id,
        });
    }

    for (let j = 0; i < 8 && j < matching_ingredients?.length; i++, j++) {
        to_show.push({
            type: "ingredient",
            name: matching_ingredients[j].name + " (Ingredient)",
            description: matching_ingredients[j].description,
            image: "https://www.themealdb.com/images/ingredients/" + matching_ingredients[j].name + "-Small.png",
            href: href_prefix + "search.html?ingredient=" + matching_ingredients[j].name,
        });
    }

    return to_show;

}

//Return true if keyword is a match word for name
function isAMatch(name, keyword) {
    return name.toLowerCase().startsWith(keyword.toLowerCase()) || name.toLowerCase().includes(" " + keyword.toLowerCase());
}

//Show results below the search bar
async function showSearchResults(keyword, href_prefix) {
    let results = await getSearchResults(keyword, href_prefix);
    if (!results)
        return;

    let container = document.querySelector("#search_results");


    container.innerHTML = ""; //Reset old results


    for (let result of results) {
        let result_element = buildDynamicElement("search-result", result);
        container.appendChild(result_element);
    }
}

/* -------------- Interests Tags -------------- */

//Show all the tags
function fillInTags() {
    let areas = getFromStorage("areas");
    let areas_container = document.querySelector("#preferences_area_container");
    for (let area of areas) {
        areas_container.appendChild(buildDynamicElement("preferences_area_tag", { name: area.name }));
    }

    let categories = getFromStorage("categories");
    let categories_container = document.querySelector("#preferences_category_container");
    for (let category of categories) {
        categories_container.appendChild(buildDynamicElement("preferences_category_tag", { name: category.name }));
    }


    let ingredients = getFromStorage("ingredients");
    let ingredients_container = document.querySelector("#preferences_ingredient_container");
    for (let ingredient of ingredients) {
        ingredients_container.appendChild(buildDynamicElement("preferences_ingredient_tag", { name: ingredient.name }));
    }
}

//Toggles the Tag and stores/removes it from the stored data of the correct user
function toggleStateAndUpdateStorage(tag) {
    //Graphic Changes
    toggleState(tag);
    //Storage Changes
    let user = getLoggedUserData();
    let tag_value = tag.querySelector("input").value;

    if (tag.querySelector("input[type='checkbox']").checked) {
        //Add Tag
        if (tag.classList.contains("tag-area")) {
            //Green Button = Area
            user.interests.areas.push(tag_value);
        } else if (tag.classList.contains("tag-category")) {
            //Blue Button = Category
            user.interests.categories.push(tag_value);
        } else if (tag.classList.contains("tag-ingredient")) {
            //Red Button = Ingredient
            user.interests.ingredients.push(tag_value);
        }
    } else {
        //Remove Tag
        if (tag.classList.contains("tag-area")) {
            //Green Button = Area
            user.interests.areas = user.interests.areas.filter((a) => a != tag_value);
        } else if (tag.classList.contains("tag-category")) {
            //Blue Button = Category
            user.interests.categories = user.interests.categories.filter((c) => c != tag_value);
        } else if (tag.classList.contains("tag-ingredient")) {
            //Red Button = Ingredient
            user.interests.ingredients = user.interests.ingredients.filter((i) => i != tag_value);
        }
    }

    updateUser(user);
    loadSuggestedRecipesIntoStorage(true);
}

/* -------------- Delete Recipe or Reviews -------------- */

//Remove recipe and its tooltip from the view (The deletion from the storage is executed in the save recipe modal code, because it's needed everywhere, whereas this is only needed in the profile page)
function removeRecipe(el) {
    el.parentElement.remove();
    bootstrap.Tooltip.getInstance(el.firstElementChild).dispose();
}

//Delete Review and remove it from the view
function deleteReview(target) {
    let email = target.getAttribute("data-author");
    let timestamp = target.getAttribute("data-timestamp");
    let id = target.getAttribute("data-id")
    removeReviewFromStorage(id, email, timestamp);

    let reviews = Array.from(document.querySelectorAll(".review-card")).filter((r) => {
        return r.querySelector("[data-email]").getAttribute("data-email") == email && r.querySelector("[data-timestamp]").getAttribute("data-timestamp") == timestamp
    });

    reviews[0].remove();
    bootstrap.Tooltip.getInstance(reviews[0].querySelector("[data-bs-toggle='tooltip']")).dispose();


}

/* -------------- Cards Sorting -------------- */

//Sort recipes by average difficulty, from easiest to hardest
function sortRecipesByDifficulty() {
    let container = document.querySelector("#saved_recipes_container");
    let recipes = container.querySelectorAll(".recipe-card");

    recipes.forEach((r) => r.remove());
    recipes = Array.from(recipes).sort((r1, r2) => {
        let v1 = r1.querySelector("[data-template-value='difficulty']").textContent;
        let v2 = r2.querySelector("[data-template-value='difficulty']").textContent;
        if (v1 == '-') v1 = 0;
        if (v2 == '-') v2 = 0;
        return v1 - v2;
    });

    recipes.forEach((r) => container.appendChild(r));
}

//Sort recipes by average taste, from tastiest to worst
function sortRecipesByTaste() {
    let container = document.querySelector("#saved_recipes_container");
    let recipes = container.querySelectorAll(".recipe-card");

    recipes.forEach((r) => r.remove());
    recipes = Array.from(recipes).sort((r1, r2) => {
        let v1 = r1.querySelector("[data-template-value='taste']").textContent;
        let v2 = r2.querySelector("[data-template-value='taste']").textContent;
        if (v1 == '-') v1 = 0;
        if (v2 == '-') v2 = 0;
        return v2 - v1;
    });

    recipes.forEach((r) => container.appendChild(r));
}

//Sort reviews by date, in the specified order
function sortReviewsByDate(latest_first) {
    let container = document.querySelector("#reviews_container");
    let reviews = container.querySelectorAll(".review-card");

    reviews.forEach((r) => r.remove());
    reviews = Array.from(reviews).sort((r1, r2) => {
        let v1 = r1.querySelector("[data-template-value='timestamp']").getAttribute("data-timestamp");
        let v2 = r2.querySelector("[data-template-value='timestamp']").getAttribute("data-timestamp");
        return (latest_first) ? v2 - v1 : v1 - v2;
    });

    console.log("Doing it");

    reviews.forEach((r) => container.appendChild(r));
}
