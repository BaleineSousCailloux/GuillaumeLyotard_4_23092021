this.lightboxFactory = (light, directory) => {
    this.getLightboxVue = () => {
        const mediaContainerInLightbox = document.createElement("div");
        mediaContainerInLightbox.classList.add("lightbox__content__container__media");
        if (light.video) {
            mediaContainerInLightbox.innerHTML = `
            <video class="lightbox__content__container__media__insert" data-media-id="${light.id}" controls autoplay tabindex="1" aria-label="${light.alt}">
                <source src="../public/images/Photos/${directory}/${light.video}" type="video/mp4">
            </video>
            <p class="lightbox__content__container__media__title" tabindex="1" lang="en" aria-label="titre du média">${light.title}</p>
          `;
        } else {
            mediaContainerInLightbox.innerHTML = `
            <img class="lightbox__content__container__media__insert" data-media-id="${light.id}" src="../public/images/Photos/${directory}/${light.image}" 
            tabindex="1" alt="${light.alt}" aria-label="${light.alt}"/>
            <p class="lightbox__content__container__media__title" tabindex="1" lang="en" aria-label="titre du média">${light.title}</p>
          `;
        }
        return mediaContainerInLightbox;
    }
    return this;
};