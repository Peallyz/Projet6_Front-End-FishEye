function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  const header = document.querySelector(".main_header")
  const main = document.querySelector("#main")
  header.style.display ="none"
  main.style.display ="none"
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const header = document.querySelector(".main_header")
  const main = document.querySelector("#main")
  header.style.display ="block"
  main.style.display ="block"
}
