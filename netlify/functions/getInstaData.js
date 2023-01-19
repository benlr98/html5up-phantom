

exports.handler = async function (event, context) {
  // your server-side functionality

  try {
    const subject = event.queryStringParameters.name || 'World';

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` })
    }
    
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
};
