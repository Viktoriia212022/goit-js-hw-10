export { fetchCountries };

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,captail,population,flags,languages`
    ).then(res => {
        return res.json();
      
    });
    
};