import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";

//Retrieve current URL id

const url = new URL(window.location);
const id = parseInt(url.searchParams.get("id"));
let sorted = "popularité";

async function getPhotographerData() {
  // fetch photographers' data

  const getMedia = (medias) => {
    let mediasArr = medias.filter((media) => media.photographerId === id);
    mediasArr.forEach((media) => (media.hasLike = false));
    return mediasArr;
  };
  const getPhotographer = (photographer) => {
    let photographerData = photographer.filter((data) => data.id === id);
    return photographerData;
  };

  const data = await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((data) => [
      getPhotographer(data.photographers),
      getMedia(data.media),
    ]);

  return data;
}

////////////////////DISPLAY PHOTOGRAPHE HEADER//////////////////////////

// Display photographer data on their page

async function displayPhotographerData(photographerDatas) {
  const photographersHeader = document.querySelector(".photograph-header");
  const photographer = photographerFactory(photographerDatas[0][0]);
  const userHeaderTextDOM = photographer.getUserHeaderTextDOM();
  photographersHeader.prepend(userHeaderTextDOM);
  const userAvatarDOM = photographer.getUserAvatarDOM();
  photographersHeader.appendChild(userAvatarDOM);
}

//////////////////////////////////////////////

////////////////////LIKE AND PRICE CONTAINER//////////////////////////

//display bottom fix container with total like and price

const displayLikeCountAndPrice = async (photographerDatas) => {
  const priceAndLikeContainer = document.querySelector(".like__container");
  priceAndLikeContainer.innerHTML = "";
  const mediaModel = mediaFactory(photographerDatas[1]);
  const likeAndPriceData = mediaModel.getLikeAndPriceContainerDOM(
    photographerDatas[0][0]
  );
  priceAndLikeContainer.appendChild(likeAndPriceData[0]);
  priceAndLikeContainer.appendChild(likeAndPriceData[1]);
};

//////////////////////////////////////////////

//////////////////////SORT AND DISPLAY MEDIA////////////////////////////

// Sort media

