require('dotenv').config();
const fetch = require('node-fetch');

async function GetFoodData() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.FOOD_API_KEY}&number=${process.env.FOOD_API_MAX_RESULT}`
  );

  return response.json();
}

module.exports = GetFoodData;
