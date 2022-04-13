require('dotenv').config();
const fetch = require('node-fetch');

const GetFoodData = async () => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.FOOD_API_KEY}&number=${process.env.FOOD_API_MAX_RESULT}`
  );

  return response.json();
};

module.exports = GetFoodData;
