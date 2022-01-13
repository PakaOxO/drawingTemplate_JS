/*
    HTML Objects
*/
const canvas = document.querySelector("#canvas");
const element_canvas = canvas.getBoundingClientRect();
const input_range = document.querySelector("#range");
const btn_mode = document.querySelector("#mode");
const btn_save = document.querySelector("#save");
const btn_clear = document.querySelector("#clear");
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
        btn_mode.value = "Fill";
    } else if (mode == "fill") {
        mode = "paint";
        btn_mode.value = "Paint";
    }
}

function saveToImage() {
    const imageUrl = canvas.toDataURL();
    const link = document.createElement("a");
    const today = new Date();

    link.href = imageUrl;
    link.download = "Canvas_" + today.getFullYear().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
    link.click();
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

function clearCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}


/*
    Canvas 관련 함수들
*/
function onMouseMove(event) {
    event.preventDefault();
    const posX = event.offsetX;
    const posY = event.offsetY;

    if (!isPainting) {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
    } else {
        if (mode == "paint") {
            ctx.lineTo(posX, posY);
            ctx.stroke();
        } else if (mode == "erase") {
            ctx.globalCompotieOperation = "destination-out";
        }
    }
}

function startPainting(event) {
    if (event.button != 0) return;
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
    모바일 전용 Canvas 함수
*/
function onTouchMove(event) {
    event.preventDefault();
    const posX = event.changedTouches[0].screenX;
    const posY = event.changedTouches[0].screenY;

    ctx.lineTo(posX, posY);
    ctx.stroke();
}

function startTouching(event) {

    const posX = event.changedTouches[0].screenX;
    const posY = event.changedTouches[0].screenY;

    if (mode == "paint") {
        ctx.beginPath();
        ctx.moveTo(posX, posY);
    } else if (mode == "fill") {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } else if (mode == "erase") {
        ctx.globalCompotieOperation = "destination-out";
    }
}

function endTouching(event) {
    event.preventDefault();
    ctx.closePath();
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
    const firstColor = document.getElementsByClassName("color")[0];
    if (firstColor) {
        firstColor.classList.add(CLASS_SELECTED);
    }


    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.strokeStyle = colorPallete[0];
        ctx.lineWidth = input_range.range;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        btn_mode.addEventListener("click", changeMode);
        btn_save.addEventListener("click", saveToImage);
        btn_clear.addEventListener("click", clearCanvas);

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("touchmove", onTouchMove, false);

        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("touchstart", startTouching, false);

        canvas.addEventListener("mouseup", endPainting);
        canvas.addEventListener("touchend", endTouching, false);

        canvas.addEventListener("mouseleave", endPainting);

        canvas.addEventListener("click", fillingCanvas);

        canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    }
}

init();