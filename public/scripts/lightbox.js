this.lightboxVue = (medias) => {

  // DOM Elements
  const openLightbox = document.querySelectorAll(".portfolio__content__card__media");
  const lightbox = document.querySelector("#lightbox");
  const closeLightbox = document.querySelector("#closeBox");
  const mediaInLightbox = document.getElementById("lightbox-container");
  const leftArrow = document.querySelector(".fa-angle-left");
  const rightArrow = document.querySelector(".fa-angle-right");
  let domInsertMediaId = 0;
  let indexOfMediaVue = -1;
  let lastMediaId = 29;
  let photographe = document.querySelector(".photographer__card__contact__name").innerHTML;


  // open Lightbox event (img click)
  openLightbox.forEach(mediaClicked => {
    mediaClicked.addEventListener("click", event => {
      let mediaId = event.target.getAttribute("data-media-id");
      medias.forEach(media => {
        if (media.id == mediaId) {
          getLightbox(media, mediaInLightbox, photographe);
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
    })
  })


  // navigation in lightbox
  function navigate() {
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
    })
  }


  const rightAction = () => {
    if (indexOfMediaVue > -1 && indexOfMediaVue < medias.length - 1) {
      indexOfMediaVue++;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[indexOfMediaVue], mediaInLightbox, photographe);
    } else if (indexOfMediaVue == medias.length - 1) {
      indexOfMediaVue = 0;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[0], mediaInLightbox, photographe);
    }
  }

  const leftAction = () => {
    if (indexOfMediaVue > 0) {
      indexOfMediaVue--;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[indexOfMediaVue], mediaInLightbox, photographe);
    } else if (indexOfMediaVue == 0) {
      indexOfMediaVue = medias.length - 1;
      mediaInLightbox.innerHTML = "";
      getLightbox(medias[medias.length - 1], mediaInLightbox, photographe);
    }
  }


  // open lightbox fonction
  function launchLightbox() {
    lightbox.style.display = "flex";
    lightbox.focus();

  }


  // close lightbox event
  closeLightbox.addEventListener("click", () => {
    lastMediaId = document.querySelector(".lightbox__content__container__media__insert").getAttribute("data-media-id");
    quitLightbox(lastMediaId);
  })


  // close lightbox function
  function quitLightbox(lastMedia) {
    lightbox.style.display = "none";
    //const lastMediaId = document.querySelector(".lightbox__content__container__media__insert").getAttribute("data-media-id");
    document.getElementById("lightbox-container").innerHTML = ``;
    openLightbox.forEach(media => {
      let mediaTarget = media.getAttribute("data-media-id");
      if (mediaTarget == lastMedia) {
        media.focus();
      }
    })
  }


  const getLightbox = (mediaSelected, domPlace, photographerIdentity) => {
    let self = this;
    const temp = self.lightboxFactory(mediaSelected, photographerIdentity);
    const newLightboxVue = temp.self.getLightboxVue();
    domPlace.appendChild(newLightboxVue);
    domInsertMediaId = newLightboxVue.querySelector(".lightbox__content__container__media__insert").getAttribute("data-media-id");
    return domInsertMediaId;
  };
};

