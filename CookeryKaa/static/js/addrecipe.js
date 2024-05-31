document.addEventListener('DOMContentLoaded', function () {
    const directionsContainer = document.getElementById('directions-container');
    const ingredientContainer = document.getElementById('Ingrediants_container');
    const photoUploadButton = document.getElementById('photo-upload-button');
    const videoUploadButton = document.getElementById('video-upload-button');
    const photoUploadInput = document.getElementById('photo-upload-input');
    const videoUploadInput = document.getElementById('video-upload-input');
    const photoDisplay = document.getElementById('photo-display');
    const videoDisplay = document.getElementById('video-display');
 
    let directionNumber = 1;
    let ingredientNumber = 1;
 
   
    function addIngredientBox() {
        const newIngredientBox = document.createElement('div');
        newIngredientBox.classList.add('ingredient-box');
 
        const ingredientBox = document.createElement('div');
        ingredientBox.classList.add('ing');
        ingredientBox.innerHTML = `
            <input type="text" placeholder="Ingredient ${ingredientNumber + 1}">
        `;
        newIngredientBox.appendChild(ingredientBox);
 
        const quantity = document.createElement('div');
        quantity.classList.add('quan');
        quantity.innerHTML = `
            <input type="text" placeholder="Quantity">
        `;
        newIngredientBox.appendChild(quantity);
 
        ingredientContainer.appendChild(newIngredientBox);
        ingredientNumber++;
    }
 
    function addDirectionBox() {
        const newDirectionBox = document.createElement('div');
        newDirectionBox.classList.add('dir');
 
        const directionBox = document.createElement('div');
        directionBox.classList.add('direction_box');
        directionBox.innerHTML = `
            <input type="text" name="direction_step[]" placeholder="Direction ${directionNumber + 1}">
        `;
        newDirectionBox.appendChild(directionBox);
 
        const imageBox = document.createElement('div');
        imageBox.classList.add('dir_image');
        imageBox.innerHTML = `
            <input type="image" name="direction_photo[]" accept="image/*" style="display:none;" onchange="displayImage(event, this)" placeholder="Image">
        `;
        newDirectionBox.appendChild(imageBox);
 
        directionsContainer.appendChild(newDirectionBox);
        directionNumber++;
    }
 
    function handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoDisplay.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
 
    function handleVideoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                videoDisplay.src = e.target.result;
                videoDisplay.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }
 
    ingredientContainer.addEventListener('keydown', function (event) {
        const lastIngredient = ingredientContainer.lastElementChild.querySelector('.quan input');
        if (event.key === 'Enter' && event.target === lastIngredient) {
            event.preventDefault();
            addIngredientBox();
        }
    });
 
    directionsContainer.addEventListener('keydown', function (event) {
        const lastDirectionBox = directionsContainer.lastElementChild.querySelector('input');
        if (event.key === 'Enter' && event.target === lastDirectionBox) {
            event.preventDefault();
            addDirectionBox();
        }
    });
 
    photoUploadButton.addEventListener('click', function () {
        photoUploadInput.click();
    });
 
    videoUploadButton.addEventListener('click', function () {
        videoUploadInput.click();
    });
 
    photoUploadInput.addEventListener('change', handlePhotoUpload);
    videoUploadInput.addEventListener('change', handleVideoUpload);
 
    addIngredientBox();
    addDirectionBox();
 });