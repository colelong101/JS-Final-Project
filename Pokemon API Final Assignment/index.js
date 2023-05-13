const pokemonDropdownElement = document.getElementById('pokemon-dropdown');
const pokemonDetailsElement = document.getElementById('pokemon-details');

// fetches the gen 1 pokemon
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        const pokemonList = data.results;
        pokemonList.forEach(pokemon => {
            const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            const option = document.createElement('option');
            option.value = pokemon.url;
            option.textContent = pokemonName;
            pokemonDropdownElement.appendChild(option);
        });

        pokemonDropdownElement.addEventListener('change', () => {
            const selectedPokemonUrl = pokemonDropdownElement.value;
            fetchPokemonDetails(selectedPokemonUrl);
        });
    });

function fetchPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const pokemonId = data.id;
            const pokemonTypes = data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));
            const pokemonSprite = data.sprites.front_default;

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            const nameElement = document.createElement('p');
            nameElement.textContent = `Name: ${pokemonName}`;

            const idElement = document.createElement('p');
            idElement.textContent = `Pokedex Number: ${pokemonId}`;

            const typesElement = document.createElement('p');
            typesElement.textContent = `Types: ${pokemonTypes.join(', ')}`;

            const spriteElement = document.createElement('img');
            spriteElement.src = pokemonSprite;
            spriteElement.alt = `${pokemonName} sprite`;

            pokemonCard.appendChild(nameElement);
            pokemonCard.appendChild(idElement);
            pokemonCard.appendChild(typesElement);
            pokemonCard.appendChild(spriteElement);

            pokemonDetailsElement.innerHTML = '';
            pokemonDetailsElement.appendChild(pokemonCard);
        });
}
