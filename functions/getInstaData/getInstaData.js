const axios = require("axios");
require('dotenv').config();


const handler = async (event) => {

  // either 'food' or 'lifestlye'
  const selection = event.queryStringParameters.selection;

  const fields = "id,media_type,media_url,permalink,thumbnail_url,timestamp,username,caption";
  // Date of Andrea's earliest food reels, converted from miliseconds to seconds
  const since = new Date("2022-05-01").getTime() / 1000;
  // todays current time in unix timestamp
  const until = Math.floor(Date.now() / 1000);
  const accessToken = process.env.INSTA_TOKEN;
  const instaPostsUrl = `https://graph.instagram.com/v15.0/me/media?fields=${fields}&since=${since}&until=${until}&access_token=${accessToken}`;


  try {
    
    const { data } = await axios.get(instaPostsUrl);
    let onlyReelsArray = data.filter(
      (post) => post.thumbnail_url !== undefined
    );
    let regex = /#\w*/g;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { message, code } = error;
    return { 
      statusCode: 500, 
      body: JSON.stringify({message, code}) 
    }
  }
}

module.exports = { handler }
