// ---MOBILE MENU---

const hamburgerIcon = document.getElementById("hamburger");
const nav = document.getElementById('navigation');
const navLinks = document.getElementsByClassName("nav__item");
const navLogo = document.getElementById("logo");
const navOpen = document.querySelector(".nav__overlay");

// open and close mobile menu after 'click' on hamburger
hamburgerIcon.onclick = function () {
  hamburgerIcon.classList.toggle("hamburger--active");
  nav.classList.toggle("nav--active");
  navOpen.classList.toggle("nav__overlay--active");
};


// close mobile menu after 'click' on menu link
const closeMenu = function () {
  smoothScroll(event);

  hamburgerIcon.classList.remove("hamburger--active");
  nav.classList.remove("nav--active");
  navOpen.classList.remove("nav__overlay--active");
};

for (let navLink of navLinks) {
  navLink.onclick = closeMenu;
}

navLogo.onclick = closeMenu;


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
  }
};

//---SCROLL MENU---

function smoothScroll(event) {
  event.preventDefault();
  const targetID = event.target.getAttribute("href");
  const targetPosition = targetID === null ? 0 : document.querySelector(targetID).offsetTop - 60;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 500;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const runtime = timestamp - start;
    const progress = Math.min(runtime / duration, 1);
    const ease = easeOutQuad(progress);
    window.scrollTo(0, startPosition + (distance * ease));
    if (runtime < duration) window.requestAnimationFrame(step);
  }
}

function easeOutQuad(progress) {
  return -progress * (progress - 2);
}
