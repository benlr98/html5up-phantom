const axios = require("axios");
require("dotenv").config();

const handler = async (event) => {
  try {
    const idParam = event.queryStringParameters.id || "World";
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${idParam}` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
