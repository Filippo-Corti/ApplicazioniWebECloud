/* --------------------------------------------------------------- 
Form-Control.js contains the scripts that deal with validation of the
Registration Form.
It is imported in signup.html and profile.html.
IMPORTANT: it's not related to the Login Form, which scripts are
contained in utils.js, as they are needed everywhere.
--------------------------------------------------------------- */

/* Multi-Part Form Sliding & Validation */

let form = document.querySelector("form");
let form_content = form?.querySelector(".form-content");
let form_part_1 = form_content?.firstElementChild;
let form_part_2 = form_content?.lastElementChild;

let form_step_count = document.querySelector("#form-step-count");
let first_line = document.querySelectorAll(".line")[0];
let second_line = document.querySelectorAll(".line")[1];
let continue_button = form?.querySelector("button[role='continue'");
let back_button = form?.querySelector("button[role='back'");

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

    //Missing Check for Already Used Email !!!!
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
}

//Go back to Step 1
function goBack() {
    form_content.style.transform = "translateX(0%)";
    form_step_count.innerHTML = "Step 1 of 2";
    second_line.classList.remove("bg-primary");
    first_line.classList.add("bg-primary");
}

//Tag Selection - Toggle Tag
function toggleState(tag) {
    let checkbox = tag.querySelector("input[type='checkbox']");
    let img = tag.querySelector("img");

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
        if(!value.startsWith(keyword)) {
            tag.classList.add("d-none");
        } else {
            tag.classList.remove("d-none");
        }
    }
} 

