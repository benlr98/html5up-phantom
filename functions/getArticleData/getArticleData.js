const axios = require("axios");
require("dotenv").config();

const handler = async (event) => {
  const postIdParam = event.queryStringParameters.id;
  const accessToken = process.env.INSTA_TOKEN;
  const fields =
    "id,media_type,media_url,permalink,thumbnail_url,timestamp,username,caption";
  const instaPostUrl = `https://graph.instagram.com/v15.0/${postIdParam}?fields=${fields}&access_token=${accessToken}`;
  
  try {
    const { data } = await axios.get(instaPostUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { message, code } = error;
    return {
      statusCode: 500,
      body: JSON.stringify({ message, code }),
    };
  }
};

module.exports = { handler };
