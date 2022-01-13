let photographers = [];
let medias = [];

const fetchData = async () => {
    const res = await fetch("./public/data/FishEyeData.json");
    const data = await res.json();
    return data;
};
const getPhotographersData = async () => {
    const data = await fetchData();
    return data.photographers;
}
const getMediasData = async () => {
    const data = await fetchData();
    return data.media;
}

const indexCardFactory = (indexCard) => {
    this.indexCard = indexCard;

    getCard = () => {
        const newPhotographer = document.createElement("article");
        newPhotographer.classList.add("photographer");
        newPhotographer.innerHTML =
            `
        <a href="./pages/photographe.html" class="photographer__card">
            <img class="photographer__card__img" src="../public/images/Photos/Photographers ID Photos/${this.indexCard.portrait}" />
            <h2 class="photographer__card__name">${this.indexCard.name}</h2>
        </a>
        <div class="photographer__legend">
            <h3 class="photographer__legend__city">${this.indexCard.city}, ${this.indexCard.country}</h3>
            <p class="photographer__legend__slogan">${this.indexCard.tagline}</p>
            <p class="photographer__legend__price">${this.indexCard.price}€/jour</p>
            <div class="photographer__legend__tags">
                <span class="photographer__legend__tags__tag portrait">#portrait</span>
                <span class="photographer__legend__tags__tag events">#events</span>
                <span class="photographer__legend__tags__tag travel">#travel</span>
                <span class="photographer__legend__tags__tag animals">#animals</span>
            </div>
        </div>
    `;
        document.getElementById("photographers").appendChild(newPhotographer);

    }
    return this;
}

const getPhotographerCards = async () => {
    photographers = await getPhotographersData();
    console.log(photographers) // verif
    photographers.forEach(photographer => {
        const instance = indexCardFactory(photographer);
        const newCard = instance.getCard();
        console.log(photographer.name); //verif
        return newCard;

    })

};
getPhotographerCards();
