// DOM Elements
const openLightbox = document.getElementsByClassName(".portfolio__content__card__img")
const lightbox = document.getElementById("lightbox");
const closeLightbox = document.getElementById("closeLightbox");


// launch Lightbox event (img click)
openLightbox.forEach(img => img.addEventListener("click", launchLightbox));


// launch lightbox fonction
function launchLightbox() {
  lightbox.style.display = 'flex';
}


// options : delay to close
let delayToClose;
function manualCloseDelay() {
  delayToClose = setTimeout(quitLightbox, 500);
}
function autoCloseDelay() {
  delayToClose = setTimeout(quitLightbox, 3500);
}


// close lightbox event
closeLightbox.addEventListener('click', manualCloseDelay);


// close lightbox function
function quitLightbox() {
  lightbox.style.display = 'none';
}