const optionButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");

const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive",
];

function initializer() {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.map((font) => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3;
}

function modifyText(command, defaultUi, value) {
  document.execCommand(command, defaultUi, value);
}

optionButtons.forEach((button) =>
  button.addEventListener("click", () => modifyText(button.id, false, null))
);

advancedOptionButton.forEach((button) =>
  button.addEventListener("change", () =>
    modifyText(button.id, false, button.value)
  )
);

linkButton.addEventListener("click", () => {
  const userLink = prompt("Enter a URL");
  if (/^http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

function highlighter(className, needsRemoval) {
  className.forEach((button) =>
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;

        if (button.className.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className);

        if (!alreadyActive) {
          button.classList.add("active");
        } else {
          button.classList.toggle("active");
        }
      }
    })
  );
}

function highlighterRemover(className) {
  className.forEach((button) => {
    button.classList.remove("active");
  });
}

window.onload = initializer();
