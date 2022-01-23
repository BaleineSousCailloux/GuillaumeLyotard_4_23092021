const lightboxVue = (medias) => {

  // DOM Elements
  const openLightbox = document.querySelectorAll(".portfolio__content__card__media");
  const lightbox = document.querySelector("#lightbox");
  const closeLightbox = document.querySelector("#closeBox");
  const mediaInLightbox = document.getElementById("lightbox-container");
  const leftArrow = document.querySelector(".fa-angle-left");
  const rightArrow = document.querySelector(".fa-angle-right");
  let domInsertMediaId = 0;
  let indexOfMediaVue;




  // open Lightbox event (img click)
  openLightbox.forEach(mediaClicked => {
    mediaClicked.addEventListener("click", event => {
      mediaId = event.target.getAttribute("media-ID");
      medias.forEach(media => {
        if (media.id == mediaId) {
          getLightbox(media, mediaInLightbox);
        }


      });
      launchLightbox();
    })
  });
  // navigation in lightbox
  function navigate() {
    indexOfMediaVue = medias.findIndex((element) => element.id == domInsertMediaId);
    console.log(medias.length)
    leftArrow.addEventListener("click", () => {
      if (indexOfMediaVue !== -1) {
        indexOfMediaVue--;
        console.log(indexOfMediaVue);
        mediaInLightbox.innerHTML = "";
        getLightbox(medias[indexOfMediaVue], mediaInLightbox);
      }
    })
    rightArrow.addEventListener("click", () => {
      if (indexOfMediaVue !== -1) {
        indexOfMediaVue++;
        console.log(indexOfMediaVue);
        mediaInLightbox.innerHTML = "";
        getLightbox(medias[indexOfMediaVue], mediaInLightbox);
      }
    })
  };

  // open lightbox fonction
  function launchLightbox() {
    lightbox.style.display = "flex";
    navigate();
  };


  // close lightbox event
  closeLightbox.addEventListener("click", quitLightbox);


  // close lightbox function
  function quitLightbox() {
    lightbox.style.display = "none";
    document.getElementById("lightbox-container").innerHTML = ``;

  };

  const lightboxFactory = (light) => {
    getLightboxVue = () => {
      const mediaContainerInLightbox = document.createElement("div");
      mediaContainerInLightbox.classList.add("lightbox__content__container__media");
      if (isVideo) {
        mediaContainerInLightbox.innerHTML = `
            <video class="lightbox__content__container__media__insert" media-ID="${light.id}" controls autoplay>
                <source src="../public/images/Photos/${surname}/${light.video}" type="video/mp4">
            </video>
            <p class="lightbox__content__container__media__title">${light.title}</p>
          `;
      } else {
        mediaContainerInLightbox.innerHTML = `
            <img class="lightbox__content__container__media__insert" media-ID="${light.id}" src="../public/images/Photos/${surname}/${light.image}" />
            <p class="lightbox__content__container__media__title">${light.title}</p>
          `;
      }
      return mediaContainerInLightbox;
    }
    return this;
  };


  const getLightbox = (mediaSelected, domPlace) => {
    isVideo = mediaSelected.video;
    const temp = lightboxFactory(mediaSelected);
    const newLightboxVue = temp.getLightboxVue();
    domPlace.appendChild(newLightboxVue);
    domInsertMediaId = newLightboxVue.querySelector(".lightbox__content__container__media__insert").getAttribute("media-ID");
    return domInsertMediaId;
  };



};

