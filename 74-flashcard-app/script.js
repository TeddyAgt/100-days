const container = document.querySelector(".container");
const addQuestionModal = document.querySelector("#add-card-modal");
const saveButton = document.querySelector("#save-btn");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const errorMessage = document.querySelector("#error");
const addQuestion = document.querySelector("#add-card");
const closeBtn = document.querySelector("#close-btn");

let editBool = false;
let originalId = null;
let flashcards;

addQuestion.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
saveButton.addEventListener("click", createNewFlashcard);

function toggleModal() {
  container.classList.toggle("hide");
  if (editBool) editBool = false;
  question.value = "";
  answer.value = "";
  addQuestionModal.classList.toggle("hide");
}

function createNewFlashcard() {
  let tempQuestion = question.value.trim();
  let tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    if (editBool) {
      flashcards = flashcards.filter(
        (flashcard) => flashcard.id !== originalId
      );
    }
    let id = Date.now();
    flashcards.push({
      id,
      question: tempQuestion,
      answer: tempAnswer,
    });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    if (!errorMessage.classList.contains("hide"))
      errorMessage.classList.add("hide");
    toggleModal();
    viewList();
  }
}

function viewList() {
  const cardsList = document.querySelector(".cards-list");
  cardsList.innerHTML = "";
  flashcards = JSON.parse(localStorage.getItem("flashcards")) ?? [];
  flashcards.forEach((flashcard) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <p class="que-div">${flashcard.question}</p>
    <p class="ans-div">${flashcard.answer}</p>
    <button class="show-hide-btn">Show/Hide</button>
    <div class="btns-con">
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    `;
    div.setAttribute("data-id", flashcard.id);
    const displayAns = div.querySelector(".ans-div");
    const showHideBtn = div.querySelector(".show-hide-btn");
    const editBtn = div.querySelector(".edit");
    const deleteBtn = div.querySelector(".delete");

    showHideBtn.addEventListener("click", () => {
      displayAns.classList.toggle("hide");
    });

    editBtn.addEventListener("click", () => {
      editBool = true;
      modifyElement(editBtn, true);
      addQuestionModal.classList.remove("hide");
    });

    deleteBtn.addEventListener("click", () => {
      modifyElement(deleteBtn);
    });

    cardsList.appendChild(div);
  });
}

function modifyElement(element, edit = false) {
  const parentDiv = element.parentElement.parentElement;
  const id = Number(parentDiv.getAttribute("data-id"));
  const parentQuestion = parentDiv.querySelector(".que-div").innerText;
  if (edit) {
    const parentAnswer = parentDiv.querySelector(".ans-div").innerText;
    question.value = parentQuestion;
    answer.value = parentAnswer;
    originalId = id;
    disableBtns("true");
  } else {
    flashcards = flashcards.filter((flashcard) => flashcard.id !== id);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }
  parentDiv.remove();
}

function disableBtns(value) {
  const editButtons = [...document.querySelectorAll(".edit")];
  editButtons.forEach((element) => {
    element.disabled = value;
  });
}

document.addEventListener("DOMContentLoaded", viewList);
