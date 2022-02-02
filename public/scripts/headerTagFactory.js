const headerTagFactory = (headerTag) => {
    getHeaderTag = () => {
        const newHeaderTag = document.createElement("span");
        newHeaderTag.classList.add("tag");
        newHeaderTag.classList.add(headerTag)
        newHeaderTag.setAttribute("data-tag", headerTag);
        newHeaderTag.setAttribute("tabindex", 2);
        newHeaderTag.innerHTML = `#${headerTag}`;
        return newHeaderTag;
    }
    return this;
}