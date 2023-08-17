import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

// Pавантаження даних
function setLoading(type = 'none') {
  loader.style.display = type;
}

// Показуємо блок помилки
function setError(type = 'none') {
  error.style.display = type;
}
setError();

// Виконуємо запит і наповнюємо select опціями
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.reference_image_id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Після завантаження даних, приховуємо лоадер
    setLoading();
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
  });

// Обробка події вибору породи у селекті
breedSelect.addEventListener('change', async function () {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    setLoading('block');

    try {
      const catData = await fetchCatByBreed(selectedBreedId);
      console.log('catData: ', catData);

      const { name, description, temperament } = catData.breeds[0];

      catInfo.innerHTML = `<img src="${catData.url}" alt="">
                                            <div class="text-holder">
                                                <h1 class="title">${name}</h1>
                                                <h3 class="temperament">${temperament}</h3>
                                                <p class="desk">${description}</p>
                                            </div>`;
    } catch (error) {
      console.error('Error fetching cat:', error);
      setLoading();
    }
  }
});
