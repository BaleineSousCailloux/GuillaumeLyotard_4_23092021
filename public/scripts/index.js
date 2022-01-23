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


const getHeaderTagsList = (listTags, tagClick) => {
    listTags.forEach(tag => {
        const instance = headerTagFactory(tag);
        const newHeaderTag = instance.getHeaderTag();
        document.getElementById("tagsList").appendChild(newHeaderTag);
        newHeaderTag.addEventListener("click", tagClick)

    });


};

const getPhotographerCards = (photographers, tagSelected) => {
    const filteredPhotographers = photographers.filter(photographer => {
        return !tagSelected || photographer.tags.includes(tagSelected);
    })
    const container = document.getElementById("photographers");
    container.innerHTML = "";
    filteredPhotographers.forEach(photographer => {
        const instance = indexCardFactory(photographer);
        const newCard = instance.getCard();
        container.appendChild(newCard);
        return photographer;
    });

};

const init = async () => {
    const photographers = await getPhotographersData();
    const tagsList = getTagsListData(photographers);
    let tagSelected = null;
    getHeaderTagsList(tagsList, event => {
        const clickedTag = event.target.getAttribute("data-tag");
        if (clickedTag == tagSelected) {
            // permet de revenir à la liste complète des photographes en cliquant à nouveau sur le tag actif
            tagSelected = null;
            event.target.removeAttribute("id");
        } else {
            tagSelected = clickedTag;
            //la sélection d'un tag annule un éventuel tag déjà sélectionné
            tagsList.forEach(tag => {
                const unselect = document.getElementsByClassName(tag);
                unselect[0].removeAttribute("id");
            });
            event.target.setAttribute("id", "tag-selected");

        }
        getPhotographerCards(photographers, tagSelected);
    });
    getPhotographerCards(photographers, tagSelected)
}

init();