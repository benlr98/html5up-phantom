{
  /* 

<article class="style1">
  <span class="image">
    <img src="images/pic03.jpg" alt="" />
  </span>
  <a href="generic.html">
    <h2>Magna</h2>
    <div class="content">
      <p>
        Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et
        feugiat.
      </p>
    </div>
  </a>
</article>; 

*/
}



async function getInstaData() {
  // Beginning date of Andrea's food reels, converted from miliseconds to seconds
  const since = new Date("2022-05-01").getTime() / 1000;
  // todays current time in unix timestamp
  const until = Math.floor(Date.now() / 1000);
  //TODO: remove access token into secure .env file
  let accessToken =
    "";

  let fields =
    "id,media_type,media_url,permalink,thumbnail_url,timestamp,username,caption";

  let instaDataUrl = `https://graph.instagram.com/v15.0/me/media?fields=${fields}&since=${since}&until=${until}&access_token=${accessToken}`;


  let response = await fetch(instaDataUrl);
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
      <a href="generic.html">
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



