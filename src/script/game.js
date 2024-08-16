const peopleOne = document.getElementById("people-one");
const legsLeft = peopleOne.querySelector(".bottom .legs-left");
const legsRight = peopleOne.querySelector(".bottom .legs-right");
let isJumping = false;
let isWalking = false;
let walkInterval;

const keysPressed = {};

window.addEventListener("keydown", function(event) {
    keysPressed[event.code] = true;

    if (keysPressed["Space"] && !isJumping) {
        isJumping = true;
        peopleOne.style.animation = "pular 0.3s forwards linear";

        setTimeout(() => {
            peopleOne.style.animation = "";
            isJumping = false;
        }, 300);
    }

    if ((keysPressed["KeyA"] || keysPressed["KeyD"]) && !isWalking) {
        isWalking = true;
        legsLeft.style.animation = "walk 0.3s infinite linear";
        legsRight.style.animation = "walk 0.3s infinite linear";

        walkInterval = setInterval(() => {
            if (keysPressed["KeyA"]) {
                peopleOne.style.left = `${peopleOne.offsetLeft - 2}px`;
            } else if (keysPressed["KeyD"]) {
                peopleOne.style.left = `${peopleOne.offsetLeft + 2}px`;
            }
        }, 10);
    }
});

window.addEventListener("keyup", function(event) {
    keysPressed[event.code] = false;

    if (!keysPressed["KeyA"] && !keysPressed["KeyD"]) {
        clearInterval(walkInterval);
        legsLeft.style.animation = "";
        legsRight.style.animation = "";
        isWalking = false;
    }
});

