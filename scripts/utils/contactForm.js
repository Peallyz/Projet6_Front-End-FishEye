const displayModal = () => {
  const modal = document.querySelector(".contact_modal");
  modal.setAttribute("aria-hidden", "false");
  modal.classList.remove("close");

  const header = document.querySelector(".main_header");
  header.setAttribute("aria-hidden", "true");
  const main = document.querySelector("#main");
  main.setAttribute("aria-hidden", "true");

  const prenomInput = document.querySelector("#prenom");
  prenomInput.focus();
  handleBackgroundInteractivity(true);
};

const closeModal = () => {
  const modal = document.querySelector(".contact_modal");
  modal.setAttribute("aria-hidden", "true");
  modal.classList.add("close");

  const header = document.querySelector(".main_header");
  header.setAttribute("aria-hidden", "false");
  const main = document.querySelector("#main");
  main.setAttribute("aria-hidden", "false");

  handleBackgroundInteractivity(false);

  document.querySelector(".photograph-header .contact_button").focus();
};

const handleBackgroundInteractivity = (formOpen) => {
  const targetatbleElement = [];

  targetatbleElement.push(document.querySelector(".main_header a"));
  targetatbleElement.push(
    document.querySelector(".photograph-header .contact_button")
  );
  targetatbleElement.push(document.querySelector("#selector"));
  targetatbleElement.push(...document.querySelectorAll(".sort ul li a"));
  targetatbleElement.push(...document.querySelectorAll(".medias article img"));
  targetatbleElement.push(...document.querySelectorAll(".medias article p i"));

  if (formOpen === true) {
    targetatbleElement.forEach((element) =>
      element.setAttribute("tabindex", "-1")
    );
  } else if (formOpen === false) {
    targetatbleElement.forEach((element) =>
      element.setAttribute("tabindex", "1")
    );
  }
};

/////////////////////SEND FORM////////////////////////

const sendForm = (e) => {
  e.preventDefault();
  const form = document.querySelector(".modal form");
  const formData = new FormData(form);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const modal = document.querySelector(".contact_modal");
  modal.classList.add("close");
  closeModal();
};

export { sendForm, closeModal, displayModal };
