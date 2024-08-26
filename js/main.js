document.addEventListener('DOMContentLoaded', () => {
    const cryptoList = document.getElementById('root');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');

    async function fetchCryptos() {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const data = await response.json();
        return data;
    }

    function displayCryptos(cryptos) {
        cryptoList.innerHTML = '';
        cryptos.forEach(crypto => {
            const cryptoCard = document.createElement('div');
            cryptoCard.classList.add('crypto-card');
            cryptoCard.innerHTML = `
                <img src="${crypto.image}" alt="${crypto.name}">
                <h2>${crypto.name}</h2>
                <p>Precio: $${crypto.current_price}</p>
                <p>Cap. Mercado: $${crypto.market_cap}</p>
            `;
            cryptoList.appendChild(cryptoCard);
        });
    }

    function filterCryptos(cryptos, searchTerm, filterTerm) {
        return cryptos.filter(crypto => {
            const matchesSearch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterTerm ? crypto.categories && crypto.categories.includes(filterTerm) : true;
            return matchesSearch && matchesFilter;
        });
    }

    async function init() {
        let cryptos = await fetchCryptos();
        displayCryptos(cryptos);

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value;
            const filterTerm = filterSelect.value;
            const filteredCryptos = filterCryptos(cryptos, searchTerm, filterTerm);
            displayCryptos(filteredCryptos);
        });

        filterSelect.addEventListener('change', () => {
            const searchTerm = searchInput.value;
            const filterTerm = filterSelect.value;
            const filteredCryptos = filterCryptos(cryptos, searchTerm, filterTerm);
            displayCryptos(filteredCryptos);
        });
    }

    init();
});
