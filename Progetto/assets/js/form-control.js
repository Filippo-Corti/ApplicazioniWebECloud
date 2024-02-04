/* Multi-Part Form Sliding & Validation */

let form = document.querySelector("form");
let form_content = form.querySelector(".form-content");

let form_step_count = document.querySelector("#form-step-count");
let first_line = document.querySelectorAll(".line")[0];
let second_line = document.querySelectorAll(".line")[1];
let continue_button = form.querySelector("button[role='continue'");
let back_button = form.querySelector("button[role='back'");

//Continues to Step 2
function continueForm() {
    form_content.style.transform = "translateX(-100%)";
    form_step_count.innerHTML = "Step 2 of 2";
    first_line.classList.remove("bg-primary");
    second_line.classList.add("bg-primary"); 
}

//Goes back to Step 1
function goBack() {
    form_content.style.transform = "translateX(0%)";
    form_step_count.innerHTML = "Step 1 of 2";
    second_line.classList.remove("bg-primary");
    first_line.classList.add("bg-primary");
}
