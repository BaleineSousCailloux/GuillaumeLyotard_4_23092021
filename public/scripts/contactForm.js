const getContactForm = (person) => {
    // open & close contact form


    const openBtn = document.getElementById("openForm");
    const contactForm = document.getElementById("contact");
    const closeBtn = document.getElementById("closeForm");
    const photographerContactName = document.getElementById("contactForm-photographer-name");
    photographerContactName.innerHTML = `Contactez ${person.name}`;

    //photographerContactName.innerText = "contactez " + person.name;


    // DOM Elements
    /*const openBtn = document.getElementById("openForm");
    const contactForm = document.getElementById("contact");
    const closeBtn = document.getElementById("closeForm");*/

    // open contact form event (img click)

    //openBtn.addEventListener("click", launchContactForm);

    // open contact form fonction
    function launchContactForm() {
        sendConfirm.style.display = "none";
        contactForm.style.display = "flex";
        /// gestion des onfocus sur les éléments //////////////////////////////////////////////////////
    };

    // delay to close functions
    let delayToClose;
    function manualCloseDelay() {
        delayToClose = setTimeout(closeContactForm, 200);
    }
    function autoCloseDelay() {
        delayToClose = setTimeout(closeContactForm, 4000);
    }

    // close contact form function
    function closeContactForm() {
        contactForm.style.display = "none";
        document.getElementById("first-error").style.display = 'none';
        document.getElementById("last-error").style.display = 'none';
        document.getElementById("email-error").style.display = 'none';
        document.getElementById("message-error").style.display = 'none';
    };

    // close contact form event
    //closeBtn.addEventListener("click", manualCloseDelay);


    openBtn.addEventListener("click", launchContactForm);
    closeBtn.addEventListener("click", manualCloseDelay);



    // contact form validation

    // DOM Elements
    const formulaire = document.getElementById("form")
    //const sendBtn = document.getElementById("submit");
    const sendConfirm = document.getElementById("confirm")

    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const counter = document.getElementById("message-counter");
    const maxLengthMessage = message.getAttribute("maxlength");
    let charLength = 0;
    counter.innerText = charLength;

    message.addEventListener('input', event => {
        charLength = event.target.value.length;
        if (charLength > maxLengthMessage) {
            return;
        };
        counter.innerText = charLength;
    });


    // contrôle et envoi

    formulaire.addEventListener("submit", function (event) {

        event.preventDefault();

        let firstNameIsValid = false;
        if (/^[A-Z|a-z|\-]{2,}$/g.test(firstName.value)) {
            firstNameIsValid = true;
            document.getElementById("first-error").style.display = 'none';
            //console.log("prénom OK");
        } else {
            document.getElementById("first-error").style.display = 'block';
            //console.log("prénom incorrect")
        };

        let lastNameIsValid = false;
        if (/^[A-Z|a-z|\-]{1,}$/g.test(lastName.value)) {
            lastNameIsValid = true;
            document.getElementById("last-error").style.display = 'none';
            //console.log("nom OK");
        } else {
            document.getElementById("last-error").style.display = 'block';
            //console.log("nom incorrect")
        };

        let emailIsValid = false; // regex trouvée sur internet, mais déjà géré automatiquement par le html
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value.trim().toLowerCase())) {
            emailIsValid = true;
            document.getElementById("email-error").style.display = 'none';
            //console.log("email OK");
        } else {
            document.getElementById("email-error").style.display = 'block';
            //console.log("email incorrect")
        };

        let messageIsValid = false;
        if (message.value !== "") {
            messageIsValid = true;
            document.getElementById("message-error").style.display = 'none';
            //console.log("message présent");
        } else {
            document.getElementById("message-error").style.display = 'block';
            //console.log("message absent")
        };

        let formulaireIsValid = false; // validation globale
        if (firstNameIsValid && lastNameIsValid && emailIsValid && messageIsValid) {
            formulaireIsValid = true;
            autoCloseDelay(); // rappel de la fonction de clotûre de la modale automatique
            sendConfirm.style.display = 'block';
            console.log("prénom : " + firstName.value); // Affichage des données saisies dans la console
            console.log("nom : " + lastName.value);
            console.log("email : " + email.value);
            console.log("message : " + message.value);
            console.log("envoyer à : " + person.name.replace(" ", '') + "@gmail.com")
            formulaire.reset(); // vider le formulaire
        }
    });
};