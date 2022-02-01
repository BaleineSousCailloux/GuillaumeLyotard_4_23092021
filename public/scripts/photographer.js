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

const btnVue = document.getElementById("btn-vue");
const btnSelectMenu = document.getElementById("btn-select-menu");
let option1Btn = document.querySelector(".portfolio__menu__btn--2__option-1-vue");
let option2Btn = document.querySelector(".portfolio__menu__btn--2__option-2");
let option3Btn = document.querySelector(".portfolio__menu__btn--2__option-3");
let btnSelected = [];
btnSelected.push(option1Btn, option2Btn, option3Btn);
console.log(btnSelected);

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
    let photographerMedias = medias.filter(media => media.photographerId == urlId);
    personnalMedias = photographerMedias.map(media => ({ ...media, liked: "far" }));
    ////////////////////////////////////////////////////////////////////////////////////
    /////     CTRL IF LOCAL STORAGE     ////////////////////////////////////////////////
    personnalMedias = personnalMedias.map(media => {
        if (localStorage.getItem(`${media.id}_heart`) !== null) {
            media.liked = localStorage.getItem(`${media.id}_heart`);
            media.likes = parseInt(localStorage.getItem(`${media.id}_likes`));
        }
        return media;
    });
    /////////////////////////////////////////////////////////////////////////////////////
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
    console.log(personnalMedias.reduce((likes, media) => media.likes + likes, 0));
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
                        media.liked = "fas";
                        heart.setAttribute("data-prefix", "fas");
                    } else {
                        media.likes--;
                        media.liked = "far";
                        heart.setAttribute("data-prefix", "far");
                    }
                    likesVue.innerHTML = media.likes;
                    totalLikesFooter.innerText = personnalMedias.reduce((likes, media) => likes + media.likes, 0);
                    ////////////////////////////////////////////////////////////
                    /////////   ADD TO LOCAL STORAGE   /////////////////////////
                    localStorage.setItem(`${media.id}_likes`, `${media.likes}`);
                    localStorage.setItem(`${media.id}_heart`, `${media.liked}`);
                    //console.log(localStorage.getItem(`${media.id}_heart`));
                    //console.log(localStorage.getItem(`${media.id}_likes`));
                    ////////////////////////////////////////////////////////////
                }
                return media;
            })
        })
    })

    btnSelection(btnSelected, event => {
        event.preventDefault();
        btnActive = event.target.getAttribute("data-option");
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
                btnVue.innerText = "Date";
                option1Btn.setAttribute("data-option", "date");
                option1Btn.innerText = "Date";
                option2Btn.setAttribute("data-option", "pop");
                option2Btn.innerText = "Popularité";
                option3Btn.setAttribute("data-option", "title");
                option3Btn.innerText = "Titre";
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
                btnVue.innerText = "Titre";
                option1Btn.setAttribute("data-option", "title");
                option1Btn.innerText = "Titre";
                option2Btn.setAttribute("data-option", "pop");
                option2Btn.innerText = "Popularité";
                option3Btn.setAttribute("data-option", "date");
                option3Btn.innerText = "Date";
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
                btnVue.innerText = "Popularité";
                option1Btn.setAttribute("data-option", "pop");
                option1Btn.innerText = "Popularité";
                option2Btn.setAttribute("data-option", "date");
                option2Btn.innerText = "Date";
                option3Btn.setAttribute("data-option", "title");
                option3Btn.innerText = "Titre";
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
                btnVue.innerText = "Popularité";
                option1Btn.setAttribute("data-option", "pop");
                option1Btn.innerText = "Popularité";
                option2Btn.setAttribute("data-option", "date");
                option2Btn.innerText = "Date";
                option3Btn.setAttribute("data-option", "title");
                option3Btn.innerText = "Titre";
                break
        };

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
                            media.liked = "fas";
                            heart.setAttribute("data-prefix", "fas");
                        } else {
                            media.likes--;
                            media.liked = "far";
                            heart.setAttribute("data-prefix", "far");
                        }
                        likesVue.innerHTML = media.likes;
                        totalLikesFooter.innerText = personnalMedias.reduce((likes, media) => likes + media.likes, 0);
                        ////////////////////////////////////////////////////////////
                        /////////   ADD TO LOCAL STORAGE   /////////////////////////
                        localStorage.setItem(`${media.id}_likes`, `${media.likes}`);
                        localStorage.setItem(`${media.id}_heart`, `${media.liked}`);
                        //console.log(localStorage.getItem(`${media.id}_heart`));
                        //console.log(localStorage.getItem(`${media.id}_likes`));
                        ////////////////////////////////////////////////////////////
                    }
                    return media;
                })
            })
        })
    });
};

const init = async () => {
    //localStorage.clear();
    photographers = await getPhotographersData();
    medias = await getMediasData();
    getPhotographerCard();
    getPhotographerMedias();
};

init();