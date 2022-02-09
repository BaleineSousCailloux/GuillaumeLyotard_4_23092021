const mediaPortfolioFactory = (portfolio) => {
    getMediaCard = () => {
        const mediaCard = document.createElement("article");
        mediaCard.classList.add("portfolio__content__card");
        if (videoName) {
            mediaCard.innerHTML = `
            <video class="portfolio__content__card__media" data-media-id="${portfolio.id}" tabindex="12" aria-label="${portfolio.alt}, ouvrir en pleine page">
                <source src="../public/images/Photos/${surname}/${portfolio.video}" type="video/mp4">
            </video>
            <span class="portfolio__content__card__media__icon fa-solid fa-video"></span>
            <div class="portfolio__content__card__legend">
                <p class="portfolio__content__card__legend__title" tabindex="12" lang="en" aria-label="${portfolio.title}">${portfolio.title}</p>
                <div class="portfolio__content__card__legend__like" data-like-id="${portfolio.id}" tabindex="12" aria-label="mentions j'aime, zone cliquable">
                    <span class="portfolio__content__card__legend__like__cunt" aria-label="nombre de j'aime">${portfolio.likes}</span>
                    <span class="portfolio__content__card__legend__like__empty ${portfolio.liked} fa-heart" aria-label="icone coeur"></span>
                </div>
            </div>
            `;
        } else {
            mediaCard.innerHTML = `
        <img class="portfolio__content__card__media" data-media-id="${portfolio.id}" src="../public/images/Photos/${surname}/${portfolio.image}"
         tabindex="12" alt="${portfolio.alt}" aria-label="${portfolio.alt}, ouvrir en pleine page"/>
        <div class="portfolio__content__card__legend">
            <p class="portfolio__content__card__legend__title" tabindex="12" lang="en" aria-label="${portfolio.title}">${portfolio.title}</p>
            <div class="portfolio__content__card__legend__like" data-like-id="${portfolio.id}" tabindex="12" aria-label="mentions j'aime, zone cliquable">
                <span class="portfolio__content__card__legend__like__cunt" aria-label="nombre de j'aime">${portfolio.likes}</span>
                <span class="portfolio__content__card__legend__like__empty ${portfolio.liked} fa-heart" aria-label="icone coeur"></span>
            </div>
        </div>
        `;
        }
        return mediaCard
    }
    return this;
}
