const photographerCardFactory = (photographerCard) => {
    getPersonnalCard = () => {
        const photographer = document.createElement("article");
        photographer.classList.add("photographer__card");
        photographer.setAttribute("tabindex", -1);
        photographer.innerHTML = `
        <div class="photographer__card__contact">
            <h1 class="photographer__card__contact__name" tabindex="4" aria-label="${photographerCard.name}">${photographerCard.name}</h1>
            <button class="photographer__card__contact__btn" id="openForm" tabindex="7" aria-label="contactez-moi">Contactez-moi</button>
        </div>
        <div class="photographer__legend" tabindex="5" aria-label="informations de ${photographerCard.name}">
            <h2 class="photographer__legend__city" tabindex="-1" aria-label="sa localisation">${photographerCard.city}, ${photographerCard.country}</h2>
            <p class="photographer__legend__slogan" tabindex="-1" aria-label="son slogan">${photographerCard.tagline}</p>
        </div>
        <div class="photographer__legend__tags" tabindex="6" aria-label="ses mots-clef, via lequels vous pouvez lancer une recherche"></div>
        `;
        //addTagsToPhotographer(photographerCard);
        photographerCard.tags.forEach(tag => {
            const newTag = document.createElement("span");
            newTag.classList.add("photographer__legend__tags__tag");
            newTag.classList.add("tag");
            newTag.setAttribute("aria-label", tag);
            newTag.setAttribute("data-tag", tag);
            newTag.setAttribute("tabindex", -1);
            newTag.innerHTML = `#${tag}`;
            photographer.getElementsByClassName("photographer__legend__tags")[0].appendChild(newTag);
        });

        const photographerImg = document.createElement("div");
        photographerImg.classList.add("photographer__container");
        photographerImg.setAttribute("tabindex", -1);
        photographerImg.innerHTML = `<img class="photographer__container__img"
         src="../public/images/Photos/Photographers ID Photos/${photographerCard.portrait}" tabindex="8" aria-label="${photographerCard.name}"/>`;
        document.getElementById("photographer").appendChild(photographerImg);

        const footerPrice = document.createElement("p");
        footerPrice.setAttribute("aria-label", "son prix par jour");
        footerPrice.setAttribute("tabindex", -1);
        footerPrice.classList.add("footer__price");
        footerPrice.innerHTML = `${photographerCard.price}€ / jour`;
        document.getElementById("footer").appendChild(footerPrice);

        return photographer;
    }
    return this;
}