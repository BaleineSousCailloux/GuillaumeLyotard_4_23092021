this.headerTagFactory = (headerTag) => {
    this.getHeaderTag = () => {
        const newHeaderTag = document.createElement("span");
        newHeaderTag.classList.add("tag");
        newHeaderTag.classList.add(headerTag)
        newHeaderTag.setAttribute("data-tag", headerTag);
        newHeaderTag.setAttribute("aria-label", "tag")
        newHeaderTag.innerHTML = `#${headerTag}`;
        return newHeaderTag;
    }
    return this;
}