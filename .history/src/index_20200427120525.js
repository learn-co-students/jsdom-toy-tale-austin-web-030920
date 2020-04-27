let addToy = false;

document.addEventListener("DOMContentLoaded", () => {


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => displayToys(json));

  toyFormContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target[0].value
    let image = event.target[1].value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        image
      })
    })
    .then(resp => resp.json())
    .then(addToyToCollection)

  });
});

function displayToys(json) {
  let collection = document.getElementById('toy-collection')
  json.forEach(toy => {
    let card = createToyCard(toy);
    collection.appendChild(card)
  });
  
  
}

function addToyToCollection (toy) {
  let newCard = createToyCard(toy);
  let collection = document.getElementById('toy-collection')
  collection.appendChild(newCard);
}

function createToyCard(toy) {

  const card = document.createElement('div');
  card.className = 'card';

  let toyName = document.createElement('h2');
  toyName.innerText = toy.name;
  card.appendChild(toyName);

  let toyAvatar = document.createElement('img');
  toyAvatar.src = toy.image;
  toyAvatar.className = 'toy-avatar';
  card.appendChild(toyAvatar);

  let toyLikes = document.createElement('p');
  toyLikes.innerText = toy.likes;
  card.appendChild(toyLikes);

  let likeButton = document.createElement('button');
  likeButton.className = 'like-button';
  likeButton.innerHTML = 'Like &hearts;'
  card.appendChild(likeButton);
}
