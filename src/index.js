import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEll = document.querySelector('#search-box');
inputEll.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
const countryListEll = document.querySelector('.country-list');
const countryInfoEll = document.querySelector('.country-info');

function searchCountry(e) {
  let name = e.target.value.trim();
  if (name === '') {
    clearContent();
  } else {
    makeContent(name);
  }
}

function makeContent(name) {
  fetchCountries(name)
    .then(country => {
      if (country.length > 10) {
        clearContent();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (country.length >= 2 && country.length <= 10) {
        clearContent();
        countryList(country);
        return;
      }
      if ((country.length = 1)) {
        clearContent();
        countryList(country);
        countryInfo(country);
        return;
      }
    })
    .catch(error => {
      clearContent();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function countryInfo(country) {
  const markUp = country.map(({ capital, population, languages }) => {
    return `<b>Capital: ${capital}</b>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>`;
  });
  countryInfoEll.innerHTML = markUp.join('');
}

function countryList(country) {
  const markUp = country.map(({ name: { common }, flags: { svg } }) => {
      return `<li>
    <img src=${svg} width='80'></img>
    <h1>${common}</h1></li>`;
  });
  countryListEll.innerHTML = markUp.join('');
}

function clearContent() {
  countryListEll.innerHTML = '';
  countryInfoEll.innerHTML = '';
}


    


