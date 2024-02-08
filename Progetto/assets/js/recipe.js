/* --------------------------------------------------------------- 
Recipe.js contains scripts used in the recipe page, mainly about
the Review Form.
--------------------------------------------------------------- */

let form = document.review_form;
let taste_stars = document.querySelectorAll(".review-taste-input>img");
let taste_input = form.taste;
let difficulty_stars = document.querySelectorAll(".review-difficulty-input>img");
let difficulty_input = form.difficulty;


// Interaction with the Taste Input of the Review Form
function voteTaste(vote) {
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

// Interaction with the Difficulty Input of the Review Form
function voteDifficulty(vote) {
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

// Review Submit Form Control
function validateAndPublishReview() {
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
    let now = Date.now();

    if (date_value > now) {
        form_ok = false;
        date.classList.add("is-invalid");
        date.classList.remove("is-valid");
    } 

    //if (form_ok) add review to local storage !!!

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
