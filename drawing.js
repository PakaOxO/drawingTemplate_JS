const CLASS_SELECTED = "selected";

let colorPallete = [
    "#000",
    "#fff",
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
const input_range = document.querySelector("#range");
const div_palette = document.querySelector("#palette");


/*
    Other Object
*/
const ctx = canvas.getContext("2d");


/*
    Controller 관련 함수들
*/
function changeBrushWidth(event) {
    ctx.lineWidth = event.target.value;
}

function addColorsInController() {
    colorPallete.forEach((color) => {
        const newColorTag = document.createElement("div");
        newColorTag.classList.add("color");
        newColorTag.style.backgroundColor = color;
        newColorTag.addEventListener("click", changeColor);

        div_palette.appendChild(newColorTag);
    });
}

function changeColor(event) {
    const paletteColors = document.getElementsByClassName("color");
    // const paletteColors = document.querySelectorAll(".color");
    Array.from(paletteColors).forEach(color => color.classList.remove(CLASS_SELECTED));
    // paletteColors.forEach(color => color.classList.remove(CLASS_SELECTED));

    event.target.classList.add(CLASS_SELECTED);
    ctx.strokeStyle = this.style.backgroundColor;
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

function startPainting() {
    isPainting = true;
}

function endPainting() {
    isPainting = false;
}


/*
    init 함수
*/
function init() {
    if (input_range) {
        input_range.addEventListener("change", changeBrushWidth);
    }
    addColorsInController();

    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = colorPallete[0];
        ctx.lineWidth = input_range.range;

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", endPainting);
        canvas.addEventListener("mouseleave", endPainting);
    }
}

init();