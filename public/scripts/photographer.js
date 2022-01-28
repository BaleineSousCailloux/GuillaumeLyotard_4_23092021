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
//console.log("id = " + urlId);


const getPhotographerCard = () => {
    photographers.forEach(photographer => {
        if (photographer.id == urlId) {
            const instance = photographerCardFactory(photographer);
            const card = instance.getPersonnalCard();
            document.getElementById("photographer").appendChild(card);
            surname = photographer.name;
            getContactForm(photographer);
            return photographer
        }
    });
};


const popBtn = document.getElementById("pop");
const dateBtn = document.getElementById("date");
const titleBtn = document.getElementById("title");
const btnSelected = [];
btnSelected.push(popBtn, dateBtn, titleBtn);

const btnSelection = (btnClicked, btnClickAction) => {
    btnClicked.forEach(btn => {
        btn.addEventListener("click", btnClickAction)
    })
};


const getPhotographerPortfolio = (mediasArray) => {
    document.getElementById("portfolioContent").innerHTML = "";
    mediasArray.forEach(media => {
        videoName = media.video;
        const temp = mediaPortfolioFactory(media);
        const newMediaCard = temp.getMediaCard();
        document.getElementById("portfolioContent").appendChild(newMediaCard);

    });
    lightboxVue(mediasArray);
};


const getPhotographerMedias = () => {
    let btnActive = "";

    let photographerMedias = medias.filter(media => media.photographerId == urlId)
    personnalMedias = photographerMedias.map(media => ({ ...media, liked: "far" }));
    console.log(personnalMedias.reduce((likes, media) => likes + media.likes, 0));
    personnalMedias.sort((a, b) => {
        if (a.likes > b.likes) {
            return -1;
        } else if (a.likes < b.likes) {
            return 1;
        } else {
            return 0
        };
    });

    getPhotographerPortfolio(personnalMedias);
    const totalLikesFooter = document.querySelector(".footer__infos__cunt");
    totalLikesFooter.innerText = personnalMedias.reduce((likes, media) => likes + media.likes, 0);
    const likeZones = document.getElementsByClassName("portfolio__content__card__legend__like");


    Array.from(likeZones).forEach(likeZone => {
        likeZone.addEventListener("click", (e) => {
            const zoneToClick = e.target.classList.contains("portfolio__content__card__legend__like") ? e.target : e.target.closest(".portfolio__content__card__legend__like");
            const heart = Array.from(zoneToClick.children).find(el => el.classList.contains("portfolio__content__card__legend__like__empty"));
            const likesVue = zoneToClick.querySelector(".portfolio__content__card__legend__like__cunt");
            const mediaId = zoneToClick.getAttribute("data-media-ID");
            personnalMedias = personnalMedias.map(media => {
                if (mediaId == media.id) {
                    if (media.liked == "far") {
                        media.likes++;
                        totalLikesFooter.innerText = personnalMedias.reduce((likes, media) => likes + media.likes, 0);
                        media.liked = "fas";
                        heart.setAttribute("data-prefix", "fas");
                    } else {
                        media.likes--;
                        totalLikesFooter.innerText = personnalMedias.reduce((likes, media) => likes + media.likes, 0);
                        media.liked = "far";
                        heart.setAttribute("data-prefix", "far");
                    }
                    likesVue.innerHTML = media.likes;
                }
                return media;
            })
        })
    })


    btnSelection(btnSelected, event => {
        btnActive = event.target.getAttribute("id");
        switch (btnActive) {
            case "date":
                personnalMedias.sort((a, b) => {
                    if (a.date > b.date) {
                        return -1;
                    } else if (a.date < b.date) {
                        return 1;
                    } else {
                        return 0
                    };
                });
                break
            case "title":
                personnalMedias.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    } else {
                        return 0
                    };
                });
                break
            case "pop":
                personnalMedias.sort((a, b) => {
                    if (a.likes > b.likes) {
                        return -1;
                    } else if (a.likes < b.likes) {
                        return 1;
                    } else {
                        return 0
                    };
                });
                break
            default:
                personnalMedias.sort((a, b) => {
                    if (a.likes > b.likes) {
                        return -1;
                    } else if (a.likes < b.likes) {
                        return 1;
                    } else {
                        return 0
                    };
                });
                break
        }


        getPhotographerPortfolio(personnalMedias);


        Array.from(likeZones).forEach(likeZone => {
            likeZone.addEventListener("click", (e) => {
                const zoneToClick = e.target.classList.contains("portfolio__content__card__legend__like") ? e.target : e.target.closest(".portfolio__content__card__legend__like");
                const heart = Array.from(zoneToClick.children).find(el => el.classList.contains("portfolio__content__card__legend__like__empty"));
                const likesVue = zoneToClick.querySelector(".portfolio__content__card__legend__like__cunt");
                const mediaId = zoneToClick.getAttribute("data-media-ID");
                personnalMedias = personnalMedias.map(media => {
                    if (mediaId == media.id) {
                        if (media.liked == "far") {
                            media.likes++;
                            totalLikesFooter.innerText = personnalMedias.reduce((likes, media) => likes + media.likes, 0);
                            media.liked = "fas";
                            heart.setAttribute("data-prefix", "fas");
                        } else {
                            media.likes--;
                            totalLikesFooter.innerText = personnalMedias.reduce((likes, media) => likes + media.likes, 0);
                            media.liked = "far";
                            heart.setAttribute("data-prefix", "far");
                        }
                        likesVue.innerHTML = media.likes;
                    }
                    return media;
                })
            })
        })
    });
};

const init = async () => {
    photographers = await getPhotographersData();
    medias = await getMediasData();
    getPhotographerCard();
    getPhotographerMedias();
};

init();