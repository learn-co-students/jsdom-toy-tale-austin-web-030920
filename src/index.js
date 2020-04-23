let addToy = false;
let toys = [];

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    toggleToyForm();
  });

  toyForm.addEventListener("submit", (event) => {
    // stop form from submitting
    event.preventDefault();
    // get form data
    let name = event.target.elements.name.value;
    let image = event.target.elements.image.value;
    let likes = 0;

    let body = JSON.stringify({ name: name, image: image, likes: likes });

    // fetch POST /toys
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
    })
    .then( (response) => response.json() )
    .then( (toy) => {
      // hide toy form
      toggleToyForm();
      // add new toyCard to toy collection
      let collection = document.getElementById('toy-collection');
      let toyCard = createToyCard(toy.id, toy.name, toy.image, toy.likes);
      collection.appendChild(toyCard);
    });
  });



  fetch('http://localhost:3000/toys')
    .then( (response) => response.json() )
    .then( (json) => {
      let collection = document.getElementById('toy-collection');
      json.forEach( (toy) => {
        let card = createToyCard(toy.id, toy.name, toy.image, toy.likes);
        collection.appendChild(card);
      })
    });

});

const likeToy = (event) => {
  let likes = parseInt(event.target.previousElementSibling.innerText) + 1;
  let toyId = event.target.id;
  let url = 'http://localhost:3000/toys/' + toyId;


  fetch(url, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
  .then( (response) => response.json() )
  .then( (toy) => {
    event.target.previousElementSibling.innerText = toy.likes + ' likes';
  });
}
const createToyCard = (id, name, image, numLikes) => {
  let card = document.createElement('div');
  card.className = 'card';
  
  // h2 name
  let toyName = document.createElement('h2');
  toyName.innerText = name;
  card.appendChild(toyName);
  
  // img src=image class=toy-avatar
  let toyImg = document.createElement('img');
  toyImg.setAttribute('src', image);
  toyImg.className = 'toy-avatar';
  card.appendChild(toyImg);
  
  // p likes
  let toyLikes = document.createElement('p');
  toyLikes.innerText = `${numLikes} likes`;
  card.appendChild(toyLikes);

  // button class=link-btn
  let likeButton = document.createElement('button');
  likeButton.className = 'like-btn'
  likeButton.id = id;
  likeButton.innerHTML = 'Like &hearts;'
  likeButton.addEventListener('click', likeToy);
  card.appendChild(likeButton);

  return card;
}

const toggleToyForm = () => {
  const toyForm = document.querySelector(".container");
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
}