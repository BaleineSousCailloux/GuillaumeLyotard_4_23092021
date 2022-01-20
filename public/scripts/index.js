let photographers = [];
let medias = [];
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

const headerTagFactory = (headerTag) => {
    getHeaderTag = () => {
        const newHeaderTag = document.createElement("span");
        newHeaderTag.classList.add("tag");
        newHeaderTag.classList.add(headerTag)
        newHeaderTag.setAttribute("data-tag", headerTag);
        newHeaderTag.innerHTML = `#${headerTag}`;
        return newHeaderTag;
    }
    return this;
}





const indexCardFactory = (indexCard) => {
    getCard = () => {
        const newPhotographer = document.createElement("article");
        newPhotographer.classList.add("photographer");
        newPhotographer.innerHTML = `
        <a href="./pages/photographe.html?id=${indexCard.id}" class="photographer__card">
            <img class="photographer__card__img" src="./public/images/Photos/Photographers ID Photos/${indexCard.portrait}" />
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
            const newTag = document.createElement("span");
            newTag.classList.add("photographer__legend__tags__tag");

            newTag.innerHTML = `#${tag}`;
            newPhotographer.getElementsByClassName("photographer__legend__tags")[0].appendChild(newTag);
        })
        return newPhotographer;
    }
    return this;
}

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


const getHeaderTagsList = (listTags, tagClick) => {
    listTags.forEach(tag => {
        const instance = headerTagFactory(tag);
        const newHeaderTag = instance.getHeaderTag();
        document.getElementById("tagsList").appendChild(newHeaderTag);
        newHeaderTag.addEventListener("click", tagClick)

    });


};

const init = async () => {
    photographers = await getPhotographersData();
    const tagsList = getTagsListData(photographers);
    let tagSelected = null;
    getHeaderTagsList(tagsList, event => {
        const clickedTag = event.target.getAttribute("data-tag");
        let tagsSelected = document.getElementsByClassName("tag");
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