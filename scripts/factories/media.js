const mediaFactory = (data) => {
  ///Calculate number of like on all medias

  function getTotalLike() {
    let totalLikes = 0;
    data.map((el) => (totalLikes += el.likes));
    totalLikes += data.filter((media) => media.hasLike === true).length;
    return totalLikes;
  }

  //////////////////////////

  ///Return a DOM Element for each media with img, title, like

  function getMediaCardDOM(index) {
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

    // starting index at 4 cause of header and photographer data
    let mediaIndex = index + 4;

    const heart = document.createElement("i");
    heart.setAttribute(
      "class",
      hasLike ? "fa-solid fa-heart" : "fa-regular fa-heart"
    );
    heart.setAttribute("data-id", data.id);
    heart.setAttribute("aria-label", "likes");
    heart.setAttribute("tabindex", mediaIndex * 2);

    const mediaCardDOM = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `./assets/photographers/${photographerId}/${
        image ? image : video.replace(".mp4", ".jpg")
      }`
    );
    img.setAttribute("data-id", id);
    img.setAttribute("alt", `${title}, closeup view`);
    img.setAttribute("tabindex", mediaIndex * 2 - 1);
    img.setAttribute("role", "link");
    const text = document.createElement("div");
    const name = document.createElement("h2");
    name.innerText = title;
    const like = document.createElement("p");

    /// Add one like if user like current media
    like.innerText = hasLike ? likes + 1 : likes;
    like.appendChild(heart);

    text.appendChild(name);
    text.appendChild(like);

    mediaCardDOM.appendChild(img);
    mediaCardDOM.appendChild(text);

    return mediaCardDOM;
  }

  //////////////////////////

  ///Return the bottom left container with price and all Like

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

  //////////////////////////

  function getLightboxContainerDOM(id, medias) {
    openLightBox();

    const lightboxContainer = document.querySelector(".lightbox");
    lightboxContainer.innerHTML = "";

    const imgsToDisplay = captureMedia(id, medias);

    const lightbox = document.createElement("div");

    /// create icons and add them listerners and class for style

    const chevronLeft = document.createElement("i");
    chevronLeft.setAttribute("class", "chevron fa-solid fa-chevron-left");
    chevronLeft.setAttribute("aria-label", "Previous image");

    const chevronRight = document.createElement("i");
    chevronRight.setAttribute("class", "chevron fa-solid fa-chevron-right");
    chevronRight.setAttribute("aria-label", "Next image");

    const cross = document.createElement("i");
    cross.setAttribute("class", "lightbox__cross fa-solid fa-xmark");
    cross.setAttribute("aria-label", "Close dialog");
    lightbox.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && closeLightbox()
    );
    cross.addEventListener("click", () => closeLightbox());

    //////////////////////////

    ///Create every DOM Elements and apprend to this main to return it

    const imgs = document.createElement("div");
    imgs.setAttribute("class", "medias__container");

    imgsToDisplay.forEach((media) => {
      const container = document.createElement("div");
      container.setAttribute("class", "container");
      const dataContainer = document.createElement("div");
      dataContainer.setAttribute("class", "media__container");
      const img = document.createElement(media.image ? "img" : "video");
      const title = document.createElement("h2");

      img.setAttribute(
        "src",
        media.image
          ? `./assets/photographers/${media.photographerId}/${media.image}`
          : `./assets/photographers/${media.photographerId}/${media.video}`
      );
      img.setAttribute("alt", media.title);
      img.setAttribute("class", "lightbox__media");
      if (media.video) {
        img.setAttribute("type", "video/mp4");
        img.setAttribute("loop", "true");
        if (media === imgsToDisplay[1]) img.setAttribute("autoplay", "true");
      }
      title.innerText = media.title;
      dataContainer.appendChild(img);
      dataContainer.appendChild(title);
      container.appendChild(dataContainer);
      imgs.appendChild(container);
    });

    lightbox.appendChild(chevronLeft);
    lightbox.appendChild(chevronRight);
    lightbox.appendChild(cross);
    lightbox.appendChild(imgs);

    //////////////////////////

    return [lightbox, imgsToDisplay];
  }

  ///Capture the currentMedia and the one before and after, return an array of 3 media

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

  ///OpenLightbox and display none everything else

  function openLightBox() {
    const lightboxContainer = document.querySelector(".lightbox");
    const header = document.querySelector(".main_header");
    const main = document.querySelector("#main");
    header.classList.add("close");
    main.classList.add("close");
    lightboxContainer.classList.remove("close");
  }

  //////////////////////////

  ///CloseLightbox and display block everything else

  function closeLightbox() {
    const lightboxContainer = document.querySelector(".lightbox");
    const header = document.querySelector(".main_header");
    const main = document.querySelector("#main");
    header.classList.remove("close");
    main.classList.remove("close");
    lightboxContainer.classList.add("close");
  }

  //////////////////////////

  return {
    getTotalLike,
    getMediaCardDOM,
    getLikeAndPriceContainerDOM,
    getLightboxContainerDOM,
  };
};

export { mediaFactory };
