// DOM Elements
const openLightbox = document.querySelectorAll(".portfolio__content__card__img");
const lightbox = document.querySelector("#lightbox");
const closeLightbox = document.querySelector("#closeBox");


// open Lightbox event (img click)
openLightbox.forEach(img => img.addEventListener("click", launchLightbox));


// open lightbox fonction
function launchLightbox() {
  lightbox.style.display = "flex";
};


// close lightbox event
closeLightbox.addEventListener("click", quitLightbox);


// close lightbox function
function quitLightbox() {
  lightbox.style.display = "none";
};


