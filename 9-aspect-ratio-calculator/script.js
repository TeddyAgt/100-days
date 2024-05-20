const ratioWidth = document.querySelector("#ratio-width");
const ratioHeight = document.querySelector("#ratio-height");
const width = document.querySelector("#width");
const height = document.querySelector("#height");

function calculateWidth() {
  let aspectRatio = ratioWidth.value / ratioHeight.value;
  width.value = parseFloat((height.value * aspectRatio).toFixed(2));
}

function calculateHeight() {
  let aspectRatio = ratioWidth.value / ratioHeight.value;
  height.value = parseFloat((width.value / aspectRatio).toFixed(2));
}

ratioWidth.addEventListener("input", calculateHeight);
ratioHeight.addEventListener("input", calculateWidth);
width.addEventListener("input", calculateHeight);
height.addEventListener("input", calculateWidth);
