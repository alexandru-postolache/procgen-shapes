const BASE_RECTANGLE_WIDTH = 50;
const BASE_RECTANGLE_HEIGHT = 100;
const SQUARE_DIMENSION = 60;
const MAXIMUM_FILL_DEVIATION = 5;
const MAXIMUM_SIZE_DEVIATION = 0.2;
const GAP_SPACE_PER_ROW = 20;
const GAP_SPACE_PER_COLUMN = 20;
const TRIANGLE_BASE_WIDTH = 50;
const TRIANGLE_HEIGHT = 100;
const FILL_OPACITY = 0.6;
const CIRCLE_RADIUS = 40;

var colorPalettes = [
    [
        "#856244",
        "#675851",
        "#758AA5",
        "#DFB2B5",
        "#FFE1CA"
    ],
    [
        "#009ABC",
        "#403A66",
        "#DB2D48",
        "#FCBD10",
        "#1D1E19"
    ],
    [
        "#A3B3C3",
        "#9DA6A3",
        "#76D3A4",
        "#9FE3D8",
        "#8EF0FB"
    ],
    [
        "#69D2E7",
        "#A7DBD8",
        "#E0E4CC",
        "#F38630",
        "#FA6900"
    ],
    [
        "#D1F2A5",
        "#EFFAB4",
        "#FFC48C",
        "#FF9F80",
        "#F56991"
    ],
    [
        "#655643",
        "#80BCA3",
        "#F6F7BD",
        "#E6AC27",
        "#BF4D28"
    ],
    [
        "#F8B195",
        "#F67280",
        "#C06C84",
        "#6C5B7B",
        "#355C7D"
    ]
];

var shapes = [
    "triangle",
    "rectangle",
    "circle",
    "square",
    //"semicircle"
];

document.addEventListener("DOMContentLoaded", function(){
    main();
});

async function main() {
    let canvas = document.getElementById("main");
    //canvas.style.border = "1px solid black";
    let ctx = canvas.getContext("2d");

    let canvasHeight = canvas.height;
    let canvasWidth = canvas.width;

    let numberOfShapesPerRow = canvasWidth / (BASE_RECTANGLE_WIDTH + GAP_SPACE_PER_ROW);
    let numberOfShapesPerColumn = canvasHeight / (BASE_RECTANGLE_HEIGHT + GAP_SPACE_PER_COLUMN);

    let colorPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];

    for (let i = 0; i < numberOfShapesPerColumn; i++) {
        for (let j = 0; j < numberOfShapesPerRow; j++) {
            let x = j * (BASE_RECTANGLE_WIDTH + GAP_SPACE_PER_ROW);
            let y = i * (BASE_RECTANGLE_HEIGHT + GAP_SPACE_PER_COLUMN);
            let color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            let sizeModifier = getSizeModifier();
            //await sleep(100);
            await generateShape(ctx, x, y, sizeModifier, color);

        }
    }

}

async function generateShape(context, x, y, sizeModifier, color) {
    let shape = shapes[Math.floor(Math.random() * shapes.length)];
    switch (shape) {
        case "triangle":
            generateTriangle(context, x, y, sizeModifier, color);
            break;
        case "rectangle":
        case "square":
            await generateQuadrilateral(context, x, y, shape, sizeModifier, color);
            break;
        case "circle":
        case "semicircle":
            generateArc(context, x, y, shape, sizeModifier, color);
            break;
    }
}

function generateArc(context, x, y, shape, sizeModifier, color) {
    generateArcStroke(context, x, y, shape, sizeModifier);
    generateArcFill(context, x, y, shape, sizeModifier, color);
}

function generateArcStroke(context, x, y, shape, sizeModifier) {
    let endAngle;
    switch (shape) {
        case "circle":
            endAngle = 2 * Math.PI;
            break;
        case "semicircle":
            endAngle = 1 * Math.PI;
            break;
        default:
            endAngle = 2 * Math.PI;
    }
    context.beginPath();
    context.arc(x + CIRCLE_RADIUS, y + CIRCLE_RADIUS, CIRCLE_RADIUS * sizeModifier, 0 * Math.PI, endAngle);
    context.stroke();
}

