const coin = document.querySelector(".coin");
const flipBtn = document.querySelector("#flip-button");
const resetBtn = document.querySelector("#reset-button");

let heads = 0;
let tails = 0;

flipBtn.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  coin.style.animation = "none";

  if (i) {
    setTimeout(() => {
      coin.style.animation = "spin-heads 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(() => {
      coin.style.animation = "spin-tails 3s forwards";
    }, 100);
    tails++;
  }
  setTimeout(updateState, 3000);
  disableButton();
});

function updateState() {
  document.querySelector("#heads-count").innerHTML = `Heads: ${heads}`;
  document.querySelector("#tails-count").innerHTML = `Tails: ${tails}`;
}

function disableButton() {
  flipBtn.disabled = true;
  setTimeout(() => {
    flipBtn.disabled = false;
  }, 3000);
}

resetBtn.addEventListener("click", () => {
  coin.style.animation = "none";
  heads = 0;
  tails = 0;
  updateState();
});
