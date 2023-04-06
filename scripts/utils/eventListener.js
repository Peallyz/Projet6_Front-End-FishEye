import {
  displayLightbox,
  handleLike,
  handleSelector,
  handleTabIndexForSelector,
  movingMedia,
} from "../pages/photographer.js";

import { closeModal, displayModal, sendForm } from "./contactForm.js";

////////////////////Handle like/////////////////////////

// Add an event listener on each heart to handle the toggle like

const updateLike = () => {
  const mediaCardsHeart = document.querySelectorAll("article div p i");
  mediaCardsHeart.forEach((heart) =>
    heart.addEventListener("click", (e) => {
      handleLike(e.target);
    })
  );

  // If user click Enter, add like on photo
  mediaCardsHeart.forEach((heart) =>
    heart.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleLike(e.target);
      }
    })
  );
};

/////////////////////////////////////////////

////////////////////Handle form/////////////////////////

const initFormListener = () => {
  //Open Modal on click

  const formOpenerBtn = document.querySelector(
    ".photograph-header .contact_button"
  );
  formOpenerBtn.addEventListener("click", displayModal);

  //Close modal on click on cross

  const formClosingBtn = document.querySelector(".contact_modal header img");
  formClosingBtn.addEventListener("click", closeModal);

  //Submit form data

  const formSubmitBtn = document.querySelector(".contact_modal form");
  formSubmitBtn.addEventListener("submit", (e) => sendForm(e));
};
/////////////////////////////////////////////

/////////////////////Handle selector////////////////////////
const initSelectListener = (choicesContainer) => {
  // Add an event listener on selector to update and sort medias
  const selector = document.querySelector(".selector");

  selector.addEventListener("click", () => {
    selector.classList.add("open");
    selector.setAttribute("aria-expanded", "true");
    handleTabIndexForSelector("open");
  });

  choicesContainer.forEach((choice) =>
    choice.addEventListener("click", (e) => {
      handleSelector(e);
      selector.setAttribute("aria-expanded", "false");
      handleTabIndexForSelector("close");
    })
  );
};
/////////////////////////////////////////////

/////////////////////HANDLE LIGHTBOX////////////////////////

///Add Event Listener on all img to launch Lightbox

const initLightbox = () => {
  const articles = document.querySelectorAll("article img");
  articles.forEach((article) => {
    article.addEventListener("click", (e) => displayLightbox(e.target));
  });
  articles.forEach((article) => {
    article.addEventListener(
      "keydown",
      (e) => e.key === "Enter" && displayLightbox(e.target)
    );
  });
};

const initLightboxChevronListener = (medias, lightboxContainerDOM) => {
  // Handle movingMedia on click
  const chevronRight = document.querySelector(".fa-chevron-right");
  chevronRight.addEventListener("click", () =>
    movingMedia("right", medias, lightboxContainerDOM)
  );

  const chevronLeft = document.querySelector(".fa-chevron-left");
  chevronLeft.addEventListener("click", () =>
    movingMedia("left", medias, lightboxContainerDOM)
  );

  // Handle movingMedia using Keyboard Arrow

  const mainMedia = document.querySelectorAll(".media__container")[1];
  mainMedia.setAttribute("tabindex", "1");
  mainMedia.focus();
  mainMedia.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      movingMedia("right", medias, lightboxContainerDOM);
    } else if (e.key === "ArrowLeft") {
      movingMedia("left", medias, lightboxContainerDOM);
    }
  });
};
///////////////////////////////

export {
  updateLike,
  initFormListener,
  initSelectListener,
  initLightbox,
  initLightboxChevronListener,
};
