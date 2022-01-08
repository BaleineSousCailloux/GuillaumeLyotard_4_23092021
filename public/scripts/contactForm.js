// DOM Elements
const openBtn = document.getElementById("openForm");
const contactForm = document.getElementById("contact");
const closeBtn = document.getElementById("closeForm");



// open contact form event (img click)
openBtn.addEventListener("click", launchContactForm);


// open contact form fonction
function launchContactForm() {
    contactForm.style.display = "flex";
};


// close contact form function
function closeContactForm() {
    contactForm.style.display = "none";
};


// close contact form event
closeBtn.addEventListener("click", closeContactForm);