const container = document.querySelector(".container");
const gridButton = document.querySelector("#submit-grid");
const clearGridButton = document.querySelector("#clear-grid");
const gridWidth = document.querySelector("#width-range");
const gridHeight = document.querySelector("#height-range");
const colorButton = document.querySelector(" #color-input");
const eraseButton = document.querySelector("#erase-btn");
const paintButton = document.querySelector("#paint-btn");
const widthValue = document.querySelector("#width-value");
const heightValue = document.querySelector("#height-value");

const events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";
let drawing = false;
let erase = false;

gridButton.addEventListener("click", handleClickGridButton);
clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});
eraseButton.addEventListener("click", () => {
  erase = true;
});
paintButton.addEventListener("click", () => {
  erase = false;
});
gridWidth.addEventListener("input", () => {
  widthValue.textContent =
    gridWidth.value < 9 ? `0${gridWidth.value}` : `${gridWidth.value}`;
});
gridHeight.addEventListener("input", () => {
  widthValue.textContent =
    gridHeight.value < 9 ? `0${gridHeight.value}` : `${gridHeight.value}`;
});
window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};

function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
}
isTouchDevice();

function handleClickGridButton() {
  container.innerHTML = "";
  let count = 0;

  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement("div");
    div.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `gridCol${count}`);
      col.addEventListener(events[deviceType].down, (e) => {
        draw(e);
      });

      col.addEventListener(events[deviceType].move, (e) => {
        console.log("coucou");
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : etouches[0].clientX,
          !isTouchDevice() ? e.clientY : etouches[0].clientY
        ).id;

        checker(elementId);
      });

      col.addEventListener(events[deviceType].up, () => {
        drawing = false;
      });

      div.appendChild(col);
    }

    container.appendChild(div);
  }
}

function draw(e) {
  drawing = true;
  const col = e.target;
  if (erase) {
    col.style.backgroundColor = "transparent";
  } else {
    col.style.backgroundColor = colorButton.value;
  }
}

function checker(elementId) {
  const gridColumns = document.querySelectorAll(".gridCol");
  gridColumns.forEach((element) => {
    if (elementId == element.id) {
      if (drawing && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (drawing && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}
