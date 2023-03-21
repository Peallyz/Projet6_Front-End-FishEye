function displayModal() {
  const modal = document.querySelector(".contact_modal");
  modal.classList.remove("close");
  const header = document.querySelector(".main_header");
  const main = document.querySelector("#main");
  header.classList.add("close");
  main.classList.add("close");
}

function closeModal() {
  const modal = document.querySelector(".contact_modal");
  modal.classList.remove("close");
  modal.style.display = "none";
  const header = document.querySelector(".main_header");
  const main = document.querySelector("#main");
  header.classList.remove("close");
  main.classList.remove("close");
}
