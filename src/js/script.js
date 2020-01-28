// ---MOBILE MENU---

const hamburgerIcon = document.getElementById("hamburger");
const nav = document.getElementById('navigation');
const navLinks = document.getElementsByClassName("nav__item");
const navOpen = document.querySelector(".nav__overlay")

// open and close mobile menu after 'click' on hamburger
hamburgerIcon.onclick = function () {
  hamburgerIcon.classList.toggle("hamburger--active");
  nav.classList.toggle("nav--active");
  navOpen.classList.toggle("nav__overlay--active");
};

// close mobile menu after 'click' on menu link
const closeMenu = function () {
  hamburgerIcon.classList.remove("hamburger--active");
  nav.classList.remove("nav--active");
  navOpen.classList.remove("nav__overlay--active");
};

for (let navLink of navLinks) {
  navLink.onclick = closeMenu;
}

// ---HIGHLIGHT MENU ITEM ON SCROLL---

const mainNavLinks = document.getElementsByClassName("nav__link");
const windowHeight = window.innerHeight;

window.onscroll = function() {
  const fromTop = window.scrollY + windowHeight / 2;

  for(let link of mainNavLinks) {
    const section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("nav__link--current");
    } else {
      link.classList.remove("nav__link--current");
    }
  };
};

