/* --------------------------------------------------------------- 
Utils.js contains scripts used generally around the website, mainly
regarding elements creation and interaction.
It is imported in every .html page.
--------------------------------------------------------------- */

let logged_in = isAnyUserLoggedIn();
const tooltipList = [];

buildBackground();
loadPageBasedOnLogState();
initializeBootstrapComponentsAndEvents();

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
        document.querySelector(".username").textContent = getLoggedUserData().username;
    }
}

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
    const ROWS = document.body.scrollHeight / ROW_SIZE + 1;

    let remove_lateral_cols = (document.body.clientWidth > 1420);

    for (let i = 1 + ((remove_lateral_cols) ? 1 : 0); i < COLS - ((remove_lateral_cols) ? 2 : 0); i++) {
        let new_col = grid_col.cloneNode(true);
        new_col.classList.remove("d-none");
        new_col.style.left = COL_SIZE * i + "px";
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

            // !!! if not logged in event.preventDefault() + show del modal di Login
            if (!logged_in) {
                event.preventDefault();
                const loginModal = new bootstrap.Modal('#loginModal')
                loginModal.show();
            }

            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const recipe_name = button.getAttribute('data-bs-recipe')
            // If necessary, you could initiate an Ajax request here
            // and then do the updating in a callback.

            // Update the modal's content.
            const modalBodyLabel = saveRecipeModal.querySelector('.modal-recipe-label')

            modalBodyLabel.textContent = recipe_name;
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
            // If necessary, you could initiate an Ajax request here
            // and then do the updating in a callback.

            // Update the modal's content.
            const modalBodyLabel = deleteReviewModal.querySelector('.modal-recipe-label')

            modalBodyLabel.textContent = recipe_name;
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

function enableTooltip(tooltipTriggerEl) {
    tooltipList.push(new bootstrap.Tooltip(tooltipTriggerEl));
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
        }
    }

    //Activate eventual tooltips
    var tooltipTriggerList = new_element.querySelectorAll('[data-bs-toggle="tooltip"]')
    for (let tooltipTrigger of tooltipTriggerList) {
        enableTooltip(tooltipTrigger);
    }

    return new_element;

}

//Enables edit of the sibling with class "editable"
function enableEdit(clicked_element) {

    let editable_element = clicked_element.parentNode.querySelector(".editable");

    editable_element.disabled = false;
}

//Disables edit of the sibling with class "editable"
function disableEdit(clicked_element) {
    let editable_element = clicked_element.parentNode.querySelector(".editable");
    //Check validity of field
    if (!editable_element.checkValidity()) {
        editable_element.classList.add("is-invalid");
        return;
    }
    editable_element.classList.remove("is-invalid");
    editable_element.disabled = true;
    //Save edit in local storage 
}

//Checks Passwords, then calls disableEdit
function confirmPasswordEdit(clicked_element) {
    let password = clicked_element.parentNode.querySelector("input#password");
    let password_confirm = clicked_element.parentNode.querySelector("input#password_confirm");
    if (password.value !== password_confirm.value) {
        password_confirm.classList.remove("is-valid");
        password_confirm.classList.add("is-invalid");
        return;
    }
    if (password.type == "text")
        toggleShowPassword();
    disableEdit(clicked_element);
}

// Hide Results when anything is clicked
function hideSearchResults() {
    let search_results = document.querySelectorAll(".search-result");
    for (let result of search_results) {
        result.remove();
    }
}

// Scroll when Search Bar is Selected
function scrollToHere(element) {
    let element_y = element.getBoundingClientRect().top + window.scrollY; //Relative to the document, not the viewport
    window.scroll({
        top: element_y - 100,
        left: 0,
        behaviour: "smooth",
    });
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

    for (let j = 0; i < 2 && j < matching_categories.length; i++, j++) {
        to_show.push({
            type: "category",
            name: matching_categories[j].name + " (Category)",
            description: matching_categories[j].description,
            image: "https://www.themealdb.com/images/category/" + matching_categories[j].name + ".png",
            href: href_prefix + "search.html?category=" + matching_categories[j].name,
        });
    }

    for (let j = 0; i < 4 && j < matching_areas.length; i++, j++) {
        to_show.push({
            type: "area",
            name: matching_areas[j].name + " (Area)",
            description: "",
            image: "",
            href: href_prefix + "search.html?area=" + matching_areas[j].name,
        });
    }

    for (let j = 0; i < 7 && j < matching_recipes.length; i++, j++) {
        to_show.push({
            type: "recipe",
            name: matching_recipes[j].name,
            description: "",
            image: matching_recipes[j].image,
            href: href_prefix + "recipe.html?id=" + matching_recipes[j].id,
        });
    }

    for (let j = 0; i < 8 && j < matching_ingredients.length; i++, j++) {
        to_show.push({
            type: "ingredient",
            name: matching_ingredients[j].name + " (Ingredient)",
            description: matching_ingredients[j].description,
            image: "https://www.themealdb.com/images/ingredients/" + matching_ingredients[j].name + ".png",
            href: href_prefix + "search.html?ingredient=" + matching_ingredients[j].name,
        });
    }

    return to_show;

}

//Return true if keyword is a match word for name
function isAMatch(name, keyword) {
    return name.toLowerCase().startsWith(keyword.toLowerCase()) || name.toLowerCase().includes(" " + keyword.toLowerCase());
}

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




