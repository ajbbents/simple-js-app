let pokemonRepository=function(){let e=[];function a(a){e.push(a)}function b(){return e}function c(a){d(a).then(function(){f(a),console.log(a)})}function d(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.height=b.height,a.weight=b.weight,a.types=b.types.map(a=>a.type.name).join(", "),a.abilities=b.abilities.map(a=>a.ability.name).join(", ")}).catch(function(a){console.error(a)})}function f(a){let b=$(".modal-body"),c=$(".modal-title");c.empty(),b.empty();let e=$("<h3>"+a.name+"</h3>"),d=$('<img class="pokemon-img">');d.attr("src",a.imageUrl);let f=$("<p>Height: "+a.height+"</p>"),g=$("<p>Weight: "+a.weight+"</p>"),h=$("<p>Types: "+a.types+"</p>"),i=$("<p>Abilities: "+a.abilities+"</p>");c.append(e),b.append(d),b.append(f),b.append(g),b.append(h),b.append(i)}return{add:a,getAll:b,addListItem:function(d){let e=document.querySelector(".list-group-horizontal"),b=document.createElement("li");b.classList.add("group-list-item");let a=document.createElement("button");a.classList.add("pokemonButton"),a.innerText=d.name,a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#pokemon-modal"),$(a).addClass("button-class btn-block btn m1"),a.classList.add("button-class"),b.appendChild(a),e.appendChild(b),a.addEventListener("click",function(){c(d)})},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(a){return a.json()}).then(function(b){b.results.forEach(function(b){a({name:b.name,detailsUrl:b.url})})}).catch(function(a){console.error(a)})},loadDetails:d,showDetails:c}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})})
