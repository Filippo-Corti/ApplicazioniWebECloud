/* --------------------------------------------------------------- 
Form-Control.js contains the scripts that deal with validation of the
Registration Form.
--------------------------------------------------------------- */

let form = document.querySelector("form");
let form_content = form?.querySelector(".form-content");
let form_part_1 = form_content?.firstElementChild;
let form_part_2 = form_content?.lastElementChild;
let form_step_count = document.querySelector("#form-step-count");
let first_line = document.querySelectorAll(".line")[0];
let second_line = document.querySelectorAll(".line")[1];
let continue_button = form?.querySelector("button[role='continue'");
let back_button = form?.querySelector("button[role='back'");
let taste_stars = document.querySelectorAll(".review-taste-input>img");
let taste_input = form.taste;
let difficulty_stars = document.querySelectorAll(".review-difficulty-input>img");
let difficulty_input = form.difficulty;

/* -------------- Registration Form -------------- */

//Validate Fields of Step 1 + Go to Step 2
function validateAndContinueForm() {
    let form_ok = true;
    let inputs = form_part_1.querySelectorAll("input");

    //Default Validation
    for (let input of inputs) {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
        if (!input.checkValidity()) {
            form_ok = false;
            input.classList.add("is-invalid");
        } else {
            input.classList.add("is-valid");
        }
    }

    //More specific Validations

    let email = form_content.querySelector("input#email");
    if (isEmailTaken(email.value)) {
        email.classList.remove("is-valid");
        email.classList.add("is-invalid");
        form_ok = false;
    }

    let password = form_content.querySelector("input#password");
    let password_confirm = form_content.querySelector("input#password_confirm");
    if (password.value !== password_confirm.value) {
        password_confirm.classList.remove("is-valid");
        password_confirm.classList.add("is-invalid");
        form_ok = false;
    }

    if (form_ok)
        continueForm();
}

//Continue to Step 2
function continueForm() {
    form_content.style.transform = "translateX(-100%)";
    form_step_count.innerHTML = "Step 2 of 2";
    first_line.classList.remove("bg-primary");
    second_line.classList.add("bg-primary");
    fillInTags();
}

//Go back to Step 1
function goBack() {
    form_content.style.transform = "translateX(0%)";
    form_step_count.innerHTML = "Step 1 of 2";
    second_line.classList.remove("bg-primary");
    first_line.classList.add("bg-primary");
}

//Register new user into storage and automatically login
function registerNewUser(form) {
    let form_data = new FormData(form);

    let new_user = {
        email: form_data.get("email"),
        username: (form_data.get("username")) ? form_data.get("username") : form_data.get("email").substring(0, form_data.get("email").indexOf('@')),
        password: form_data.get("password"),
        interests: {
            areas: form_data.getAll("preferences_area"),
            categories: form_data.getAll("preferences_category"),
            ingredients: form_data.getAll("preferences_ingredient"),
        },
        color: form_data.get("color"),
        cookbook: [],
    }

    registerNewUserIntoStorage(new_user);
    loginUser(new_user.email);
    return true;
}

/* -------------- Interests Tags -------------- */

//Tag Selection - Toggle Tag
function toggleState(tag) {
    let checkbox = tag.querySelector("input[type='checkbox']");
    let img = tag.querySelector("img")
    if (tag.classList.contains("tag-area")) {
        //Green Button
        tag.classList.toggle("btn-outline-success");
        tag.classList.toggle("btn-success");
    } else if (tag.classList.contains("tag-category")) {
        //Blue Button
        tag.classList.toggle("btn-outline-info");
        tag.classList.toggle("btn-info");
    } else if (tag.classList.contains("tag-ingredient")) {
        //Red Button
        tag.classList.toggle("btn-outline-danger");
        tag.classList.toggle("btn-danger");
    }
    img.classList.toggle("d-none");
    checkbox.checked = !checkbox.checked;

}

//Tag Selection - Show Searched Tags 
function searchTags(keyword) {
    keyword = keyword.toLowerCase();
    let tags = document.querySelectorAll(".tag");
    for (let tag of tags) {
        let value = tag.firstElementChild.value.toLowerCase();
        if (!value.startsWith(keyword)) {
            tag.classList.add("d-none");
        } else {
            tag.classList.remove("d-none");
        }
    }
}

/* -------------- Review Form -------------- */

