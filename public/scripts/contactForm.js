// open & close contact form

// DOM Elements
const openBtn = document.getElementById("openForm");
const contactForm = document.getElementById("contact");
const closeBtn = document.getElementById("closeForm");

// open contact form event (img click)
openBtn.addEventListener("click", launchContactForm);

// open contact form fonction
function launchContactForm() {
    sendConfirm.style.display = "none";
    contactForm.style.display = "flex";
};

// delay to close functions
let delayToClose;
function manualCloseDelay() {
    delayToClose = setTimeout(closeContactForm, 200);
}
// global validation option
function autoCloseDelay() {
    delayToClose = setTimeout(closeContactForm, 3000);
}

// close contact form function
function closeContactForm() {
    contactForm.style.display = "none";
};

// close contact form event
closeBtn.addEventListener("click", manualCloseDelay);



// contact form validation

// DOM Elements
const formulaire = document.getElementById("form")
const sendBtn = document.getElementById("submit");
const sendConfirm = document.getElementById("confirm")
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");


// contrôle et envoi

formulaire.addEventListener("submit", function (event) {

    event.preventDefault();

    let firstNameIsValid = false;
    if (/^[A-Z|a-z|\-]{2,}$/g.test(firstName.value)) {
        firstNameIsValid = true;
        console.log("prénom OK");
    } else {
        firstName.setCustomValidity("Indiquez votre prénom (minimum 2 lettre).");
        console.log("prénom incorrect")
    }

    let lastNameIsValid = false;
    if (/^[A-Z|a-z|\-]{1,}$/g.test(lastName.value)) {
        lastNameIsValid = true;
        console.log("nom OK");
    } else {
        lastName.setCustomValidity("Indiquez votre nom (minimum 1 lettre).");
        console.log("nom incorrect")
    }

    let emailIsValid = false; // regex trouvée sur internet, mais déjà géré automatiquement par le html
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value.trim().toLowerCase())) {
        emailIsValid = true;
        console.log("email OK");
    } else {
        email.setCustomValidity("Indiquez une adresse mail valide.");
        console.log("email incorrect");
    }

    let formulaireIsValid = false; // validation globale
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formulaireIsValid = true;
        autoCloseDelay(); // rappel de la fonction de clotûre de la modale automatique
        sendConfirm.style.display = 'block';
        console.log("prénom : " + firstName.value); // Affichage des données saisies dans la console
        console.log("nom : " + lastName.value);
        console.log("email : " + email.value);
        formulaire.reset(); // vider le formulaire
    };


})