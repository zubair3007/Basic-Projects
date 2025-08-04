 async function fetchCountry() {
      const input = document.getElementById('countryInput').value.trim();
      const countryInfo = document.getElementById('countryInfo');
      const loading = document.getElementById('loading');
      const error = document.getElementById('error');

      // Clear previous content
      countryInfo.innerHTML = '';
      error.style.display = 'none';
      loading.style.display = 'block';

      // Validate input
      if (!input) {
        loading.style.display = 'none';
        error.style.display = 'block';
        error.textContent = 'Please enter a country name';
        return;
      }

      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fullText=true`);
        if (!response.ok) throw new Error('Country not found or invalid request');
        const [data] = await response.json();

       

        // Extract data safely
        const flag = data.flags?.png || '';
        const name = data.name?.common || 'Unknown';
        const capital = data.capital?.[0] || 'N/A';
        const population = data.population ? data.population.toLocaleString() : 'N/A';
        const currency = data.currencies ? Object.values(data.currencies)[0]?.name || 'N/A' : 'N/A';

        // Render country card
        countryInfo.innerHTML = `
          <div class="country-card">
            ${flag ? `<img src="${flag}" alt="${name} flag">` : ''}
            <h2>${name}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Currency:</strong> ${currency}</p>
          </div>
        `;
      } catch (err) {
        error.style.display = 'block';
        error.textContent = err.message;
      } finally {
        loading.style.display = 'none';
      }
    }

    // Add Enter key listener
    document.getElementById('countryInput').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission or other default behavior
        fetchCountry(); // Trigger the same fetch function
      }
    });