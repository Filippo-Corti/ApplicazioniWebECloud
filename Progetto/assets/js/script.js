/* Build GRID: */

let grid_container = document.querySelector(".grid");
let grid_col = document.querySelector(".grid-col");
const COLS = 30;
const COL_SIZE = window.screen.width / COLS;
let grid_row = document.querySelector(".grid-row");
const ROW_SIZE = COL_SIZE;
const ROWS = document.body.scrollHeight / ROW_SIZE;

for (let i = 1; i < COLS; i++) {
    let new_col = grid_col.cloneNode(true);
    new_col.classList.remove("d-none");
    new_col.style.left = COL_SIZE * i + "px";
    grid_container.appendChild(new_col);
}

for (let i = 1; i < ROWS; i++) {
    let new_row = grid_row.cloneNode(true);
    new_row.classList.remove("d-none");
    new_row.style.top = ROW_SIZE * i + "px";
    grid_container.appendChild(new_row);
}






async function showRandomMeals() {
    let meals = await fetchRandomMeals(6);
    for (let meal of meals) {
        console.log(extractIngredients(meal))
    }
}


