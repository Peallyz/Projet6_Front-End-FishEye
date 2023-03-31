function displayModal() {
  const modal = document.querySelector(".contact_modal");
  const prenomInput = document.querySelector("#prenom");
  modal.classList.remove("close");
  prenomInput.focus();
}

function closeModal() {
  const modal = document.querySelector(".contact_modal");
  modal.classList.add("close");
}
