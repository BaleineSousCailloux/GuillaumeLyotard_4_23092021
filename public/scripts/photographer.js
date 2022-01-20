const fetchData = async () => {
    const res = await fetch("../public/data/FishEyeData.json");
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


let position = window.location.href.indexOf("?");
console.log(position);
let urlId = window.location.href.substring(position + 4);
console.log(urlId);
let surname = "toto";
let imageName = "pho-to";
let imageNameFix = "photo";
let videoCard;


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
        photographerCard.tags.forEach(tag => {
            const newTag = document.createElement("span");
            newTag.classList.add("photographer__legend__tags__tag");
            newTag.classList.add(`${tag}`)
            newTag.innerHTML = `#${tag}`;
            photographer.getElementsByClassName("photographer__legend__tags")[0].appendChild(newTag);
        })

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



const mediaPortfolioFactory = (portfolio) => {
    getImgCard = () => {
        const imageCard = document.createElement("article");
        imageCard.classList.add("portfolio__content__card");
        if (videoCard) {
            console.log(videoCard);
            imageCard.innerHTML = `
            <video class="portfolio__content__card__video" poster>
                <source src="../public/images/Photos/${surname}/${portfolio.video}" type="video/mp4">
            </video>
            <span class="portfolio__content__card__video__icon fa-solid fa-video"></span>
            <div class="portfolio__content__card__legend">
                <p class="portfolio__content__card__legend__title">${portfolio.title}</p>
                <div class="portfolio__content__card__legend__like">
                    <span class="portfolio__content__card__legend___like__cunt">${portfolio.likes}</span>
                    <span class="portfolio__content__card__legend___like__empty far fa-heart"></span>
                    <span class="portfolio__content__card__legend___like__full fas fa-heart"></span>
                </div>
            </div>
            `;
        } else {
            console.log(imageName);
            imageNameFix = imageName.replace("-", '');
            console.log(imageNameFix);
            imageCard.innerHTML = `
        <img class="portfolio__content__card__img" src="../public/images/Photos/${surname}/${imageNameFix}" />
        <div class="portfolio__content__card__legend">
            <p class="portfolio__content__card__legend__title">${portfolio.title}</p>
            <div class="portfolio__content__card__legend__like">
                <span class="portfolio__content__card__legend___like__cunt">${portfolio.likes}</span>
                <span class="portfolio__content__card__legend___like__empty far fa-heart"></span>
                <span class="portfolio__content__card__legend___like__full fas fa-heart"></span>
            </div>
        </div>
        `;
        }
        return imageCard
    }
    return this;
}


const getPhotographerCard = async () => {
    photographers = await getPhotographersData();
    medias = await getMediasData();
    photographers.forEach(photographer => {
        if (photographer.id == urlId) {
            const instance = photographerCardFactory(photographer);
            const newCard = instance.getPersonnalCard();
            document.getElementById("photographer").appendChild(newCard);
            surname = photographer.name.replace(/\w+[.!?]?$/, '').trim().replace("-", ' ');
        }
    });
    //await getMediasData().then(getMediaCard());
    medias.forEach(media => {
        if (media.photographerId == urlId) {
            imageName = media.image;
            videoCard = media.video;
            //const imageFix = media.image.replace("-", '');
            const temp = mediaPortfolioFactory(media);
            const newImgCard = temp.getImgCard();
            document.getElementById("portfolioContent").appendChild(newImgCard);
        }
    });
};
getPhotographerCard();

/*const getMediaCard = async () => {
    medias = await getMediasData();
    medias.forEach(media => {
        if (media.photographerId == urlId) {
            console.log(media);
            const temp = mediaPortfolioFactory(media);
            const newImgCard = temp.getImgCard();
            document.getElementById("portfolioContent").appendChild(newImgCard);
        }
    });
};

const getPhotographerPage = async () => {
    await getMediaCard().then(getPhotographerCard());
}
getPhotographerPage();*/