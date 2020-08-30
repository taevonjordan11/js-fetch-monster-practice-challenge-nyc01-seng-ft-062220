document.addEventListener('DOMContentLoaded', () => {
  const BASEURL ="http://localhost:3000/monsters/?_limit=50&_page=3"

  // console.log(monsterForm)
  const submitHandler = () => {
    document.addEventListener('submit', e => {
      e.preventDefault()

      const form = e.target
      const name = form.name.value
      const age = form.age.value
      const description = form.description.value

      const newMonster = {
        name: name,
        age: age,
        description: description
      }

      const options = {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(newMonster)
      }

      fetch(BASEURL, options)
      .then(response => response.json())
      .then(monster => renderMonster(monster))
    })
  }

  const createMonster = () => {
    const monsterForm = document.createElement('form')
    monsterForm.classList.add('monster-form')
    monsterForm.innerHTML = `
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button id="create"> Create</button>
    `
    const form = document.querySelector('#create-monster')
    form.append(monsterForm)
  }

  const renderMonstersDom = (monsters) => {
    monsters.forEach(monsterObj => {
      renderMonster(monsterObj)
    })
  }

  const renderMonster = monster => {
    const monsterContainer = document.querySelector('#monster-container')
    const monsterDiv = document.createElement('div')
    monsterDiv.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}<p>
    `
    monsterContainer.append(monsterDiv)
  }

  const getMonsters = () => {
    fetch(BASEURL)
    .then(response => response.json())
    .then(monsters => renderMonstersDom(monsters))
  }

  // renderMonsterDom()
  submitHandler()
  createMonster()
  getMonsters()
})
