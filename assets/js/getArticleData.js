


(function() {
  let url = new URL(window.location.href);
  let idParam = url.searchParams.get("id");

  // get data for a specific instagram post 
  async function getArticleData() {
    let response = await fetch(`/.netlify/functions/getArticleData?id=${idParam}`);
    let data = await response.json();
    console.log(data);
    return data;
  }

  getArticleData();





})();
