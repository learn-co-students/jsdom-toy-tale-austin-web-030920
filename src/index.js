let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  document.getElementsByClassName("add-toy-form")[0].addEventListener('submit', newToy);
  document.getElementById("toy-collection").addEventListener("click", likeToy);


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  function fetchToys(url) {
    fetch(url)
    .then(function(response) {
      return response.json()
    }) 
    .then(function(json) {
      let collection = document.getElementById("toy-collection")
      for(const key of json) {
        collection.innerHTML += `<div class="card" id="${key.id}"> <h2>${key.name}</h2> <img src=${key.image} class="toy-avatar"/> <p>${key.likes} Likes </p> <button class="like-btn">Like <3</button> </div>`
      }
    })
  }

  fetchToys('http://localhost:3000/toys')

  function newToy(event) {
    let toyName = document.getElementsByClassName("input-text")[0].value
    let toyImage = document.getElementsByClassName("input-text")[1].value
    let collection = document.getElementById("toy-collection")
    collection.innerHTML += `<div class="card"> <h2>${toyName}</h2> <img src=${toyImage} class="toy-avatar"/> <p>0 Likes </p> <button class="like-btn">Like <3</button> </div>`
    postNewToy(toyName, toyImage);

    event.preventDefault();
  }

  function postNewToy(toyName, toyImage) {
    
    let configObj = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
          "Accept": "application/json"
      },
    
      body: JSON.stringify({
         name: toyName,
        image: toyImage,
        likes: 0
      })
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
      })
      .catch(function(error) {
        alert(error.message)
      })
  }

  function likeToy(event) {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }

    card = event.target.parentElement
    toyId = card.id
    likes = card.getElementsByTagName("P")[0]
    likesNum = parseInt(likes.textContent.substr(0, likes.textContent.indexOf(' ')))
    likesNum++
    likes.textContent = `${likesNum} Likes`

    postNewLike(likesNum, toyId)
  }

  function postNewLike(likesNum, toyId) {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likesNum
      })
    }

    fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      alert(error.message)
    })
  }


});
