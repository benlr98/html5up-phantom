const axios = require("axios");
require('dotenv').config();


const handler = async (event) => {

  const fields = "id,media_type,media_url,permalink,thumbnail_url,timestamp,username,caption";
  // Date of Andrea's earliest food reels, converted from miliseconds to seconds
  const since = new Date("2022-05-01").getTime() / 1000;
  // todays current time in unix timestamp
  const until = Math.floor(Date.now() / 1000);
  const accessToken = process.env.INSTA_TOKEN;
  const instaPostsUrl = `https://graph.instagram.com/v15.0/me/media?fields=${fields}&since=${since}&until=${until}&access_token=${accessToken}`;


  try {
    
    const { data } = await axios.get(instaPostsUrl);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      // body: JSON.stringify({ message: `Hello ${subject}, token: ${process.env.TEST_TOKEN}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
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
