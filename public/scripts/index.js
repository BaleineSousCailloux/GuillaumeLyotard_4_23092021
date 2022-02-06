let listTags = [];
let tagSelected = 0;
let tagsZoneDom = document.getElementById("tagsList");
let tagsPhotographerDom = document.querySelector(".photographer__legend__tags");

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




const getHeaderTagsList = (listTags) => {
    listTags.forEach(tag => {
        const instance = headerTagFactory(tag);
        const newHeaderTag = instance.getHeaderTag();
        tagsZoneDom.appendChild(newHeaderTag);

        newHeaderTag.addEventListener("click", e => {
            console.log(e.target);
            if (e.target.id == "tag-selected") {
                document.location.href = "index.html";
                document.querySelector("h1").focus();
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
    if (tagSelected !== null) {
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
        }
    });

    getPhotographerCards(photographers, tagUrl);

    tagsZoneDom = document.getElementById("tagsList");
    tagsPhotographerDom = document.querySelector(".photographer__legend__tags");

    tagsZoneDom.addEventListener("keydown", e => {
        enterTagsNav(e, tagsZoneDom);
    });
    tagsPhotographerDom.addEventListener("keydown", e => {
        enterTagsNav(e, tagsPhotographerDom);
    });
}

init();