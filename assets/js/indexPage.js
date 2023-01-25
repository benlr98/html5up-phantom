let foodButtonElement = document.getElementById('foodButton');
let lifestyleButtonElement = document.getElementById('lifestyleButton');
let pageSelectionButtonElement = document.querySelectorAll('#pageSelection li a');

pageSelectionButtonElement.forEach(button => {
  button.addEventListener('click', changeClassList);
})

function changeClassList(e) {
  let buttonClassList = e.target.classList;
  let primary = buttonClassList.contains('primary');
  let buttonPressed = e.target.innerHTML.toString().toLowerCase();
  
  if(buttonPressed === 'food') { 
    e.target.classList.add('primary');
    lifestyleButtonElement.classList.remove('primary');
  } else if (buttonPressed === "lifestyle") {
    e.target.classList.add("primary");
    foodButtonElement.classList.remove("primary");
  }
}

async function getInstaData(selection) {
  let response = await fetch(`/.netlify/functions/getInstaData?selection=${selection}`);
  let mediaData = await response.json();
  return mediaData;
}

async function createArticleElementsArray(view) {
  let data = await getInstaData(view);
  let reelsArray = data.data.filter((post) => post.thumbnail_url !== undefined);
  let articleElementsArray = [];
  let regex = /#\w*/g;

  reelsArray.forEach(post => {
    let articleElement = document.createElement("article");

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
  tilesSectionElement.innerHTML = "";

  articleElementsArray.forEach(article => {
    tilesSectionElement.append(article);
  });
}

insertArticles();



