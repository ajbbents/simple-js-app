let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

//returns list of pokemon and characteristics
  function getAll() {
    return pokemonList;
  }

//add pokes to list, creates button for each poke
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

//fetches list from api
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
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

//loads pokemon details
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

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    // modalTitle.empty();
    // modalBody.empty();

    let nameElement = $('<h3>' + pokemon.name + '</h3>');
    let imageElement = $('<img class="pokemon-img">');
    imageElement.attr("src", pokemon.imageURL);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let typeElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
  }

  function hideModal() {
    modalContainer.classList.remove('show-modal');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('show-modal')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
