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

    article.appendChild(link);

    return article;
  }

  return {
    name,
    picture,
    getUserCardDOM,
  };
};

export { photographerFactory };
