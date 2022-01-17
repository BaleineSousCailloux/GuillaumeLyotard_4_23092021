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
const getMediasData = async () => {
    const data = await fetchData();
    return data.media;
}

const getTagsListData = async () => {
    photographers = await getPhotographersData();
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
        newHeaderTag.innerHTML = `#${headerTag}`;
        return newHeaderTag;
    }
    return this;
}
/*const selectTagFactory = (selectTag) => {
    pointerTag = document.getElementsByClassName("tag");
    pointerTag.addEventListener("click", () => {
        pointerTag.style.backgroundColor = "red";
        tagSelected = selectTag;
    })
    return tagSelected;
}
const tagsListSelect = async () => {
    tags = await getHeaderTagsList();
    tags.forEach(tag => {
        selectTagFactory(tag);
        console.log(tag);
    });
}*/

const getHeaderTagsList = async () => {
    listTags = await getTagsListData();
    getPhotographerCards();
    console.log(photographers);
    listTags.forEach(tag => {
        const instance = headerTagFactory(tag);
        const newHeaderTag = instance.getHeaderTag();
        document.getElementById("tagsList").appendChild(newHeaderTag);
        let tagSelected;

        // selection d'un tag de tri des photographes

        newHeaderTag.addEventListener("click", () => {
            tagSelected = newHeaderTag.innerText.slice(1);
            console.log(tagSelected);
            const section = document.getElementById("photographers");
            console.log(photographers);
            document.getElementById("main").removeChild(section);
            document.getElementById("main").innerHTML =
                `<section class="photographers" id="photographers">
            </section>`;
            photographers.forEach(photographer => {
                console.log(photographer)
                for (i = 0; i < photographer.tags.length; i++) {
                    if (tagSelected === photographer.tags[i]) {
                        const instance = indexCardFactory(photographer);
                        const newCard = instance.getCard();
                        document.getElementById("photographers").appendChild(newCard);
                    }

                }

            });

        });
        /*if (tagSelected == null) {
            newHeaderTag.style.color = "green";
            tagSelected = newHeaderTag.innerText;

        } else if (tagSelected !== null) {
            newHeaderTag.style.color = "#901c1c";
            tagSelected = null;
        }*/
        console.log(tagSelected);
        return tagSelected;
    });
    /////////////////////////////////////////////////////////

    //return newHeaderTag;


};



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
            newTag.classList.add(`${tag}`)
            newTag.innerHTML = `#${tag}`;
            newPhotographer.getElementsByClassName("photographer__legend__tags")[0].appendChild(newTag);
        })
        return newPhotographer;
    }
    return this;
}

const getPhotographerCards = async () => {
    photographers = await getPhotographersData();
    photographers.forEach(photographer => {
        const instance = indexCardFactory(photographer);
        const newCard = instance.getCard();
        document.getElementById("photographers").appendChild(newCard);
        return photographer;
    });
    /*listTags.addEventListener("click", () => {
        console.log(tagSelected);
        for (i = 0; i < photographer.tags.length; i++) {
            if (tagSelected == photographer.tags[i]) {
                document.getElementById("photographers").appendChild(newCard);
            } else {
                document.getElementById("photographers").appendChild(newCard);
            }
        }
    });*/

    // tri par tag indiqué manuellement ci-dessous
    //const tagSelected = "portrait";
    /*for (i = 0; i < photographer.tags.length; i++) {
        if (tagSelected !== 0 && tagSelected === photographer.tags[i]) {
            document.getElementById("photographers").appendChild(newCard);
        } else {
            document.getElementById("photographers").appendChild(newCard);
        }
    }*/
    //////////////////////////////////////////////////////////////


};
//getPhotographerCards();
getHeaderTagsList();