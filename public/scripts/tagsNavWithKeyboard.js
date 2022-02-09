//// Tri des photographes avec la liste de tags AU CLAVIER //////
this.enterTagsNav = (e, tagsContainer) => {
    const tags = tagsContainer.querySelectorAll(".tag");
    const firstTag = tags[0]
    const lastTag = tags[tags.length - 1];
    //// entrer et naviguer dans la liste de tags OK
    if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        tags.forEach(tag => {
            tag.setAttribute("tabindex", "0");
            tag.addEventListener("keydown", active => {
                if (active.keyCode === 13 || active.keyCode === 32) {
                    active.preventDefault();
                    tag.click();
                }
            })
        })
        firstTag.focus(); ///ok
        /// revient au premier tag OK
        lastTag.addEventListener("keydown", event => {
            if (event.keyCode === 9 && !event.shiftKey) {
                event.preventDefault();
                firstTag.focus();
            }
        })
        //// en cas de back-tab, doit aller au dernier tag   OK
        firstTag.addEventListener("keydown", backEvent => {

            if (backEvent.keyCode === 9 && backEvent.shiftKey) {
                backEvent.preventDefault();
                lastTag.focus();
            }
        })
    }
    //  sortie de la selection de tag avec ESC  OK
    if (e.keyCode === 27 && tagsContainer.contains(document.activeElement)) {

        tagsContainer.focus();
    }
}