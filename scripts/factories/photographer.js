const photographerFactory = (data) => {
  const { name, portrait, id, country, city, tagline, price } = data;

  const picture = `./assets/photographers/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Create a link with img and name

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("alt", name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    link.appendChild(img);
    link.appendChild(h2);

    // Create a block of text with location, tagline and price bellow link

    const description = document.createElement("div");
    const locationPhotographer = document.createElement("p");
    locationPhotographer.innerText = `${city}, ${country}`;
    const taglineText = document.createElement("p");
    taglineText.innerText = `${tagline}`;
    const priceText = document.createElement("p");
    priceText.innerText = `${price}€/jour`;

    description.appendChild(locationPhotographer);
    description.appendChild(taglineText);
    description.appendChild(priceText);

    article.appendChild(link);
    article.appendChild(description);
    return article;
  }

  function getUserHeaderTextDOM() {
    const description = document.createElement("div");
    const title = document.createElement("h1");
    title.innerText = name;
    const locationPhotographer = document.createElement("p");
    locationPhotographer.innerText = `${city}, ${country}`;
    const taglineText = document.createElement("p");
    taglineText.innerText = `${tagline}`;

    description.appendChild(title);
    description.appendChild(locationPhotographer);
    description.appendChild(taglineText);

    return description;
  }

  function getUserAvatarDOM() {
    const avatar = document.createElement("img");
    avatar.setAttribute("alt", name);
    avatar.setAttribute("src", picture);

    return avatar;
  }

  return {
    name,
    picture,
    getUserCardDOM,
    getUserHeaderTextDOM,
    getUserAvatarDOM,
  };
};

// const mediaFactory = (data) => {
//   const { media } = data;

//   function getUserAvatarDOM() {
//     console.log(media);
//   }

//   return { getUserAvatarDOM };
// };

export { photographerFactory };
