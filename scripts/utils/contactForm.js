function displayModal() {
  const modal = document.querySelector(".contact_modal");
  modal.setAttribute("aria-hidden", "false");
  modal.classList.remove("close");

  const header = document.querySelector(".main_header");
  header.setAttribute("aria-hidden", "true");
  const main = document.querySelector("#main");
  main.setAttribute("aria-hidden", "true");

  const prenomInput = document.querySelector("#prenom");
  prenomInput.focus();
}

function closeModal() {
  const modal = document.querySelector(".contact_modal");
  modal.setAttribute("aria-hidden", "true");
  modal.classList.add("close");

  const header = document.querySelector(".main_header");
  header.setAttribute("aria-hidden", "false");
  const main = document.querySelector("#main");
  main.setAttribute("aria-hidden", "false");
}
