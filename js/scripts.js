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

  function showDetails(pokemon) {
    // let button = document.querySelector('.button-class')
    // button.classList.add('show-modal');
    // button.addEventListener('click', function() {
    //   showModal(pokemon);
    // });

    let modalContainer = document.querySelector('#modal');
    modalContainer.classList.add('.show-modal');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal')

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Be gone now';
    closeButtonElement.addEventListener('click', hideModal);

    modal.appendChild(closeButtonElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('show-modal')
  }

  // function showModal(pokemon) {
  //
  //   let modalContainer = document.querySelector('#modal');
  //   modalContainer.innerHTML = '';
  //   let modal = document.createElement('div');
  //   modal.classList.add('modal')
  //
  //   let closeButtonElement = document.createElement('button');
  //   closeButtonElement.classList.add('modal-close');
  //   closeButtonElement.innerText = 'Be gone now';
  //   closeButtonElement.addEventListener('click', hideModal);
  //
  //   modal.appendChild(closeButtonElement);
  //   modalContainer.appendChild(modal);
  //   modalContainer.classList.add('is-visible');
  // }

  function hideModal() {
    modalContainer.classList.remove('show-modal');
  }

  // window.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });
  //
  // let modalContainer = document.querySelector('#modal');
  // modalContainer.addEventListener('click', (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });
  //
  // if I have this active, it tells me that it can't read the properties
  // of null in the eventListener.
  // document.querySelector('#show-modal').addEventListener('click', () => {
  //   showDetails(pokemon);
  // });

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
