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
    if(event.code === "KeyF"){
        if(withWeapon){
            tirarArma();
        }else{
            pegarArma();
        }
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

document.getElementById("armas-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectElement = document.getElementById("armas-select");
    const selectedValue = selectElement.value;
        pegarArma(selectedValue);
    
});


function pegarArma(){
    const armaElement = document.createElement("div");
    armaElement.classList.add("arma");
    armRight.style.transform = "rotate(-90deg)";
    armRight.style.top = "-15px";
    armRight.style.right = "-10px";
    handsRight.appendChild(armaElement);
    return withWeapon = true;
}
function tirarArma(){
    const armaElement = handsRight.querySelector(".arma");
    if(armaElement){
        armRight.style.transform = "";
        armRight.style.top = "";
        armRight.style.right = "";
        handsRight.removeChild(armaElement);
    }
    return withWeapon = false;
}
window.addEventListener('click', function(event){
    const armaElement = handsRight.querySelector(".arma");
    if(armaElement){
        const balaElement = document.createElement("div");
        balaElement.classList.add("bala");
        balaElement.style.left = "2.5px";
        balaElement.style.top = "10px";
        balaElement.style.animation = "tiro 0.2s linear";
        armaElement.appendChild(balaElement);
        setTimeout(() => {
            balaElement.remove();
        }, 200);
    }
});

