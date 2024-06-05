
// modal section open garney when clicked on the pp and coverimg
const coverimg = document.querySelector(".coverimg");
const pp = document.querySelector(".img__container");
const modal = document.querySelector(".modal");
pp.addEventListener("click", () => {
  modal.classList.add("active");
  const text = document.querySelector("#upperText");
  text.innerText="Change Profile Picture"
});
coverimg.addEventListener("click", () => {
  modal.classList.add("active");
  const text = document.querySelector("#upperText");
  text.innerText="Change Backgroung Image"

});
//cancel button to close the modal
const cancel = document.querySelector("#cancel")
cancel.addEventListener("click", () => {
  modal.classList.remove("active");
  });

// file section open garney when clicked on upload
const fileInput = document.getElementById("file-input");
const uploadPhoto = document.getElementById("upload-photo");
uploadPhoto.addEventListener("click", () => {
  fileInput.click();
}); 
// uploadRecipie.addEventListener("click", () => {
//   fileInput.click();
// });      


