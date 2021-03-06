let pokemonRepository = (function () {
  let pokemonList = [];
/*  {name: 'Hypno', type: 'psychic', height: 1.6},
    {name: 'Jigglypuff', type: ['fairy', ' normal'], height: 0.5},
    {name: 'Liepard', type: 'dark', height: 1.1},
    {name: 'Muk', type: 'poison', height: 1.2},
    {name: 'Palkia', type: ['dragon', ' water'], height: 4.2},
    {name: 'Rattata', type: ['normal', ' dark'], height: 0.3} */
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

//returns list of pokemon and characteristics
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // now we add the details to the listItem
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //logs individual details in console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  pokemonRepository.showDetails(pokemon);
  });
});

//  document.write(pokemon.name + ": (height: " + pokemon.height + ") " + pokemon.type + "<br>");})
//  pokemonRepository.add(pokemon);
