document.getElementById('save-button').addEventListener('click', function() {
    const name = document.getElementById('recipe-name').value;
    const category = document.getElementById('recipe-category').value;
    const instructions = document.getElementById('recipe-instructions').value;
    const imageFile = document.getElementById('recipe-image').files[0];

    if (!name || !category || !instructions) {
        alert('Please fill in all fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push({
            name,
            category,
            instructions,
            image: event.target.result
        });
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        clearForm();
    };
    
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please select an image.');
    }
});

function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.forEach(recipe => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${recipe.name} (${recipe.category})</h3>
            <img src="${recipe.image}" alt="${recipe.name}" style="max-width: 100px; display: block;">
            <p>${recipe.instructions}</p>
        `;
        recipeList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-category').value = '';
    document.getElementById('recipe-instructions').value = '';
    document.getElementById('recipe-image').value = '';
}

// Load recipes on page load
window.onload = displayRecipes;
