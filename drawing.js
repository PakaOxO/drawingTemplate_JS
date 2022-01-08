let colorPallete = [
    "#fff",
    "#000",
    "#A68DAD",
    "#1C6DD0",
    "#FED1EF",
    "#FF6363",
    "#FFAB76"
];

const box_palette = document.querySelector("#palette");

/*
    colorPallete에 있는 Color 값들을 HTML내에 추가
*/
function addColorsInController() {
    colorPallete.forEach((color) => {
        const newColorTag = document.createElement("div");
        newColorTag.classList.add("color");
        newColorTag.style.backgroundColor = color;

        box_palette.appendChild(newColorTag);
    });
}

/*
    init 함수
*/
function init() {
    addColorsInController();
}

init();