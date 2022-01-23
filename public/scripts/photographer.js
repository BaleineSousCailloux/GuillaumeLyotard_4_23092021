let surname = "";
let videoName;
let isVideo;
let sortMedias = [];




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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlId = urlParams.get("id");
console.log("id = " + urlId);

const popBtn = document.getElementById("pop");
const dateBtn = document.getElementById("date");
const titleBtn = document.getElementById("title");
const btnSelected = [];
btnSelected.push(popBtn, dateBtn, titleBtn);

const btnSelection = (btnSelected, btnClick) => {
    btnSelected.forEach(btn => {
        btn.addEventListener("click", btnClick)
    })
}

/*let position = window.location.href.indexOf("?");
console.log(position);
let urlId = window.location.href.substring(position + 4);
console.log(urlId);

const addTagsToPhotographer = (card) => {
    card.tags.forEach(tag => {
        const newTag = document.createElement("span");
        newTag.classList.add("photographer__legend__tags__tag");
        newTag.classList.add(`${tag}`);
        newTag.innerHTML = `#${tag}`;
        photographer.getElementsByClassName("photographer__legend__tags")[0].appendChild(newTag);
    })
};*/


const getPhotographerCard = () => {
    photographers.forEach(photographer => {
        if (photographer.id == urlId) {
            const instance = photographerCardFactory(photographer);
            const card = instance.getPersonnalCard();
            document.getElementById("photographer").appendChild(card);
            surname = photographer.name;
            return photographer
        }
    });
};


const getPhotographerPortfolio = (mediasArray, media) => {
    sortMedias = mediasArray;
    document.getElementById("portfolioContent").innerHTML = "";
    mediasArray.forEach(media => {
        videoName = media.video;
        const temp = mediaPortfolioFactory(media);
        const newMediaCard = temp.getMediaCard();
        document.getElementById("portfolioContent").appendChild(newMediaCard);
    });
    return sortMedias;

};



const getPhotographerMedias = () => {
    let btnActive = "";
    let photographerMedias = [];
    medias.forEach(media => {
        if (media.photographerId == urlId) {
            photographerMedias.push(media);
        };
        // defaut and open order, par popularité
        return photographerMedias.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1;
            } else if (a.likes < b.likes) {
                return 1;
            } else {
                return 0
            };
        });
    });
    getPhotographerPortfolio(photographerMedias);

    btnSelection(btnSelected, event => {
        photographerMedias.length = 0;
        btnActive = event.target.getAttribute("id");
        if (btnActive == "date") {
            medias.forEach(media => {
                if (media.photographerId == urlId) {
                    photographerMedias.push(media);
                };
                // tri par date
                return photographerMedias.sort((a, b) => {
                    if (a.date > b.date) {
                        return -1;
                    } else if (a.date < b.date) {
                        return 1;
                    } else {
                        return 0
                    };
                });
            });
        } else if (btnActive == "title") {
            medias.forEach(media => {
                if (media.photographerId == urlId) {
                    photographerMedias.push(media);
                };
                // tri par titre
                return photographerMedias.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    } else {
                        return 0
                    };
                });
            });
        } else if (btnActive == "pop") {
            medias.forEach(media => {
                if (media.photographerId == urlId) {
                    photographerMedias.push(media);
                };
                // tri par popularité
                return photographerMedias.sort((a, b) => {
                    if (a.likes > b.likes) {
                        return -1;
                    } else if (a.likes < b.likes) {
                        return 1;
                    } else {
                        return 0
                    };
                });
            });
        }
        getPhotographerPortfolio(photographerMedias);
    });
};

/*
const temps = lightboxFactory(mediaId);
const newMediaInLightbox = temps.getLightboxVue();
document.getElementById("lightbox").appendChild(newMediaInLightbox);
lightboxVue(mediaId);
};*/
//getPhotographerPage();

const init = async () => {
    photographers = await getPhotographersData();
    medias = await getMediasData();
    getPhotographerCard();
    getPhotographerMedias();
    lightboxVue(sortMedias);
}

init();