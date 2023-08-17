import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_EtLWo98VgPE8Xx0YsayrbmInv8yjYkfjc5VeMNYYKf7SGIZFjh6QvuboPJxpKAbk;';

// Функція для виконання HTTP GET-запиту за колекцією порід
async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error(`Axios error! ${error.message}`);
  }
}

// Функція для виконання HTTP GET-запиту за інформацією про кота за ідентифікатором породи
async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/${breedId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Axios error! ${error.message}`);
  }
}

export { fetchBreeds, fetchCatByBreed };
