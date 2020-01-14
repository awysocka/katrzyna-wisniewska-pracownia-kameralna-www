// ---MOBILE MENU---

const hamburgerIcon = document.getElementById("hamburger");
const nav = document.getElementById('navigation');
const navLinks = document.getElementsByClassName("nav__item");
const navOpen = document.querySelector(".nav__container")

// open and close mobile menu after 'click' on hamburger
hamburgerIcon.onclick = function () {
  hamburgerIcon.classList.toggle("hamburger--active");
  nav.classList.toggle("nav__menu--active");
  navOpen.classList.toggle("nav__container--active");
};

// close mobile menu after 'click' on menu link
const closeMenu = function () {
  hamburgerIcon.classList.remove("hamburger--active");
  nav.classList.remove("nav__menu--active");
  navOpen.classList.remove("nav__container--active");
};

for (let navLink of navLinks) {
  navLink.onclick = closeMenu;
}

