// ---MOBILE MENU---

const hamburgerIcon = document.getElementById('hamburger');
const nav = document.getElementById('navigation');
const navLinks = document.getElementsByClassName('nav__item');
const navLogo = document.getElementById('logo');
const navOpen = document.querySelector('.nav__overlay');

// open and close mobile menu after 'click' on hamburger
hamburgerIcon.onclick = () => {
  hamburgerIcon.classList.toggle('hamburger--active');
  nav.classList.toggle('nav--active');
  navOpen.classList.toggle('nav__overlay--active');
};


// close mobile menu after 'click' on menu link
const closeMenu = (event) => {
  smoothScroll(event);

  hamburgerIcon.classList.remove('hamburger--active');
  nav.classList.remove('nav--active')
  navOpen.classList.remove('nav__overlay--active');
};

for (let navLink of navLinks) {
  navLink.onclick = closeMenu;
}

navLogo.onclick = closeMenu;


// ---HIGHLIGHT MENU ITEM ON SCROLL---

const mainNavLinks = document.getElementsByClassName('nav__link');
const windowHeight = window.innerHeight;

window.onscroll = () => {
  
  const fromTop = window.scrollY + windowHeight * 0.5;

  for (let link of mainNavLinks) {
    const section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('nav__link--current');
    } else {
      link.classList.remove('nav__link--current');
    }
  }
};

// ---SCROLL MENU---

const smoothScroll = event => {
  event.preventDefault();
  let targetID = event.target.getAttribute('href') || event.currentTarget.getAttribute('href');
  const targetPosition = document.querySelector(targetID).offsetTop - 60;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 500;
  let start = null;

  const step = timestamp => {
    if (!start) start = timestamp;
    const runtime = timestamp - start;
    const progress = Math.min(runtime / duration, 1);
    const ease = easeOutQuad(progress);
    window.scrollTo(0, startPosition + (distance * ease));
    if (runtime < duration) window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

const easeOutQuad = progress => {
  return -progress * (progress - 2);
};

const heroScrollButton = document.getElementById('hero-scroll-button');
heroScrollButton.onclick = smoothScroll;



// ---FORM---

const submitResultElement = document.getElementById('submit-result');
const contactForm = document.getElementById('contact-form');

contactForm.onsubmit = e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const data = {
    email: email,
    message: message
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch('mail.php', options)
    .then(response => {
      if (response.status == 200) {
        submitResultElement.classList.remove('submit__result--error');
        submitResultElement.innerText = 'Wiadomość została wysłana.';
        contactForm.reset();
        setTimeout(() => {
          submitResultElement.innerText = '';
        }, 10000);
      } else {
        submitResultElement.classList.add('submit__result--error');
        submitResultElement.innerText = 'Nie udało się wysłać wiadomości. Spróbuj jeszcze raz.';
      }
    })
    .catch(error => {
      submitResultElement.classList.add('submit__result--error');
      submitResultElement.innerText = 'Nie udało się wysłać wiadomości. Spróbuj jeszcze raz.';
      console.error('błąd: ', error);
    });
};


// ---OPEN FORM AGREEMENT---

const agreementMoreButton = document.getElementById('agreement-more-button');
const agreementFullText = document.getElementById('form-agreement-more-text');

agreementMoreButton.onclick = () => {
  agreementFullText.classList.toggle('form-agreement__more-text--open');

  if (agreementFullText.classList.contains('form-agreement__more-text--open')) {
    agreementMoreButton.innerText = 'mniej';
  } else {
    agreementMoreButton.innerText = 'więcej';
  }
};

// ---COOKIES---

const cookiesConsentBanner = document.getElementById('cookies-consent');
const acceptCookiesButton = document.getElementById('accept-button');


acceptCookiesButton.onclick = () => {
  cookiesConsentBanner.classList.remove('cookies-consent--active');

  document.cookie = "cookies_accepted = true";
};

if (document.cookie.replace(/(?:(?:^|.*;\s*)cookies_accepted\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
  cookiesConsentBanner.classList.add('cookies-consent--active');
}
