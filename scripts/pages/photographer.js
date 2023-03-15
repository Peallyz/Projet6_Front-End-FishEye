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

// Sort media

async function displaySortedMedia(photographerData, value = "popularity") {
  let sortedMedia;
  if(value === "popularity"){
     sortedMedia = photographerData[1].sort((a,b) => b.likes - a.likes)
  } else if (value === "date"){
      sortedMedia = photographerData[1].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else if (value === "title"){
    sortedMedia =  photographerData[1].sort((a,b) => a.title.localeCompare(b.title))
  } else {
    sortedMedia = photographerData[1]
  }

  displayMedia(sortedMedia, photographerData[0][0].name);
}

//display medias

async function displayMedia(medias, photographerName) {
  const mediaSection = document.querySelector(".medias");
  mediaSection.innerHTML = ""
  medias.map((media) => {
    const mediaModel = mediaFactory(media, photographerName);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}


async function init(value = "popularity", type = "render") {
  // Récupère les datas des photographes
  const photographerData = await getPhotographerData();
  if(type === "render"){
    displayPhotographerData(photographerData[0][0]);
    displayLikeCountAndPrice(photographerData[0][0], photographerData[1]);
    displaySortedMedia(photographerData, value)
  } else if (type ===  "re-render"){
    displaySortedMedia(photographerData, value)
    console.log(value)
  }else{
    displayLikeCountAndPrice(photographerData[0][0], photographerData[1]);
  }
}

// Add an event listener on the selector to update and sort medias
const selector = document.querySelector("#selector")
selector.addEventListener("change", (e) => init(e.target.value, 're-render'))


init();
