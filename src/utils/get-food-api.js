require('dotenv').config();
const fetch = require('node-fetch');

const GetFoodByName = async (search_query) => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.FOOD_API_KEY}&query=${search_query}`
  );

  return response.json();
};

const GetFoodData = async () => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.FOOD_API_KEY}&number=${process.env.FOOD_API_MAX_RESULT}`
  );

  return response.json();
};

module.exports = { GetFoodData, GetFoodByName };
