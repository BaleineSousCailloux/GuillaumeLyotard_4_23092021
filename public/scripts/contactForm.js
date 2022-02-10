this.getContactForm = (person) => {
    // open & close contact form


    const openBtn = document.getElementById("openForm");
    const contactForm = document.getElementById("contact");
    const formContent = document.getElementById("content");
    const closeBtn = document.getElementById("closeForm");
    const photographerContactName = document.getElementById("contactForm-photographer-name");
    photographerContactName.innerHTML = `Contactez ${person.name}`;
    photographerContactName.setAttribute("aria-label", `${person.name}`);
    photographerContactName.setAttribute("tabindex", 1);


    // open contact form fonction
    function launchContactForm() {
        sendConfirm.style.display = "none";
        contactForm.style.display = "flex";
        formContent.focus();

        document.getElementById("body").setAttribute("aria-hidden", true);
        document.getElementById("body").classList.add("hidden");

        closeBtn.addEventListener("keydown", e => {
            e.preventDefault();
            if (e.keyCode === 9 && closeBtn.contains(document.activeElement)) {
                photographerContactName.focus();
            } else if (e.keyCode === 13 || e.keyCode === 32) {
                closeBtn.click();
            }
        });
        contactForm.addEventListener("keydown", e => {
            if (e.keyCode === 27 && formContent.contains(document.activeElement)) {
                closeBtn.click();
            }
        })
        /// gestion des onfocus sur les éléments //////////////////////////////////////////////////////
    }

    // delay to close functions
    function manualCloseDelay() {
        setTimeout(closeContactForm, 200);
    }
    function autoCloseDelay() {
        setTimeout(closeContactForm, 5000);
    }

    // close contact form function
    function closeContactForm() {
        document.getElementById("body").setAttribute("aria-hidden", false);
        document.getElementById("body").classList.remove("hidden");

        contactForm.style.display = "none";
        document.getElementById("first-error").style.display = 'none';
        document.getElementById("last-error").style.display = 'none';
        document.getElementById("email-error").style.display = 'none';
        document.getElementById("message-error").style.display = 'none';
    }

    // close contact form event
    //closeBtn.addEventListener("click", manualCloseDelay);


    openBtn.addEventListener("click", launchContactForm);
    closeBtn.addEventListener("click", manualCloseDelay);



    // contact form validation

    // DOM Elements
    const formulaire = document.getElementById("form")
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
        }
        counter.innerText = charLength;
    })


    // contrôle et envoi

    formulaire.addEventListener("submit", function (event) {

        event.preventDefault();

        // ex regex : (/^[A-Z|a-z|\-]{2,}$/g.test(firstName.value))
        let firstNameIsValid = false;
        if (/^[A-Z|a-z|-]{2,}$/g.test(firstName.value)) {
            firstNameIsValid = true;
            document.getElementById("first-error").style.display = 'none';
        } else {
            document.getElementById("first-error").style.display = 'block';
        }

        // ex regex : (/^[A-Z|a-z|\-]{1,}$/g.test(lastName.value))
        let lastNameIsValid = false;
        if (/^[A-Z|a-z|-]{1,}$/g.test(lastName.value)) {
            lastNameIsValid = true;
            document.getElementById("last-error").style.display = 'none';
        } else {
            document.getElementById("last-error").style.display = 'block';
        }

        // ex regex : (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email.value.trim().toLowerCase()))
        let emailIsValid = false; // regex trouvée sur internet, mais déjà géré automatiquement par le html
        if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(email.value.trim().toLowerCase())) {
            emailIsValid = true;
            document.getElementById("email-error").style.display = 'none';
        } else {
            document.getElementById("email-error").style.display = 'block';
        }

        let messageIsValid = false;
        if (message.value !== "") {
            messageIsValid = true;
            document.getElementById("message-error").style.display = 'none';
        } else {
            document.getElementById("message-error").style.display = 'block';
        }

        if (firstNameIsValid && lastNameIsValid && emailIsValid && messageIsValid) {
            autoCloseDelay(); // rappel de la fonction de clotûre de la modale automatique
            sendConfirm.style.display = 'block';
            sendConfirm.focus();
            console.log("prénom : " + firstName.value); // Affichage des données saisies dans la console
            console.log("nom : " + lastName.value);
            console.log("email : " + email.value);
            console.log("message : " + message.value);
            console.log("envoyer à : " + person.name.replace(" ", '') + "@gmail.com")
            formulaire.reset(); // vider le formulaire
        }
    })
}