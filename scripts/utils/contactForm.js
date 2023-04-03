///////////////////Display modal/////////////////////
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
  
  window.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
};

///////////////////Close modal/////////////////////
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

///////////////////Remove tabindex on everything except form when form open and readd when closed/////////////////////

const handleBackgroundInteractivity = (formOpen) => {
  //Catch all background element
  const targetatbleElement = [];

  targetatbleElement.push(document.querySelector(".main_header a"));
  targetatbleElement.push(
    document.querySelector(".photograph-header .contact_button")
  );
  targetatbleElement.push(document.querySelector("#selector"));
  targetatbleElement.push(...document.querySelectorAll(".sort ul li a"));
  targetatbleElement.push(...document.querySelectorAll(".medias article img"));
  targetatbleElement.push(...document.querySelectorAll(".medias article p i"));


    //Remove tabindex
    if (formOpen === true) {
      targetatbleElement.forEach((element) =>
      element.setAttribute("tabindex", "-1")
      );
      //Add tabindex
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
  //Catch all data and log them using their key and value
  const formData = new FormData(form);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const modal = document.querySelector(".contact_modal");
  modal.classList.add("close");
  closeModal();
};

export { sendForm, closeModal, displayModal };
