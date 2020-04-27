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
});

function displayToys(json) {
  json.forEach(toy => {
    const card = document.createElement('div')
    card.className = 'card'
  });
  
  
}
