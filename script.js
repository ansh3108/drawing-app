const artboard = document.getElementById("artboard");
const body = document.querySelector('body');
artboard.height = window.innerHeight;
artboard.width = window.innerWidth;
let selectedColor = '';
let brushThickness = 5;
let prevX = null;
let prevY = null;
let isDrawing = false;



body.style.backgroundColor = "#FFFFFF";
const colorPicker = document.getElementById("colorPicker");



colorPicker.addEventListener("input", () => {
  selectedColor = colorPicker.value;
  body.style.backgroundColor = selectedColor;
}, false);


const ctx = artboard.getContext("2d");
ctx.lineWidth = brushThickness;


document.getElementById("brushSize").oninput = function() {
    isDrawing = null;
    brushThickness = document.getElementById("brushSize").value;
    document.getElementById("brushOutput").innerHTML = brushThickness;
    ctx.lineWidth = brushThickness;
};


let colors = document.querySelectorAll(".color");
colors = Array.from(colors);
colors.forEach(color => {
    color.addEventListener("click", () => {
        ctx.strokeStyle = color.dataset.color;
    });
});


let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, artboard.width, artboard.height);
});


let downloadBtn = document.querySelector(".download");
downloadBtn.addEventListener("click", () => {
    let dataURL = artboard.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png";
    link.click();
});


window.addEventListener("mousedown", () => isDrawing = true);
window.addEventListener("mouseup", () => isDrawing = false);

window.addEventListener("mousemove", (e) => {
    if (prevX == null || prevY == null || !isDrawing) {
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;
});
