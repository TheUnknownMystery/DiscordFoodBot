const axios = require('axios');

module.exports = async (url) => {
  const { data } = await axios.get(
    'https://api.sightengine.com/1.0/check.json',
    {
      params: {
        url,
        models: 'nudity,wad,gore',
        api_user: process.env.IMAGE_SAFETY_API_USER,
        api_secret: process.env.IMAGE_SAFETY_API_SECRET,
      },
    }
  );

  return data;
};
