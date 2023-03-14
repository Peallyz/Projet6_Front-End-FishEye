const mediaFactory = (data, photographerName) => {
  const heart = document.createElement("i");
  heart.setAttribute("class", "fa-solid fa-heart");
  function getTotalLike() {
    let totalLikes = 0;
    data.map((el) => (totalLikes += el.likes));
    return totalLikes;
  }

  function getMediaCardDOM() {
    let { id, photographerId, title, image, video, likes, date, price } = data;

    const mediaCardDOM = document.createElement("article");
    const img = document.createElement("img");
    console.log(image);
    img.setAttribute(
      "src",
      `./assets/photographers/${photographerName.replace(" ", "_")}/${
        image ? image : video.replace(".mp4", ".jpg")
      }`
    );
    img.setAttribute("alt", title);
    const text = document.createElement("div");
    const name = document.createElement("p");
    name.innerText = title;
    const like = document.createElement("p");
    like.innerText = likes;
    like.appendChild(heart);

    text.appendChild(name);
    text.appendChild(like);

    mediaCardDOM.appendChild(img);
    mediaCardDOM.appendChild(text);

    return mediaCardDOM;
  }

  return { getTotalLike, getMediaCardDOM };
};

export { mediaFactory };
