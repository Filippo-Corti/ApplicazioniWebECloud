let results = document.querySelectorAll(".search-results");

function hideSearchResults() {
    for (let result of results) {
        result.remove();
    }
}