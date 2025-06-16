const balloon = document.getElementById("balloon");
const letter = document.getElementById("letter");
const pumpButton = document.getElementById("pumpButton");
const wrapper = document.getElementById("balloon-wrapper");
const stringImg = document.getElementById("string");

let balloonIndex = 1;
let letterIndex = 0;
let pumpCount = 0;
let scale = 1;
let isBursting = false;

const maxAlphabets = 26; // Show all 26 letters
const balloonImages = 10;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function loadBalloon() {
  if (letterIndex >= maxAlphabets) {
    alert("🎉 Game Over!");
    return;
  }

  // Use balloon-1.png to balloon-10.png repeatedly
  const balloonImgNumber = (letterIndex % balloonImages) + 1;

  balloon.src = `assets/balloon-${balloonImgNumber}.png`;
  letter.src = `assets/${letters[letterIndex]}.png`;

  // Reset position and scale
  wrapper.style.bottom = "100px";
  wrapper.style.animation = "none";
  scale = 1;
  balloon.style.transform = `scale(${scale})`;
  letter.style.transform = `translateX(-50%) scale(${scale})`;

  // Reset styles
  balloon.classList.remove("burst");
  stringImg.classList.remove("show-string");

  balloon.style.opacity = "1";
  letter.style.opacity = "1";
  stringImg.style.opacity = "0";

  balloon.style.display = "block";
  letter.style.display = "block";
  stringImg.style.display = "block";
}

function burstBalloon() {
  isBursting = true;

  balloon.classList.add("burst");

  // Show string immediately
  stringImg.style.opacity = "1";
  stringImg.classList.add("show-string");

  setTimeout(() => {
    balloon.style.opacity = "0";
    letter.style.opacity = "0";

    setTimeout(() => {
      stringImg.classList.remove("show-string");
      stringImg.style.opacity = "0";

      // Move to next letter
      letterIndex++;
      pumpCount = 0;
      isBursting = false;
      loadBalloon();
    }, 500);
  }, 1000);
}

function floatAndBurst() {
  if (isBursting) return;
  isBursting = true;

  wrapper.style.animation = "floatUp 2s forwards";

  setTimeout(() => {
    burstBalloon();
    wrapper.style.animation = "";
  }, 2000);
}

pumpButton.addEventListener("click", () => {
  if (isBursting) return;

  pumpCount++;
  scale += 0.1;
  balloon.style.transform = `scale(${scale})`;
  letter.style.transform = `translateX(-50%) scale(${scale})`;

  if (pumpCount >= 5) {
    floatAndBurst();
  }
});

// Start the game
loadBalloon();
