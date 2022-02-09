// DOM elements
const shortcut = document.getElementById("shortcut");

// visibility delay
function visibilityDelay() {
    shortcut.style.top = "20px";
    setTimeout(closeShortcut, 6000);
}
function closeShortcut() {
    shortcut.style.top = "-200px";
}

// Scroll down event
window.addEventListener("scroll", () => {
    visibilityDelay()
})