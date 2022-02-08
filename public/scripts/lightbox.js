const lightboxVue = (medias) => {

  // DOM Elements
  const openLightbox = document.querySelectorAll(".portfolio__content__card__media");
  const lightbox = document.querySelector("#lightbox");
  const closeLightbox = document.querySelector("#closeBox");
  const mediaInLightbox = document.getElementById("lightbox-container");
  const leftArrow = document.querySelector(".fa-angle-left");
  const rightArrow = document.querySelector(".fa-angle-right");
  let domInsertMediaId = 0;
  let indexOfMediaVue = -1;
  console.log(openLightbox);


  // open Lightbox event (img click)
  openLightbox.forEach(mediaClicked => {
    mediaClicked.addEventListener("click", event => {
      let mediaId = event.target.getAttribute("media-ID");
      medias.forEach(media => {
        if (media.id == mediaId) {
          getLightbox(media, mediaInLightbox);
          indexOfMediaVue = medias.findIndex((media) => media.id == domInsertMediaId);
        }
      });
      launchLightbox();
      navigate();
    })
    mediaClicked.addEventListener("keydown", enterEvent => {
      if (enterEvent.keyCode === 13 || enterEvent.keyCode === 32) {
        mediaClicked.click();
      }
    });
  });


  // navigation in lightbox
  function navigate() {
    console.log(medias.length);
    leftArrow.addEventListener("click", leftAction);
    rightArrow.addEventListener("click", rightAction);
    leftArrow.addEventListener("keydown", leftEvent => {
      if (leftEvent.keyCode === 13 || leftEvent.keyCode === 32) {
        leftAction();
      }
    })
    rightArrow.addEventListener("keydown", rightEvent => {
      if (rightEvent.keyCode === 13 || rightEvent.keyCode === 32) {
        rightAction();
      }
    })
    window.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") {
        leftAction();
      } else if (event.key === "ArrowRight") {
        rightAction()
      } else if (event.keyCode === 27 && lightbox.contains(document.activeElement)) {
        closeLightbox.click();
      }
    })
    closeLightbox.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.keyCode === 9 && closeLightbox.contains(document.activeElement)) {
        lightbox.focus();
      } else if (e.keyCode === 13 || e.keyCode === 32) {
        closeLightbox.click();
      }
    });
  };


  const rightAction = () => {
    if (indexOfMediaVue > -1 && indexOfMediaVue < medias.length - 1) {
      indexOfMediaVue++;
      console.log(indexOfMediaVue);
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[indexOfMediaVue], mediaInLightbox);
    } else if (indexOfMediaVue == medias.length - 1) {
      indexOfMediaVue = 0;
      console.log(indexOfMediaVue);
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[0], mediaInLightbox);
    }
  };

  const leftAction = () => {
    if (indexOfMediaVue > 0) {
      indexOfMediaVue--;
      console.log(indexOfMediaVue);
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[indexOfMediaVue], mediaInLightbox);
    } else if (indexOfMediaVue == 0) {
      indexOfMediaVue = medias.length - 1;
      console.log(indexOfMediaVue);
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[medias.length - 1], mediaInLightbox);
    }
  };


  // open lightbox fonction
  function launchLightbox() {
    lightbox.style.display = "flex";
    lightbox.focus();

  };


  // close lightbox event
  closeLightbox.addEventListener("click", quitLightbox);


  // close lightbox function
  function quitLightbox() {
    lightbox.style.display = "none";
    const lastMediaId = document.querySelector(".lightbox__content__container__media__insert").getAttribute("media-id");
    document.getElementById("lightbox-container").innerHTML = ``;
    openLightbox.forEach(media => {
      let mediaTarget = media.getAttribute("media-id");
      console.log(mediaTarget);
      console.log("last" + lastMediaId);
      if (mediaTarget == lastMediaId) {
        media.focus();
      }
    })
  };


  const lightboxFactory = (light) => {
    getLightboxVue = () => {
      const mediaContainerInLightbox = document.createElement("div");
      mediaContainerInLightbox.classList.add("lightbox__content__container__media");
      if (isVideo) {
        mediaContainerInLightbox.innerHTML = `
            <video class="lightbox__content__container__media__insert" media-ID="${light.id}" controls autoplay tabindex="1" aria-label="${light.alt}">
                <source src="../public/images/Photos/${surname}/${light.video}" type="video/mp4">
            </video>
            <p class="lightbox__content__container__media__title" tabindex="1" lang="en" aria-label="titre du média">${light.title}</p>
          `;
      } else {
        mediaContainerInLightbox.innerHTML = `
            <img class="lightbox__content__container__media__insert" media-ID="${light.id}" src="../public/images/Photos/${surname}/${light.image}" 
            tabindex="1" alt="${light.alt}" aria-label="${light.alt}"/>
            <p class="lightbox__content__container__media__title" tabindex="1" lang="en" aria-label="titre du média">${light.title}</p>
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

