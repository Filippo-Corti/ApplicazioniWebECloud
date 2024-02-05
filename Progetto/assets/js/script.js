
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

/* Position main Scroller */

let scrollers = document.querySelectorAll(".scroll-to-center");
scrollers.forEach((scroller) => {
    let scroll_to = (scroller.scrollWidth - scroller.clientWidth) / 2;
    scroller.scroll({
        top: 0,
        left: scroll_to,
    });

})

/* Scroll when Search Bar is Selected */

function scrollToHere(element) {
    let element_y = element.getBoundingClientRect().top + window.scrollY; //Relative to the document, not the viewport
    window.scroll({
        top: element_y - 100,
        left: 0,
        behaviour: "smooth",
    });
}

async function showRandomMeals() {
    let meals = await fetchRandomMeals(6);
    for (let meal of meals) {
        console.log(extractIngredients(meal))
    }
}




