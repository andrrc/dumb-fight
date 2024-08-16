const peopleOne = document.getElementById("people-one");
const armRight = peopleOne.querySelector(".middle .arm-right");
const handsRight = armRight.querySelector(".hands-right");
const legsLeft = peopleOne.querySelector(".bottom .legs-left");
const legsRight = peopleOne.querySelector(".bottom .legs-right");
let isJumping = false;
let isWalking = false;
let walkInterval;
let withWeapon = false;

const keysPressed = {};

window.addEventListener("keydown", function(event) {
    keysPressed[event.code] = true;

    if (keysPressed["Space"] && !isJumping) {
        isJumping = true;
        peopleOne.style.animation = "pular 0.5s forwards linear";

        setTimeout(() => {
            peopleOne.style.animation = "";
            isJumping = false;
        }, 500);
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
    
    if (event.code === "KeyF") {
        if (withWeapon) {
            tirarArma();
        } else {
            pegarArma();
        }
    }
});

document.getElementById("armas-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectElement = document.getElementById("armas-select");
    const selectedValue = selectElement.value;
    pegarArma(selectedValue);
});

function pegarArma() {
    const armaElement = document.createElement("div");
    armaElement.classList.add("arma");
    armRight.style.transform = "rotate(-90deg)";
    armRight.style.top = "-15px";
    armRight.style.right = "-10px";
    handsRight.appendChild(armaElement);
    withWeapon = true;
}

function tirarArma() {
    const armaElement = handsRight.querySelector(".arma");
    if (armaElement) {
        armRight.style.transform = "";
        armRight.style.top = "";
        armRight.style.right = "";
        handsRight.removeChild(armaElement);
    }
    withWeapon = false;
}

window.addEventListener('click', function(event) {
    if (withWeapon) {
        const handsRightRect = handsRight.getBoundingClientRect();
        const balaElement = document.createElement('div');
        balaElement.classList.add('bala');
        
        balaElement.style.position = 'absolute';
        balaElement.style.left = `${handsRightRect.left + 30}px`; 
        balaElement.style.top = `${handsRightRect.top + 0}px`; 
        document.body.appendChild(balaElement);

        const velocityX = 20;
        const interval = setInterval(() => {
            const balaRect = balaElement.getBoundingClientRect();

            if (balaRect.left < window.innerWidth) {
                balaElement.style.left = `${balaElement.offsetLeft + velocityX}px`;
            } else {
                clearInterval(interval); // Para o intervalo se a bala sair da tela
                balaElement.remove();
            }
        }, 1);

        setTimeout(() => {
            if (document.contains(balaElement)) {
                balaElement.remove();
            }
        }, 100); // Tempo máximo de vida da bala
    }
});
