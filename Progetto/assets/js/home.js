/* Hide Results when anything is clicked */

let results = document.querySelectorAll(".search-results");

function hideSearchResults() {
    for (let result of results) {
        result.remove();
    }
}

/* Scroll when Search Bar is Selected*/

function scrollToHere(element) {
    let element_y = element.getBoundingClientRect().top + window.scrollY; //Relative to the document, not the viewport
    window.scroll({
        top: element_y - 100,
        left: 0,
        behaviour: "smooth",
    });
}

/* Position main Scrollers to the Center */

let scrollers = document.querySelectorAll(".scroll-to-center");
scrollers.forEach((scroller) => {
    let scroll_to = (scroller.scrollWidth - scroller.clientWidth) / 2;
    scroller.scroll({
        top: 0,
        left: scroll_to,
    });

})
