/* --------------------------------------------------------------- 
Utils.js contains scripts that are generally useful for any page. 
Scripts are about the application background, the modals and the
tooltips.
It is imported in every .html page.
--------------------------------------------------------------- */


/* Build GRID: */

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

/* Background Stripe Blur */

let background_stripe = document.querySelector(".background-stripe");

document.addEventListener("scroll", (event) => {
    let currentScrollPercentage = window.scrollY / (document.body.scrollHeight - window.screen.height);
    background_stripe.style.filter = "blur(" + 10000 * currentScrollPercentage + "px)";
})

/* Save Recipe Modal - from https://getbootstrap.com/docs/5.3/components/modal/#varying-modal-content */
const saveRecipeModal = document.getElementById('saveRecipeModal')
if (saveRecipeModal) {
    saveRecipeModal.addEventListener('show.bs.modal', event => {

        // !!! if not logged in event.preventDefault() + show del modal di Login

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

/* Login Modal */
function checkCredentialsAndLogin(form) {
    let email = form.querySelector("input[type='email']");
    let password = form.querySelector("input[type='password']");
    email.classList.remove("is-invalid");
    password.classList.remove("is-invalid");

    if (email.value === "corti.filippo03@gmail.com" && password.value === "1234") {
        //Ok
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

/* Toggle Password Visibility for Forms */
function toggleShowPassword() {
    let password_fields = document.querySelectorAll(".toggle-visibility");

    for (let password_field of password_fields) {
        if (password_field.type == "password")
            password_field.type = "text";
        else
            password_field.type = "password";
    }
}



/* Enable Bootstrap Tooltips - from https://getbootstrap.com/docs/5.3/components/tooltips/#enable-tooltips */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))




/* ESEMPIO x API !!!
async function showRandomMeals() {
    let meals = await fetchRandomMeals(6);
    for (let meal of meals) {
        console.log(extractIngredients(meal))
    }
}
*/


