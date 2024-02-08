/* --------------------------------------------------------------- 
Home.js contains scripts used in the home and search pages.
--------------------------------------------------------------- */

let results = document.querySelectorAll(".search-results");

// Hide Results when anything is clicked
function hideSearchResults() {
    for (let result of results) {
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

let container = document.querySelector("#recipe-suggestions-random");
for (var i = 0; i < 10; i++) {
    

let dynamic_card1 = buildDynamicElement("recipe-card", {
    href: "pages/recipe.html?id=" + 12345,
    image: "https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg",
    taste: 3.5,
    difficulty: 4.7,
    reviews: 3,
    area: "Italian" + " Cuisine",
    name: "Nome del Piatto 1",
});

let dynamic_card2 = buildDynamicElement("recipe-card", {
    href: "pages/recipe.html?id=" + 12345,
    image: "https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg",
    taste: 3.5,
    difficulty: 4.7,
    reviews: 3,
    area: "Italian" + " Cuisine",
    name: "Nome del Piatto 2",
});

let dynamic_card3 = buildDynamicElement("recipe-card", {
    href: "pages/recipe.html?id=" + 12345,
    image: "https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg",
    taste: 3.5,
    difficulty: 4.7,
    reviews: 3,
    area: "Italian" + " Cuisine",
    name: "Nome del Piatto 3",
});

let dynamic_card_group = buildDynamicElement("recipe-card-group", {
    row1: getElementHTML(dynamic_card1) + getElementHTML(dynamic_card2),
    row2: getElementHTML(dynamic_card3),
})

container.appendChild(dynamic_card_group);
}

centerScrollers();