async function displaySortedMedia(photographerData, value = "popularité") {
  let sortedMedia;
  if (value === "popularité") {
    sortedMedia = photographerData[1].sort((a, b) => b.likes - a.likes);
  } else if (value === "date") {
    sortedMedia = photographerData[1].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (value === "titre") {
    sortedMedia = photographerData[1].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else {
    sortedMedia = photographerData[1];
  }

  displayMedia(sortedMedia, photographerData[0][0].name);
}

//display medias

async function displayMedia(medias, photographerName) {
  const mediaSection = document.querySelector(".medias");
  mediaSection.innerHTML = "";
  medias.map((media, index) => {
    const mediaModel = mediaFactory(media, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM(index);
    mediaSection.appendChild(mediaCardDOM);
  });
  initLightbox();
}

// Add an event listener on the selector to update and sort medias
const selector = document.querySelector(".selector");

selector.addEventListener("click", (e) => {
  if (selector.getAttribute("class").includes("open")) {
    const choicesContainer = document.querySelectorAll("button.selector span");
    let selected = e.target.innerText;

    ///Clean all span to update selector
    choicesContainer.forEach((choice) => (choice.innerText = ""));

    const choices = ["Popularité", "Date", "Titre"].filter(
      (choice) => choice !== selected
    );

    /// update selector, selected on top and others hiden
    choicesContainer[0].innerText = selected;
    choicesContainer[1].innerText = choices[0];
    choicesContainer[2].innerText = choices[1];

    sorted = selected.toLowerCase();

    selector.classList.remove("open");
    selector.setAttribute("aria-expanded", "false");
    ///Update datas and init again like
    displaySortedMedia(medias, sorted);
    updateLike();
  } else {
    selector.classList.add("open");
    selector.setAttribute("aria-expanded", "true");
  }
});

//////////////////////////////////////////////////

////////////////////HANDLE LIKE/////////////////////////

//If media has like remove it, neither add a like

const handleLike = (heart, medias) => {
  const target = medias[1].filter(
    (media) => media.id === checkTargetLike(heart)
  )[0];

  if (hasLike(target)) {
    target.hasLike = false;
  } else if (!hasLike(target)) {
    target.hasLike = true;
  }
  displaySortedMedia(medias, sorted);
  displayLikeCountAndPrice(medias);
  updateLike();
};

// Check if the media already has been liked or not
const hasLike = (target) => {
  const heartToCheck = target.hasLike;
  if (heartToCheck) {
    return true;
  } else {
    return false;
  }
};

// Verify which media match with the heartID

const checkTargetLike = (heart) => {
  const heartId = parseInt(heart.getAttribute("data-id"));
  return heartId;
};

/////////////////////////////////////////////

///////////////////EVENT LISTENER ON MODAL//////////////////////////

const updateModalWithName = (data) => {
  const modalTitle = document.querySelector(".modal_name");
  modalTitle.innerText = data[0][0].name;
};
/////////////////////////////////////////////

/////////////////////HANDLE LIGHTBOX////////////////////////

///Add Event Listener on all img

const initLightbox = () => {
  const articles = document.querySelectorAll("article img");
  articles.forEach((article) => {
    article.addEventListener("click", (e) => displayLightbox(e.target, medias));
  });
  articles.forEach((article) => {
    article.addEventListener(
      "keydown",
      (e) => e.key === "Enter" && displayLightbox(e.target, medias)
    );
  });
};

///display media according the current media clicked initally
///or received after moving
const displayLightbox = (target, medias) => {
  const id =
    typeof target == "number" ? target : target.getAttribute("data-id");
  const lightbox = document.querySelector(".lightbox");
  const mediaModel = mediaFactory();
  const lightboxContainerDOM = mediaModel.getLightboxContainerDOM(
    id,
    medias[1]
  );
  lightbox.appendChild(lightboxContainerDOM[0]);

  const chevronRight = document.querySelector(".fa-chevron-right");
  chevronRight.addEventListener("click", () =>
    movingMedia("right", medias, lightboxContainerDOM[1])
  );

  const chevronLeft = document.querySelector(".fa-chevron-left");
  chevronLeft.addEventListener("click", () =>
    movingMedia("left", medias, lightboxContainerDOM[1])
  );
};

///Add class to move media according the chevron clicked and update lightbox

const movingMedia = (direction, allMedias, currentMedias) => {
  const imgs = document.querySelector(".medias__container");
  if (direction === "left") {
    imgs.classList.add("move__left");
    setTimeout(() => {
      displayLightbox(currentMedias[0].id, allMedias);
    }, 500);
  } else if (direction === "right") {
    imgs.classList.add("move__right");
    setTimeout(() => {
      displayLightbox(currentMedias[2].id, allMedias);
    }, 500);
  }
};

/////////////////////////////////////////////

/////////////////////SEND FORM////////////////////////

const form = document.querySelector(".modal form");
form.addEventListener("submit", (e) => sendForm(e));

const sendForm = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const modal = document.querySelector(".contact_modal");
  modal.classList.add("close");
};

///////////////////INITIALIZATION//////////////////////////

async function init() {
  // Capture all datas
  const photographerData = await getPhotographerData();

  displayPhotographerData(photographerData);
  displayLikeCountAndPrice(photographerData);
  displaySortedMedia(photographerData, sorted);
  updateModalWithName(photographerData);
  initLightbox();

  return photographerData;
}

// Fetch data and display all data
const medias = await init();

// Add an event listener on each heart to handle the toggle like

const updateLike = () => {
  const mediaCardsHeart = document.querySelectorAll("article div p i");
  mediaCardsHeart.forEach((heart) =>
    heart.addEventListener("click", (e) => {
      handleLike(e.target, medias);
    })
  );

  // If user click Enter, add like on photo
  mediaCardsHeart.forEach((heart) =>
    heart.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleLike(e.target, medias);
      }
    })
  );
};

updateLike();

////////////////////Listner using keyboard/////////////////////////

/////////////////////////////////////////////
