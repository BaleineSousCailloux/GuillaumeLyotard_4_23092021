let listTags = [];
let tagSelected = 0;

const fetchData = async () => {
    const res = await fetch("./public/data/FishEyeData.json");
    const data = await res.json();
    return data;
};
const getPhotographersData = async () => {
    const data = await fetchData();
    return data.photographers;
}

// récupère les tags au sein du JSON et des tags des différents photographes
const getTagsListData = (photographers) => {
    photographers.forEach(photographer => {
        photographer.tags.forEach(tag => {
            if (!listTags.includes(tag)) {
                listTags.push(tag)
            };
        });
    });
    return listTags;
}


const tagsZoneDom = document.getElementById("tagsList");
const enterTagsNav = (e) => {
    const tagZoneDom = document.querySelectorAll(".tag");
    const firstTag = tagZoneDom[0]
    const lastTag = tagZoneDom[tagZoneDom.length - 1];
    //// entrer et naviguer dans la liste de tags OK
    if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        tagZoneDom.forEach(tag => {
            tag.setAttribute("tabindex", "4");
            tag.addEventListener("keydown", active => {
                if (active.keyCode === 13 || active.keyCode === 32) {
                    //active.preventDefault();
                    tag.click();
                    tagZoneDom.forEach(tag => {
                        tag.setAttribute("tabindex", "-1");
                    });
                    //document.querySelector("h1").focus();
                }
            })
        });
        firstTag.focus(); ///ok
        /// revient au premier tag OK
        lastTag.addEventListener("keydown", event => {
            if (event.keyCode === 9 && !event.shiftKey) {
                event.preventDefault();
                firstTag.focus();
            }
        });
        //// en cas de back-toolbar, doit aller au dernier tag   KO !
        firstTag.addEventListener("keydown", backEvent => {

            if (backEvent.keyCode === 9 && backEvent.shiftKey) {
                backEvent.preventDefault();
                lastTag.focus();
            }
        });
    };
    //  sortie de la selection de tag avec ESC  OK
    if (e.keyCode === 27 && tagsZoneDom.contains(document.activeElement)) {

        tagZoneDom.forEach(tag => {
            tag.setAttribute("tabindex", "-1");
        });
        tagsZoneDom.focus();
    }
    // passer directement à l'élément suivant, sans rentrer dans la selection de tag  OK
    if (tagsZoneDom.activeElement && e.keyCode === 9) {
        e.preventDefault();
        tagZoneDom.forEach(tag => {
            tag.setAttribute("tabindex", "-1");
        });
        document.querySelector("h1").focus();
    };
}


const getHeaderTagsList = (listTags) => {
    listTags.forEach(tag => {
        const instance = headerTagFactory(tag);
        const newHeaderTag = instance.getHeaderTag();
        tagsZoneDom.appendChild(newHeaderTag);

        newHeaderTag.addEventListener("click", e => {
            if (e.target.id == "tag-selected") {
                document.location.href = "index.html";
            } else {
                document.location.href = `index.html?tag=${e.target.getAttribute("data-tag")}`;
            }
        })
    });
};



const getPhotographerCards = (photographers, tagSelected) => {
    const filteredPhotographers = photographers.filter(photographer => {
        return !tagSelected || photographer.tags.includes(tagSelected);
    })
    if (tagSelected) {
        console.log(tagSelected);
        document.querySelector("h1").focus();
    }
    const container = document.getElementById("photographers");
    container.innerHTML = "";
    filteredPhotographers.forEach(photographer => {
        const instance = indexCardFactory(photographer);
        const newCard = instance.getCard();
        container.appendChild(newCard);
        const personnalTags = newCard.querySelectorAll(".photographer__legend__tags__tag");
        Array.from(personnalTags).forEach(personnalTag => {
            personnalTag.addEventListener("click", event => {
                document.location.href = `index.html?tag=${event.target.getAttribute("data-tag")}`
            });

        });
    });
};

const init = async () => {
    const photographers = await getPhotographersData();
    const tagsList = getTagsListData(photographers);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let tagUrl = urlParams.get("tag");
    getHeaderTagsList(tagsList);
    tagsList.forEach(tag => {
        if (tag == tagUrl) {
            let domCardTag = document.getElementsByClassName(tag)[0];
            if (domCardTag) {
                domCardTag.setAttribute("id", "tag-selected");
                domCardTag.setAttribute("aria-label", `le mot-clef ${tag} est sélectionné`);
            }
        } else {
            document.querySelector("h1").focus();
        }
    })

    getPhotographerCards(photographers, tagUrl);
    tagsZoneDom.addEventListener("keydown", enterTagsNav);
}

init();