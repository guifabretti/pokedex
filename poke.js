const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon_gif');
const form = document.querySelector('#formulario');
const input = document.querySelector('#input-search');

const botaoAnte = document.querySelector('#botao-anterior');
const botaoProx = document.querySelector('#botao-proximo');

let searchPokemon = 1;

// modal
const pokemonImage2 = document.querySelector('.pokemon-img-2');

//audio
const audio = new Audio();
audio.src = "audios/click.mp3";

async function fetchPokemon(pokemon) {
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIresponse.status == 200) {
    const data = await APIresponse.json();
    return data;
  }
}

async function fetchPokemonType(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (response.status === 200) {
    const data = await response.json();
    return data.types[0].type.name; // Retorna o nome do primeiro tipo do Pokémon
  }
  return null;
}

const getTypeColor = (type) => {
  const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
  };

  return colors[type] || 'gray'; // Retorna a cor correspondente ao tipo ou 'gray' se não houver correspondência
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Pesquisando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    const pokemonType = await fetchPokemonType(pokemon);
    if (pokemonType) {
      pokemonImage2.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
      pokemonImage2.style.backgroundColor = getTypeColor(pokemonType); // Define o background color com base no tipo do Pokémon
    }

    // Atualiza as habilidades do Pokémon
    const abilities = data.abilities
    if (abilities.length > 0) {
        document.querySelector('.pokemon-abilities-1').innerHTML = capitalizeFirstLetter(abilities[0].ability.name);
        if (abilities.length > 1) {
          document.querySelector('.pokemon-abilities-2').innerHTML = capitalizeFirstLetter(abilities[1].ability.name);
        }
    }

    // Atualiza as estatísticas do Pokémon
    const stats = data.stats;
    if (stats.length >= 6) {
        document.querySelector('.pokemon-stats-1').innerHTML = stats[0].base_stat;
        document.querySelector('.pokemon-stats-2').innerHTML = stats[1].base_stat;
        document.querySelector('.pokemon-stats-3').innerHTML = stats[2].base_stat;
        document.querySelector('.pokemon-stats-4').innerHTML = stats[3].base_stat;
        document.querySelector('.pokemon-stats-5').innerHTML = stats[4].base_stat;
        document.querySelector('.pokemon-stats-6').innerHTML = stats[5].base_stat;
    }

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não Encontrado';
    pokemonNumber.innerHTML = '??';
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

botaoAnte.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

botaoProx.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
