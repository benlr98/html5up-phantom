async function getInstaData() {
  let response = await fetch(`/.netlify/functions/getInstaData`);
  let mediaData = await response.json();
  return mediaData;
}

async function createArticleElementsArray() {
  let data = await getInstaData();
  let reelsArray = data.data.filter((post) => post.thumbnail_url !== undefined);
  let articleElementsArray = [];
  let regex = /#\w*/g;

  reelsArray.forEach(post => {
    let articleElement = document.createElement("article");
    // TODO: decide whether I want an overlay class of some sort using next two lines
    // let styleNumber = Math.floor(Math.random() * 6)
    // articleElement.className = `style${styleNumber === 0 ? 1 : styleNumber}`;

    // create post title from first #used in the post.caption
    let hashtagArray = post.caption.match(regex);
    let articleTitle = hashtagArray === null ? '#recipe' : hashtagArray[0];

    articleElement.innerHTML = `
      <span class="image">
        <img src=${post.thumbnail_url} alt="${post.caption}" />
      </span>
      <a href="article.html?id=${post.id}">
        <h2>${articleTitle}</h2>
        <div class="content">
          <p>
            ${post.caption.slice(0, 70) + "..."}
          </p>
        </div>
      </a>
    `;

    articleElementsArray.push(articleElement);
  });


  return articleElementsArray;
}

async function insertArticles() {
  let articleElementsArray = await createArticleElementsArray();
  let tilesSectionElement = document.querySelector(".tiles");

  articleElementsArray.forEach(article => {
    tilesSectionElement.append(article);
  });
}

insertArticles();



