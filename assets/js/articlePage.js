


(function() {
  let url = new URL(window.location.href);
  let idParam = url.searchParams.get("id");
  let h1Element = document.querySelector('#main h1');
  let imgElement = document.querySelector('#main img');
  let pElement = document.querySelector('#main p');


  // get data for a specific instagram post 
  async function getArticleData() {
    let response = await fetch(`/.netlify/functions/getArticleData?id=${idParam}`);
    let data = await response.json();
    console.log(data);
    return data;
  }

  async function replaceElementsWithData(){
    let data = await getArticleData();

    let regex = /#\w*/g;
    // create post title from first #used in the post.caption
    let hashtagArray = data.caption.match(regex);
    let articleTitle = hashtagArray === null ? "#recipe" : hashtagArray[0];

    let newTitleElement = document.createElement('h1');
    newTitleElement.innerHTML = articleTitle;

    h1Element.replaceWith(newTitleElement);
    pElement.innerHTML = `
        <span class="image left">
         
          <video class="image" disablepictureinpicture  controlslist="nodownload" controls="nodownload" autoplay="" name="media">
            <source
              src="${data.media_url}"
              type="video/mp4"
            >
          </video>
        </span>
        ${data.caption}
    `;
  };

  replaceElementsWithData();





})();
