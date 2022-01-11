/*
    HTML Objects
*/
const canvas = document.querySelector("#canvas");
const input_range = document.querySelector("#range");
const div_mode = document.querySelector("#mode");
const div_palette = document.querySelector("#palette");


/*
    Other Objects
*/
const ctx = canvas.getContext("2d");


/*
    Variables
*/
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
let mode = "paint";

const CLASS_SELECTED = "selected";
let CANVAS_WIDTH = canvas.offsetWidth;
let CANVAS_HEIGHT = canvas.offsetHeight;


/*
    Normal Functions
*/
function onWindowResize() {
    CANVAS_WIDTH = canvas.offsetWidth;
    CANVAS_HEIGHT = canvas.offsetHeight;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
}


/*
    Controller 관련 함수들
*/
function changeBrushWidth(event) {
    ctx.lineWidth = event.target.value;
}

function changeMode() {
    if (mode == "paint") {
        mode = "fill";
        div_mode.value = "Fill";
    } else if (mode == "fill") {
        mode = "paint";
        div_mode.value = "Paint";
    }
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

    const thisColor = this.style.backgroundColor;
    ctx.strokeStyle = thisColor;
    ctx.fillStyle = thisColor;
}


/*
    Canvas 관련 함수들
*/
function onMouseMove(event) {
    const posX = event.offsetX;
    const posY = event.offsetY;

    if (!isPainting) {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
    } else {
        if (mode == "paint") {
            ctx.lineTo(posX, posY);
            ctx.stroke();
        }
    }
}

function startPainting() {
    isPainting = true;
}

function endPainting() {
    isPainting = false;
}

function fillingCanvas() {
    if (mode == "fill") {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}


/*
    init 함수
*/
function init() {
    window.addEventListener("resize", onWindowResize);

    if (input_range) {
        input_range.addEventListener("change", changeBrushWidth);
    }
    addColorsInController();

    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = colorPallete[0];
        ctx.lineWidth = input_range.range;
        ctx.fillStyle = colorPallete[0];

        div_mode.addEventListener("click", changeMode);

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("touchmove", onMouseMove);

        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("touchstart", startPainting);

        canvas.addEventListener("mouseup", endPainting);
        canvas.addEventListener("touchend", endPainting)

        canvas.addEventListener("mouseleave", endPainting);
        canvas.addEventListener("touchcancel", endPainting);

        canvas.addEventListener("click", fillingCanvas);
    }
}

init();