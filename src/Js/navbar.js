// Sélectionne tous les boutons de menu déroulant dans la navbar
let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler')

// Variable pour savoir si un menu déroulant est ouvert
let dropdownIsOpen = false

// Vérifie s'il y a des menus déroulants
if (dropdowns.length) {

  // Ajoute un écouteur de clic sur chaque bouton de menu déroulant
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      // Récupère l'élément du menu déroulant associé au bouton cliqué
      let target = document.querySelector(`#${event.target.dataset.dropdown}`)

      if (target) {
        // Si le menu est déjà ouvert, on le ferme
        if (target.classList.contains('show')) {
          target.classList.remove('show')
          dropdownIsOpen = false
        } else {
          // Sinon, on l'ouvre
          target.classList.add('show')
          dropdownIsOpen = true
        }
      }
    })
  })
}


// Fermer le menu déroulant si on clique en dehors
window.addEventListener('mouseup', (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      // Récupère le menu déroulant associé au bouton
      let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`)
      // Vérifie si la cible du clic est le menu déroulant
      let targetIsDropdown = dropdown == event.target

      // Si on clique sur le bouton, on ne fait rien
      if (dropdownButton == event.target) {
        return
      }

      // Si on clique en dehors du menu déroulant, on le ferme
      if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
        dropdown.classList.remove('show')
      }
    })
  }
})

// Fonction pour gérer l'affichage du menu sur les petits écrans
function handleSmallScreens() {
  // Sélectionne le bouton de la navbar (pour mobile)
  const navbarToggler = document.querySelector('.navbar-toggler')
  if (navbarToggler) {
    navbarToggler.addEventListener('click', () => {
      let navbarMenu = document.querySelector('.navbar-menu')

      // Affiche ou masque le menu en fonction de son état actuel
      if (!navbarMenu.classList.contains('active')) {
        navbarMenu.classList.add('active')
      } else {
        navbarMenu.classList.remove('active')
      }
    })
  }
}

// Appelle la fonction pour gérer les petits écrans
handleSmallScreens()