import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

// Pавантаження даних
function setVisible(el, type = 'hide') {
  if (type == 'hide') {
    // el.style.display = 'none';
    el.classList.add('hide');
    el.classList.remove('show');
  } else {
    // el.style.display = 'block';
    el.classList.add('show');
    el.classList.remove('hide');
  }
}

// За замовчуванням ховаємо повідомлення про помилку
setVisible(error, 'hide');
setVisible(breedSelect, 'hide');
setVisible(catInfo, 'hide');

// Виконуємо запит і наповнюємо select опціями
fetchBreeds()
  .then(breeds => {
    if (typeof breeds == 'undefined') {
      setVisible(error, 'show');
      setVisible(loader, 'hide');
    } else {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.reference_image_id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      new SlimSelect({
        select: '.breed-select',
      });

      // Після завантаження даних, приховуємо лоадер
      setVisible(loader, 'hide');

      // Показуємо наповнений список
      setVisible(breedSelect, 'show');
    }
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
  });

// Обробка події вибору породи у селекті
breedSelect.addEventListener('change', async function () {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    setVisible(loader, 'show');
    setVisible(catInfo, 'hide');
    setVisible(error, 'hide');

    try {
      const catData = await fetchCatByBreed(selectedBreedId);
      console.log('catData: ', catData);

      if (typeof catData == 'undefined') {
        setVisible(error, 'show');
        setVisible(loader, 'hide');
        setVisible(catInfo, 'hide');
      } else {
        const { name, description, temperament } = catData.breeds[0];

        catInfo.innerHTML = `<img src="${catData.url}" alt="">
                                              <div class="text-holder">
                                                  <h1 class="title">${name}</h1>
                                                  <h3 class="temperament">${temperament}</h3>
                                                  <p class="desk">${description}</p>
                                              </div>`;
        setVisible(catInfo, 'show');
        setVisible(loader, 'hide');
        setVisible(error, 'hide');
      }
    } catch (error) {
      console.error('Error fetching cat:', error);
      setVisible(error, 'show');
      setVisible(loader, 'hide');
    }
  }
});
