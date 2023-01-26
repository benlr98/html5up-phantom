(function () {
  let foodButtonElement = document.getElementById("foodButton");
  let lifestyleButtonElement = document.getElementById("lifestyleButton");
  let pageSelectionButtonElement = document.querySelectorAll(
    "#pageSelection li a"
  );

  // only assigned {} after successful call to instagram API
  let instagramData = null;

  pageSelectionButtonElement.forEach((button) => {
    button.addEventListener("click", changeClassList);
  });

  function changeClassList(e) {
    let buttonClassList = e.target.classList;
    let primary = buttonClassList.contains("primary");
    let buttonPressed = e.target.innerHTML.toString().toLowerCase();

    if (buttonPressed === "food") {
      e.target.classList.add("primary");
      lifestyleButtonElement.classList.remove("primary");
      insertArticles("recipe");
    } else if (buttonPressed === "lifestyle") {
      e.target.classList.add("primary");
      foodButtonElement.classList.remove("primary");
      insertArticles("lifestyle");
    }
  }

  async function getInstaData() {
    let response = await fetch(
      `/.netlify/functions/getInstaData?selection=test`
    );
    instagramData = await response.json();
    return instagramData;
  }

  async function createArticleElementsArray(selection) {
    let data = instagramData || (await getInstaData());
    let articleElementsArray = [];
    // regex to find all hashtags in a given string
    let findHashtagsRegex = /#\w*/g;
    let showRecipes = selection === "recipe" ? true : false;
    // filtered based on 'food' or 'lifestyle'
    let filteredReels = await data.filter((reel) => {
      let hashtagArray = reel.caption.match(findHashtagsRegex);
      // deal with reels that have no hashtags
      hashtagArray = hashtagArray === null ? [] : hashtagArray;
      let isRecipe = hashtagArray.includes(`#recipe`);
      if (showRecipes) {
        return isRecipe;
      } else {
        return !isRecipe;
      }
    });

    filteredReels.forEach((post) => {
      let articleElement = document.createElement("article");

      // create post title from first #used in the post.caption
      let hashtagArray = post.caption.match(findHashtagsRegex);
      let articleTitle = hashtagArray === null ? "" : hashtagArray[0];

      articleElement.innerHTML = `
      <span class='image'>
        <img src=${post.thumbnail_url} alt='${post.caption}' />
      </span>
      <a href='article.html?id=${post.id}'>
        <h2>${articleTitle}</h2>
        <div class='content'>
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

  async function insertArticles(selection) {
    let articleElementsArray = await createArticleElementsArray(selection);
    let tilesSectionElement = document.querySelector(".tiles");
    tilesSectionElement.innerHTML = "";

    articleElementsArray.forEach((article) => {
      tilesSectionElement.append(article);
    });
  }

  insertArticles("recipe");
})();

