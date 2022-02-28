const searchFood = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals));
}

searchFood();

const displayFood = meals => {
    console.log(meals);
    const result = document.getElementById('result');
    result.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100 shadow-lg">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `;
        result.appendChild(div);
    });
}


const loadMealDetails = mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]));
}

const displayMealDetails = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-Deatils');
    mealDetails.textContent = '';
    const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow-lg">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`;
        mealDetails.appendChild(div);
}