let lock_taste_vote = false; //Has user selected a vote yet
let lock_difficulty_vote = false;

// Interaction with the Taste Input of the Review Form
function voteTaste(vote, force_change) {
    if (!force_change && lock_taste_vote)
        return;
    if (!vote)
        return;
    //Edit Graphics
    for (let i = 0; i < vote; i++) {
        taste_stars[i].classList.remove("tint-black");
    }
    for (let i = vote; i < taste_stars.length; i++) {
        taste_stars[i].classList.add("tint-black");
    }
    //Edit Saved Value
    taste_input.value = vote;
}

// Interaction with the Taste Input + lock the vote
function voteTasteAndLock(vote) {
    lock_taste_vote = true;
    voteTaste(vote, true);
}

// Interaction with the Difficulty Input of the Review Form
function voteDifficulty(vote, force_change) {
    if (!force_change && lock_difficulty_vote)
        return;
    if (!vote)
        return;
    //Edit Graphics
    for (let i = 0; i < vote; i++) {
        difficulty_stars[i].classList.add("tint-primary");
    }
    for (let i = vote; i < taste_stars.length; i++) {
        difficulty_stars[i].classList.remove("tint-primary");
    }
    //Edit Saved Value
    difficulty_input.value = vote;
}

// Interaction with the Difficulty Input + lock the vote
function voteDifficultyAndLock(vote) {
    lock_difficulty_vote = true;
    voteDifficulty(vote, true);
}

// Review Submit Form Control
function validateAndPublishReview(form) {
    let form_ok = true;
    let inputs = form.querySelectorAll("input");

    //Default Validation
    for (let input of inputs) {
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");
        if (!input.checkValidity()) {
            form_ok = false;
            input.classList.add("is-invalid");
        } else {
            input.classList.add("is-valid");
        }
    }

    //Check if date is not in the future
    let date = form.date;
    let date_value = Date.parse(date.value);
    let today = new Date(new Date().toDateString()).getTime(); //Today in ms at midnight
    let now = new Date().getTime(); //Now in ms

    if (date_value > now) {
        form_ok = false;
        date.classList.add("is-invalid");
        date.classList.remove("is-valid");
    }

    //if ok add review to local storage
    if (form_ok) {

        let form_data = new FormData(form);

        let new_review = {
            recipe_id: form_data.get("id"),
            author: getFromStorage("current_user"),
            content: form_data.get("content"),
            taste: form_data.get("taste"),
            difficulty: form_data.get("difficulty"),
            timestamp: date_value + (now - today), //Sets the offset to now
        };

        addReviewToStorage(new_review);
    }

    return form_ok;
}

//Show Review Form 
function showReviewForm() {
    form.querySelector(".review-form-more").classList.remove("d-none");
}

//Hide Review Form 
function closeReviewForm() {
    form.querySelector(".review-form-more").classList.add("d-none");
}

/* -------------- Login Form -------------- */

// Submit for Login Modal
function checkCredentialsAndLogin(form) {
    let email = form.querySelector("input#login_email");
    let password = form.querySelector("input#login_password");
    email.classList.remove("is-invalid");
    password.classList.remove("is-invalid");

    if (checkCredentials(email.value, password.value)) {
        //Ok
        loginUser(email.value);
        return true;
    } else {
        //Not ok
        document.querySelector(".invalid-credentials").classList.remove("d-none");
        //if username not found
        email.classList.add("is-invalid");
        //always
        password.classList.add("is-invalid");
        return false;
    }
}

/* -------------- Save Recipe Form -------------- */

//Get recipe note data and save in cookbook
function saveRecipe(form) {
    let form_data = new FormData(form);

    let saved_recipe = {
        id: form_data.get("recipe_id"),
        note: form_data.get("note"),
    };

    addToCookbook(saved_recipe);

    //Update icon for the cards
    let recipe_hrefs = document.querySelectorAll("[href*='id=" + form_data.get("recipe_id") + "']");
    recipe_hrefs.forEach((href) => {
        let card = href.parentNode;
        card.setAttribute("data-favourite", "true");
    });
    //Update icon for the recipe page
    if (getURLParam("id")) {
        document.querySelector("[data-favourite]").setAttribute("data-favourite", "true");
    }

    //Empty the form note
    form.querySelector("#note").value = "";

    //Prevent reload
    return false;
}



