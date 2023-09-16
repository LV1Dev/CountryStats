const searchBtn = document.querySelector('#search-btn');
const countryInput = document.querySelector('#country-input');
const countryInfo = document.querySelector('#country-info');

searchBtn.addEventListener('click', function() {
	const countryName = countryInput.value.trim();

	if (countryName) {
		fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
			.then(response => response.json())
			.then(data => {
				if (data.status === 404) {
					countryInfo.innerHTML = 'Country not found';
				} else {
					const country = data[0];
					const capital = country.capital ? country.capital[0] : 'N/A';
					const currencyCode = Object.keys(country.currencies)[0];
					const currency = `${country.currencies[currencyCode].name} (${currencyCode})`;
					countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <p>Official Name: ${country.name.official}</p>
            <p>Alternate Spellings: ${country.altSpellings[1]}</p>
            <p>Alpha-2 Code: ${country.cca2}</p>
            <p>CIOC Code: ${country.cioc}</p>
            <p>Region: ${country.region}</p>
            <p>Subregion: ${country.subregion}</p>
            <p>Population: ${country.population}</p>
            <p>Capital city: ${capital}</p>
            <p>Official language: ${Object.values(country.languages)[0]}</p>
            <p>Currency: ${currency}</p>
          `;
				}
			})
			.catch(error => console.log(error));
	} else {
		countryInfo.innerHTML = 'Please enter a country name';
	}
});