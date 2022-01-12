// link data.json, photos & index

let photographers = [];
let medias = [];

const fetchData = async () => {
    const res = await fetch("./public/data/FishEyeData.json");
    const data = await res.json()
    return data;
};

const indexCardFactory = (id) => {
    this.name = photographers.name;
    this.id = photographers.id;
    this.city = photographers.city;
    this.country = photographers.country;
    this.tagline = photographers.tagline;
    this.price = photographers.price;
    this.portrait = photographers.portrait;
    this.tags = photographers.tags;

    this.getCard = () => {
        const newPhotographer = document.createElement("article");
        newPhotographer.classList.add("photographer");
        newPhotographer.innerHTML =
            `
        <a href="./pages/photographe.html" class="photographer__card">
            <img class="photographer__card__img" src="../public/images/Photos/Photographers ID Photos/${this.portrait}" />
            <h2 class="photographer__card__name">${this.name}</h2>
        </a>
        <div class="photographer__legend">
            <h3 class="photographer__legend__city">${this.city}, ${this.country}</h3>
            <p class="photographer__legend__slogan">${this.tagline}</p>
            <p class="photographer__legend__price">${this.price}€/jour</p>
            <div class="photographer__legend__tags">
                <span class="photographer__legend__tags__tag portrait">#portrait</span>
                <span class="photographer__legend__tags__tag events">#events</span>
                <span class="photographer__legend__tags__tag travel">#travel</span>
                <span class="photographer__legend__tags__tag animals">#animals</span>
            </div>
        </div>
    `;
    }
    return this
}

const getPhotographerCards = async () => {
    await fetchData()
        .then(AllData => {
            photographers = AllData.photographers;
            medias = AllData.media;
        })
        .then(card => {
            console.log(photographers);
            photographers.forEach(photographer => {
                const instance = indexCardFactory(photographer);
                const newCard = instance.getCard();
                document.getElementById("photographers").appendChild(newCard)
            })
        });
};
getPhotographerCards();
