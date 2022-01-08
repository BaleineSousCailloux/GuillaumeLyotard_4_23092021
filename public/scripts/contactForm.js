// DOM Elements
const openBtn = document.querySelector("#openForm");
const contactForm = document.querySelector("#contact");
const closeBtn = document.querySelector("#closeForm");



// open contact form event (img click)
openBtn.addEventListener("click", launchContactForm);


// open contact form fonction
function launchContactForm() {
    contactForm.style.display = "flex";
};


/* options : delay to close
let delayToClose;
function manualCloseDelay() {
  delayToClose = setTimeout(closeContactForm, 500);
}
function autoCloseDelay() {
  delayToClose = setTimeout(closeContactForm, 3500);
}*/

// close contact form function
function closeContactForm() {
    contactForm.style.display = "none";
};


// close contact form event
closeBtn.addEventListener("click", closeContactForm);