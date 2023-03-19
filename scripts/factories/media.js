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

  return { getTotalLike, getMediaCardDOM, getLikeAndPriceContainerDOM };
};

export { mediaFactory };
