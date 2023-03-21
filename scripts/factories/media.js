const mediaFactory = (data) => {
  function getTotalLike() {
    let totalLikes = 0;
    data.map((el) => (totalLikes += el.likes));
    totalLikes += data.filter((media) => media.hasLike === true).length;
    return totalLikes;
  }

  function getMediaCardDOM() {
    let {
      id,
      photographerId,
      title,
      image,
      video,
      likes,
      date,
      price,
      hasLike,
    } = data;

    const heart = document.createElement("i");
    heart.setAttribute(
      "class",
      hasLike ? "fa-solid fa-heart" : "fa-regular fa-heart"
    );
    heart.setAttribute("data-id", data.id);

    const mediaCardDOM = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `./assets/photographers/${photographerId}/${
        image ? image : video.replace(".mp4", ".jpg")
      }`
    );
    img.setAttribute("data-id", id);
    img.setAttribute("alt", title);
    const text = document.createElement("div");
    const name = document.createElement("p");
    name.innerText = title;
    const like = document.createElement("p");
    like.innerText = hasLike ? likes + 1 : likes;
    like.appendChild(heart);

    text.appendChild(name);
    text.appendChild(like);

    mediaCardDOM.appendChild(img);
    mediaCardDOM.appendChild(text);

    return mediaCardDOM;
  }

  function getLikeAndPriceContainerDOM(photographerData) {
    const price = `${photographerData.price}€ / jour`;
    const priceContainer = document.createElement("p");
    priceContainer.innerText = price;
    const like = getTotalLike();
    const likeContainer = document.createElement("p");
    const heart = document.createElement("i");
    heart.setAttribute("class", "fa-solid fa-heart");
    likeContainer.innerText = like;
    likeContainer.appendChild(heart);
    return [likeContainer, priceContainer];
  }

  function getLightboxContainerDOM(id, medias) {
    const imgsToDisplay = captureMedia(id, medias);
    const lightboxContainer = document.querySelector(".lightbox");
    lightboxContainer.classList.remove("close");

    const lightbox = document.createElement("div");
    const chevronLeft = document.createElement("i");
    chevronLeft.setAttribute("class", "chevron fa-solid fa-chevron-left");
    const chevronRight = document.createElement("i");
    chevronRight.setAttribute("class", "chevron fa-solid fa-chevron-right");
    const cross = document.createElement("i");
    cross.setAttribute("class", "lightbox__cross fa-solid fa-xmark");

    const imgs = document.createElement("div");
    imgs.setAttribute("class", "imgs__container");

    imgsToDisplay.forEach((media) => {
      const img = document.createElement("div");
      img.setAttribute("class", "img__container");
      const picture = document.createElement(media.image ? "img" : "video");
      const title = document.createElement("h2");

      picture.setAttribute(
        "src",
        media.image
          ? `./assets/photographers/${media.photographerId}/${media.image}`
          : `./assets/photographers/${media.photographerId}/${media.video}`
      );
      picture.setAttribute("alt", media.title);
      title.innerText = media.title;
      img.appendChild(picture);
      img.appendChild(title);
      imgs.appendChild(img);
    });

    lightbox.appendChild(chevronLeft);
    lightbox.appendChild(chevronRight);
    lightbox.appendChild(cross);
    lightbox.appendChild(imgs);

    return lightbox;
  }

  function captureMedia(id, medias) {
    const indexOfId = medias.indexOf(
      medias.filter((media) => media.id === parseInt(id))[0]
    );
    const imgsToDisplay = [];
    if (indexOfId === medias.length - 1) {
      imgsToDisplay.push(medias[indexOfId - 1]);
      imgsToDisplay.push(medias[indexOfId]);
      imgsToDisplay.push(medias[0]);
    } else if (indexOfId === 0) {
      imgsToDisplay.push(medias[medias.length - 1]);
      imgsToDisplay.push(medias[indexOfId]);
      imgsToDisplay.push(medias[indexOfId + 1]);
    } else {
      imgsToDisplay.push(medias[indexOfId - 1]);
      imgsToDisplay.push(medias[indexOfId]);
      imgsToDisplay.push(medias[indexOfId + 1]);
    }

    return imgsToDisplay;
  }

  return {
    getTotalLike,
    getMediaCardDOM,
    getLikeAndPriceContainerDOM,
    getLightboxContainerDOM,
  };
};

export { mediaFactory };
