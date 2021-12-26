'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);

const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnScrollTo.addEventListener('click', function (e) {
  // old school way
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click` , function (e) {
//     e.preventDefault();

//   const id = this.getAttribute(`href`);
//   console.log(id);
//   document.querySelector(id).scrollIntoView({behavior:`smooth`});

//   })

// })

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();

  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// const h1 =document.querySelector(`h1`);

// console.log(h1.querySelectorAll(`.highlight`));
// console.log(h1.children);

// h1.firstElementChild.style.color=`white`

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  console.log(clicked);
  if (!clicked) return;
  {
    tabs.forEach(t => t.classList.remove(`operations__tab--active`));
    tabsContent.forEach(t => t.classList.remove(`operations__content--active`));

    clicked.classList.add(`operations__tab--active`);
    console.log(clicked.dataset.tab);

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add(`operations__content--active`);
  }
});

const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const sibling = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener(`mouseover`, handleHover.bind(0.5));

nav.addEventListener(`mouseout`, handleHover.bind(1));
const initialcoords = section1.getBoundingClientRect();
window.addEventListener(`scroll`, function () {
  if (window.scrollY > initialcoords.top) {
    nav.classList.add(`sticky`);
  } else nav.classList.remove(`sticky`);
});

const allSection = document.querySelectorAll(`.section`);

const revalSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revalSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);

  section.classList.add(`section--hidden`);
});
const imgTargets = document.querySelectorAll(`img[data-src]`);

const loading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach(img => imgObserver.observe(img));
