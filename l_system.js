const SEGMENT_LENGTH = 10;
const SEGMENT_ANGLE = 45;
const RULE_F_KOCH_ISLANDS_START = "F-F-F-F"
const RULE_F_KOCH_ISLANDS = "F-F+F+FF-F-F+F";

const RULE_F_TRIANGLE_START = "-F";
const RULE_F_TRIANGLE = "F+F-F-F+F";

const RULE_F_SNOWFLAKE_START = "F-F-F-F";
const RULE_F_SNOWFLAKE = "FF-F-F-F-F-F+F";

const RULE_F_RECTANGLE_START = "F-F-F-F";
const RULE_F_RECTANGLE = "FF-F-F-F-FF";

const RULE_F_MINI_RECTANGLES_START = "F-F-F-F";
const RULE_F_MINI_RECTANGLES = "FF-F+F-F-FF";

const RULE_F_BORDER_START = "F-F-F-F";
const RULE_F_BORDER = "FF-F--F-F";

const RULE_F_MAZE_LIKE_START = "F-F-F-F";
const RULE_F_MAZE_LIKE = "F-F+F-F-F";

const RULE_F_FILLED_MAZE_START = "F-F-F-F";
const RULE_F_FILLED_MAZE = "F-FF--F-F";


document.addEventListener("DOMContentLoaded", function(){
    main();
    //calculateCoordinates(0,0,45);
});



function main() {
    let canvas = document.getElementById("main");
    canvas.style.border = "1px solid black";
    let ctx = canvas.getContext("2d");

    let canvasHeight = canvas.height;
    let canvasWidth = canvas.width;

    let scaleX, scaleY = 1;

    canvas.addEventListener("onmousedown", function(e) {
        scaleX += 0.5;
        scaleY += 0.5;
        ctx.scale(scaleX, scaleY);
    });


    let result = applyTransformNthTimes(3, RULE_F_RECTANGLE_START, RULE_F_MINI_RECTANGLES);
    draw(ctx, result)
}

function draw(ctx, stringInput) {
    let x = 400;
    let y = 400;

    // 1 = up, 2 = right, 3 = down, 4 = left
    let movement = 1;
    ctx.moveTo(x,y);
    for (let i = 0; i < stringInput.length; i++) {
        switch (stringInput[i]) {
            case "F":
                switch (movement) {
                    case 1:
                        y -= SEGMENT_LENGTH;
                        break;
                    case 2:
                        x += SEGMENT_LENGTH;
                        break;
                    case 3:
                        y += SEGMENT_LENGTH;
                        break;
                    case 4:
                        x -= SEGMENT_LENGTH;
                        break;
                }
                break;
            case "-":
                if (movement == 1) {
                    movement = 4;
                }else {
                    movement--;
                }
                break;
            case "+":
                if (movement == 4) {
                    movement = 1;
                }else {
                    movement++;
                }
        }

        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function applyTransformNthTimes(n, input, rule) {
    let result = "";
    for (let i = 0; i < input.length; i++) {
        if (input[i] == "F") {
            result = result.concat(rule)
        }else {
            result = result.concat(input[i]);
        }
    }
    n--;

    if (n > 0) {
        console.log("Recursive:",n);
        console.log("Result:", result);
        return applyTransformNthTimes(n, result, rule)
    }else {
        return result;
    }

}

function calculateCoordinates(x,y,angle) {
    let radians = toRadians(angle);
    let cosAngle = Math.cos(radians);
    let xLength = SEGMENT_LENGTH * cosAngle;

    let sinAngle = Math.sin(radians);
    let yLength = SEGMENT_LENGTH * sinAngle;

    xLength = Math.round(xLength);
    yLength = Math.round(yLength);

    return [xLength, yLength];
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

