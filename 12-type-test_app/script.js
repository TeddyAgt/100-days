const quooteApiUrl =
  "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.querySelector("#quote");
const userInput = document.querySelector("#quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

async function renderNewQuote() {
  const response = await fetch(quooteApiUrl);
  const data = await response.json();
  quote = data.content;

  let arr = quote.split("").map((value) => {
    return `<span class="quote-chars">${value}</span>`;
  });

  quoteSection.innerHTML += arr.join("");
}

userInput.addEventListener("input", () => {
  const quoteChars = [...document.querySelectorAll(".quote-chars")];
  const userInputChars = userInput.value.split("");
  quoteChars.forEach((char, index) => {
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    } else if (userInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    } else {
      if (!char.classList.contains("fail")) {
        mistakes++;
        char.classList.add("fail");
      }

      document.querySelector("#mistakes").innerText = mistakes;
    }

    const check = quoteChars.every((elem) => {
      return elem.classList.contains("success");
    });

    if (check) {
      displayResult();
    }
  });
});

function updateTimer() {
  if (!time) {
    displayResult();
  } else {
    document.querySelector("#timer").innerText = --time + "s";
  }
}

function timeReduce() {
  time = 60;
  timer = setInterval(updateTimer, 1000);
}

function displayResult() {
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.querySelector("#stop-test").style.display = "noone";
  userInput.disabled = true;
  let timeTaken = 1;

  if (time) {
    timeTaken = (60 - time) / 100;
  }

  document.querySelector("#wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
  document.querySelector("#accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + "%";
}

function startTest() {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.querySelector("#start-test").style.display = "none";
  document.querySelector("#stop-test").style.display = "block";
}

window.onload = () => {
  userInput.value = "";
  document.querySelector("#start-test").style.display = "block";
  document.querySelector("#stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
