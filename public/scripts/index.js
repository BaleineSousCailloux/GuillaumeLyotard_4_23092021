let photographers = [];
let medias = [];
let tags = [];

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
    getCard = () => {
        const newPhotographer = document.createElement("article");
        newPhotographer.classList.add("photographer");
        newPhotographer.innerHTML = `
        <a href="./pages/photographe.html?id=${indexCard.id}" class="photographer__card">
            <img class="photographer__card__img" src="../public/images/Photos/Photographers ID Photos/${indexCard.portrait}" />
            <h2 class="photographer__card__name">${indexCard.name}</h2>
        </a>
        <div class="photographer__legend">
            <h3 class="photographer__legend__city">${indexCard.city}, ${indexCard.country}</h3>
            <p class="photographer__legend__slogan">${indexCard.tagline}</p>
            <p class="photographer__legend__price">${indexCard.price}€/jour</p>
            <div class="photographer__legend__tags"></div>
        </div>
        `;
        indexCard.tags.forEach(tag => {
            newTag = document.createElement("span");
            newTag.classList.add("photographer__legend__tags__tag");
            newTag.innerText = tag;
            newPhotographer.getElementsByClassName("photographer__legend__tags")[0].appendChild(newTag);
        })
        return newPhotographer;
    }
    return this;
}

const getPhotographerCards = async () => {
    photographers = await getPhotographersData();
    //console.log(photographers) // verif
    photographers.forEach(photographer => {
        const instance = indexCardFactory(photographer);
        const newCard = instance.getCard();
        document.getElementById("photographers").appendChild(newCard);
    })
};
getPhotographerCards();