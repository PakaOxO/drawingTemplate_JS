let colorPallete = [
    "#fff",
    "#000",
    "#A68DAD",
    "#1C6DD0",
    "#FED1EF",
    "#FF6363",
    "#FFAB76"
];

let isPainting = false;


/*
    HTML Object
*/
const canvas = document.querySelector("#canvas");
const range = document.querySelector("#range");
const box_palette = document.querySelector("#palette");


/*
    Other Object
*/
const ctx = canvas.getContext("2d");


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
    사용자의 마우스 동작을 확인하여 특정 기능을 수행하는 함수들
*/
function onMouseMove(event) {
    const posX = event.offsetX;
    const posY = event.offsetY;

    if (!isPainting) {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
    } else {
        ctx.lineTo(posX, posY);
        ctx.stroke();
    }
}

function startPainting(event) {
    isPainting = true;
}

function endPainting(event) {
    isPainting = false;
}


/*
    init 함수
*/
function init() {
    addColorsInController();

    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = colorPallete[1];
        ctx.lineWidth = range.range;

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", endPainting);
        canvas.addEventListener("mouseleave", endPainting);
    }
}

init();