function generateArcFill(context, x, y, shape, sizeModifier, color) {
    let endAngle;
    switch (shape) {
        case "circle":
            endAngle = 2 * Math.PI;
            break;
        case "semicircle":
            endAngle = 1 * Math.PI;
            break;
        default:
            endAngle = 2 * Math.PI;
    }
    // this makes the fill be under the stroke lines
    context.globalCompositeOperation='destination-over';
    context.beginPath();
    context.arc(x + CIRCLE_RADIUS + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION), y + CIRCLE_RADIUS + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION), CIRCLE_RADIUS * sizeModifier, 0 * Math.PI, endAngle);
    context.fillStyle = color;
    context.fillOpacity = FILL_OPACITY;
    context.fill();
}

function generateTriangle(context, x, y, sizeModifier, color) {
    generateTriangleStroke(context, x, y, sizeModifier);
    generateTriangleFill(context, x, y, sizeModifier, color);
}

function generateTriangleStroke(context, x, y, sizeModifier) {
    context.beginPath();
    context.moveTo(x + (TRIANGLE_BASE_WIDTH / 2), y);
    context.lineTo(x, y + (TRIANGLE_HEIGHT * sizeModifier));
    context.lineTo(x + (TRIANGLE_BASE_WIDTH * sizeModifier), y + (TRIANGLE_HEIGHT * sizeModifier));
    context.lineTo(x + (TRIANGLE_BASE_WIDTH / 2), y);
    context.stroke();
}

function generateTriangleFill(context, x, y, sizeModifier, color) {
    // this makes the fill be under the stroke lines
    context.globalCompositeOperation='destination-over';
    // generate fill
    context.beginPath();
    let originX = x + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION);
    let originY = y + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION);
    context.moveTo(originX + (TRIANGLE_BASE_WIDTH / 2), originY);
    context.lineTo(x + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION), y + (TRIANGLE_HEIGHT * sizeModifier) + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION));
    context.lineTo(x + (TRIANGLE_BASE_WIDTH * sizeModifier) + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION), y + (TRIANGLE_HEIGHT * sizeModifier) + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION));
    context.lineTo(originX + (TRIANGLE_BASE_WIDTH / 2), originY);
    context.fillStyle = color;
    context.fillOpacity = FILL_OPACITY;
    context.fill();
}

async function generateQuadrilateral(context, x, y, type, sizeModifier, color) {
    await generateQuadrilateralStroke(context, x, y, type, sizeModifier);
    generateQuadrilateralFill(context, x, y, type, sizeModifier, color);
}

async function generateQuadrilateralStroke(context, x, y, type, sizeModifier) {
    let quadHeight, quadWidth;
    switch (type) {
        case "rectangle":
            quadHeight = BASE_RECTANGLE_HEIGHT * sizeModifier;
            quadWidth = BASE_RECTANGLE_WIDTH * sizeModifier;
            break;
        case "square":
            quadHeight = SQUARE_DIMENSION * sizeModifier;
            quadWidth = SQUARE_DIMENSION * sizeModifier;
            break;
    }
    // generate rectangle lines
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + quadHeight);
    context.stroke();
    //await sleep(50);
    context.lineTo(x + quadWidth, y + quadHeight);
    context.stroke();
    //await sleep(50);
    context.lineTo(x + quadWidth, y);
    context.stroke();
    //await sleep(50);
    context.lineTo(x, y);
    context.stroke();
    //await sleep(50);
}

function generateQuadrilateralFill(context, x, y, type, sizeModifier, color) {
    // this makes the fill be under the stroke lines
    context.globalCompositeOperation='destination-over';
    let quadHeight, quadWidth;
    switch (type) {
        case "rectangle":
            quadHeight = BASE_RECTANGLE_HEIGHT * sizeModifier;
            quadWidth = BASE_RECTANGLE_WIDTH * sizeModifier;
            break;
        case "square":
            quadHeight = SQUARE_DIMENSION * sizeModifier;
            quadWidth = SQUARE_DIMENSION * sizeModifier;
            break;
    }
    // generate fill
    context.beginPath();
    let originX = x + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION);
    let originY = y + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION);
    context.moveTo(originX, originY);
    context.lineTo(x + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION), y + quadHeight + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION));
    context.lineTo(x + quadWidth + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION), y + quadHeight + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION));
    context.lineTo(x + quadWidth + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION), y + getRandomInt(-MAXIMUM_FILL_DEVIATION, MAXIMUM_FILL_DEVIATION));
    context.lineTo(originX, originY);
    context.fillStyle = color;
    context.fillOpacity = FILL_OPACITY;
    context.fill();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getSizeModifier() {
    let randomNum = getRandomArbitrary(-MAXIMUM_SIZE_DEVIATION, MAXIMUM_SIZE_DEVIATION);
    return 1 + randomNum;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}