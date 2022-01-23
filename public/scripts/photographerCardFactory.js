const photographerCardFactory = (photographerCard) => {
    getPersonnalCard = () => {
        const photographer = document.createElement("article");
        photographer.classList.add("photographer__card");
        photographer.innerHTML = `
        <div class="photographer__card__contact">
            <h1 class="photographer__card__contact__name">${photographerCard.name}</h1>
            <button class="photographer__card__contact__btn" id="openForm">Contactez-moi</button>
        </div>
        <div class="photographer__legend">
            <h2 class="photographer__legend__city">${photographerCard.city}, ${photographerCard.country}</h2>
            <p class="photographer__legend__slogan">${photographerCard.tagline}</p>
            <div class="photographer__legend__tags">
            </div>
        </div>
        `;
        //addTagsToPhotographer(photographerCard);
        photographerCard.tags.forEach(tag => {
            const newTag = document.createElement("span");
            newTag.classList.add("photographer__legend__tags__tag");
            newTag.classList.add(`${tag}`)
            newTag.innerHTML = `#${tag}`;
            photographer.getElementsByClassName("photographer__legend__tags")[0].appendChild(newTag);
        });

        const photographerImg = document.createElement("div");
        photographerImg.classList.add("photographer__container");
        photographerImg.innerHTML = `<img class="photographer__container__img" src="../public/images/Photos/Photographers ID Photos/${photographerCard.portrait}"/>`;
        document.getElementById("photographer").appendChild(photographerImg);

        const footerPrice = document.createElement("p");
        footerPrice.classList.add("footer__price");
        footerPrice.innerHTML = `${photographerCard.price}€ / jour`;
        document.getElementById("footer").appendChild(footerPrice);

        return photographer;
    }
    return this;
}