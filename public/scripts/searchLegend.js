// tags research legend

// DOM elements
const legendTags = document.getElementById("help");

// visibility delay
let visibility;
function visibilityDelay() {
    legendTags.style.top = "-10px";
    visibility = setTimeout(closeHelpLegend, 4000);
}
function closeHelpLegend() {
    legendTags.style.top = "-50px";
}

// Scroll down event
window.addEventListener("scroll", () => {
    visibilityDelay()
})