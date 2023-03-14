import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";

//Retrieve current URL id

const url = new URL(window.location);
const id = parseInt(url.searchParams.get("id"));

async function getPhotographerData() {
  // fetch photographers' data

  const getMedia = (medias) => {
    let mediasArr = medias.filter((media) => media.photographerId === id);
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

// Display photographer data on their page

async function displayPhotographerData(photographerData) {
  const photographersHeader = document.querySelector(".photograph-header");
  const photographer = photographerFactory(photographerData);
  const userHeaderTextDOM = photographer.getUserHeaderTextDOM();
  photographersHeader.prepend(userHeaderTextDOM);
  const userAvatarDOM = photographer.getUserAvatarDOM();
  photographersHeader.appendChild(userAvatarDOM);
}

//display bottom fix container with total like and price

const displayLikeCountAndPrice = async (photographerData, mediasData) => {
  const priceAndLikeContainer = document.querySelector(".like__container");
  const price = `${photographerData.price}€ / jour`;
  const priceContainer = document.createElement("p");
  priceContainer.innerText = price;
  const medias = mediaFactory(mediasData);
  const like = medias.getTotalLike();
  const likeContainer = document.createElement("p");
  const heart = document.createElement("i");
  heart.setAttribute("class", "fa-solid fa-heart");
  likeContainer.innerText = like;
  likeContainer.appendChild(heart);
  priceAndLikeContainer.appendChild(likeContainer);
  priceAndLikeContainer.appendChild(priceContainer);
};

//display medias

async function displayMedia(medias, photographerName) {
  const mediaSection = document.querySelector(".medias");
  console.log(medias);
  medias.map((media) => {
    const mediaModel = mediaFactory(media, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographerData = await getPhotographerData();
  displayPhotographerData(photographerData[0][0]);
  displayLikeCountAndPrice(photographerData[0][0], photographerData[1]);
  displayMedia(photographerData[1], photographerData[0][0].name);
}

init();
