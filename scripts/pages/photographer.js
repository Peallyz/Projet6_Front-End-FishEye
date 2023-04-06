import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import {
  initFormListener,
  initLightbox,
  initLightboxChevronListener,
  initSelectListener,
  updateLike,
} from "../utils/eventListener.js";

//Retrieve current URL id

const url = new URL(window.location);
const id = parseInt(url.searchParams.get("id"));
let sorted = "popularité";
const choicesContainer = document.querySelectorAll(".sort ul li a");

async function getPhotographerData() {
  // fetch photographers' data

  // Add key HasLike init with false to handle the user "Add and remove like"
  const getMedia = (medias) => {
    let mediasArr = medias.filter((media) => media.photographerId === id);
    mediasArr.forEach((media) => (media.hasLike = false));
    return mediasArr;
  };
  const getPhotographer = (photographer) => {
    let photographerData = photographer.filter((data) => data.id === id);
    return photographerData;
  };

  //Catch all data and dispatch them into an array sort by photographers and medias
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

// Sort media by data, popularity or title

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
  medias.map((media) => {
    const mediaModel = mediaFactory(media, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
  initLightbox();
}

const handleSelector = (e) => {
  //Isolate selected filter
  let selected = e.target.innerText;
  const choices = ["Popularité", "Date", "Titre"].filter(
    (choice) => choice !== selected
  );

  cleanUpChoices();

  /// update selector, selected on top and others hiden
  selector.innerText = selected;
  choicesContainer[0].innerText = selected;
  choicesContainer[1].innerText = choices[0];
  choicesContainer[2].innerText = choices[1];

  ///Update datas and init again like
  sorted = selected.toLowerCase();
  displaySortedMedia(medias, sorted);
  updateLike();

  // Close Select
  selector.classList.remove("open");
};

///Clean all span to update selector
const cleanUpChoices = () => {
  choicesContainer.forEach((choice) => (choice.innerText = ""));
};

//Handle TabIndex for selector and select list on open/close

const handleTabIndexForSelector = (option) => {
  if (option === "open") {
    choicesContainer.forEach((choice) => {
      choice.setAttribute("tabindex", "1");
    });
    selector.setAttribute("tabindex", "-1");
    choicesContainer[0].focus();
  } else if (option === "close") {
    choicesContainer.forEach((choice) => {
      choice.setAttribute("tabindex", "-1");
    });
    selector.setAttribute("tabindex", "1");
    selector.focus();
  }
};

//////////////////////////////////////////////////

////////////////////HANDLE LIKE/////////////////////////

//If media has like remove it, neither add a like

const handleLike = (heart) => {
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

const updateFormWithName = (data) => {
  const modalTitle = document.querySelector(".modal_name");
  modalTitle.innerText = data[0][0].name;
};


/////////////////////HANDLE LIGHTBOX////////////////////////

///display media according the current media clicked initally
///or received after moving
const displayLightbox = (target) => {
  const id =
    typeof target == "number" ? target : target.getAttribute("data-id");
  const lightbox = document.querySelector(".lightbox");
  const mediaModel = mediaFactory();
  const lightboxContainerDOM = mediaModel.getLightboxContainerDOM(
    id,
    medias[1]
  );
  lightbox.appendChild(lightboxContainerDOM[0]);

  initLightboxChevronListener(medias, lightboxContainerDOM[1]);
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

///////////////////INITIALIZATION//////////////////////////

async function init() {
  // Capture all datas
  const photographerData = await getPhotographerData();

  displayPhotographerData(photographerData);
  displayLikeCountAndPrice(photographerData);
  displaySortedMedia(photographerData, sorted);
  updateFormWithName(photographerData);
  initLightbox();
  updateLike();
  initFormListener();
  initSelectListener(choicesContainer);

  return photographerData;
}

// Fetch data and display all data
const medias = await init();

export {
  handleLike,
  handleSelector,
  handleTabIndexForSelector,
  displayLightbox,
  movingMedia,
};
