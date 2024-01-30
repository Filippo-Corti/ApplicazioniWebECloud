async function showRandomMeals() {
    let meals = await fetchRandomMeals(6);
    for (let meal of meals) {
        console.log(extractIngredients(meal))
    }
}