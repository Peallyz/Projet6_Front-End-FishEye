
const mediaFactory = (data) => {


  function getTotalLike() {
      let totalLikes = 0
    data.map(el => totalLikes += el.likes)
    return totalLikes
  }

  return { getTotalLike };
};

export {mediaFactory};