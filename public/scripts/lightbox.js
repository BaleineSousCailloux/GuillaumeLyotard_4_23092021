const lightboxVue = () => {

  // DOM Elements
  const openLightbox = document.querySelectorAll(".portfolio__content__card__img");
  const lightbox = document.querySelector("#lightbox");
  const closeLightbox = document.querySelector("#closeBox");


  // open Lightbox event (img click)
  openLightbox.forEach(img => img.addEventListener("click", launchLightbox));


  // open lightbox fonction
  function launchLightbox() {
    lightbox.style.display = "flex";
  };


  // close lightbox event
  closeLightbox.addEventListener("click", quitLightbox);


  // close lightbox function
  function quitLightbox() {
    lightbox.style.display = "none";
  };

};

const lightboxFactory = (light) => {
  getLightboxVue = () => {
    const mediaInLightbox = document.createElement("div");
    mediaInLightbox.classList.add("lightbox__content");
    if (videoName) {
      mediaInLightbox.innerHTML = `
          <span class="lightbox__content__icon--left fa-solid fa-angle-left"></span>
          <div class="lightbox__content__container">
              <video class="portfolio__content__container__video" control>
                  <source src="../public/images/Photos/${surname}/${light.video}" type="video/mp4">
              </video>
              <p class="lightbox__content__container__title">${light.title}</p>
          </div>
          <span class="lightbox__content__icon--right fa-solid fa-angle-right"></span>
          <div class="lightbox__content__icon__close" id="closeBox">
              <span class="lightbox__content__icon__close__icon fas fa-times"></span>
          </div>
          `;
    } else {
      mediaInLightbox.innerHTML = `
          <span class="lightbox__content__icon--left fa-solid fa-angle-left"></span>
          <div class="lightbox__content__container">
              <img class="lightbox__content__container__img" src="../public/images/Photos/${surname}/${light.image}" />
              <p class="lightbox__content__container__title">${light.title}</p>
          </div>
          <span class="lightbox__content__icon--right fa-solid fa-angle-right"></span>
          <div class="lightbox__content__icon__close" id="closeBox">
              <span class="lightbox__content__icon__close__icon fas fa-times"></span>
          </div>
          `;
    }
    return mediaInLightbox
  }
  return this;
};
