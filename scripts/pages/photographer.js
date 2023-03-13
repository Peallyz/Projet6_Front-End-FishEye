import { photographerFactory } from "../factories/photographer.js";

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

async function init() {
  // Récupère les datas des photographes
  const photographerData = await getPhotographerData();
  displayPhotographerData(photographerData[0][0]);
}

init();
