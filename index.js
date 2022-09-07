window.addEventListener('scroll', function () {
  const header = document.querySelector('.header-navigation');
  header.classList.toggle("sticky", window.scrollY > 0);

});

// // loader
let maskL = document.querySelector('.maskL');
window.addEventListener('load', () => {
  maskL.classList.add('hide');
  setTimeout(() => {
    maskL.remove();
  }, 3000)
});
// // ANIMATION
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});
// // burger
const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-navigation-list');
burger.addEventListener('click', toggleNav);
function toggleNav() {
  console.log('clicked');
  burger.classList.contains('active') ? burger.classList.remove('active') : burger.classList.add('active');
  burgerMenu.classList.contains('is-active') ? burgerMenu.classList.remove('is-active') : burgerMenu.classList.add('is-active');
}
// // ....................
// SLIDER
const swiper_home = new Swiper('.home-swiper', {
  speed: 1000,
  slidesPerView: 4,
  loop: true,
  spaceBetween: 25,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  mousewheel: {
    invert: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 5
    },
    // when window width is <= 480px
    425: {
      slidesPerView: 1,
      spaceBetween: 5
    },
    // when window width is <= 640px
    768: {
      slidesPerView: 2,
      spaceBetween: 10
    }
  }
});
const swiper_home_second = new Swiper('.home-second-swiper', {
  speed: 1000,
  slidesPerView: 1,
  loop: true,
  spaceBetween: 25,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  mousewheel: {
    invert: true,
  }
});
// .....................
const paragraph = `
© ${new Date().getFullYear()}.
All rights reserved.
    `;
document.getElementById('copyright').innerHTML = paragraph;

//Get the button:
const mybutton = document.getElementById("myBtn");
const rootElement = document.documentElement;

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
mybutton.addEventListener("click", scrollToTop);

// 
var timer;

var compareDate = new Date();
compareDate.setDate(compareDate.getDate() + 7); //just for this demo today + 7 days

timer = setInterval(function () {
  timeBetweenDates(compareDate);
}, 1000);

function timeBetweenDates(toDate) {
  var dateEntered = toDate;
  var now = new Date();
  var difference = dateEntered.getTime() - now.getTime();

  if (difference <= 0) {

    // Timer done
    clearInterval(timer);

  } else {

    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    $("#days").text(days + '  :');
    $("#hours").text(hours + '  :');
    $("#minutes").text(minutes + '  :');
    $("#seconds").text(seconds);
  }
}
// Load
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll(".section-products-items-item");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 12;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
// ...............................
// ACCORDION
const accordionTriggers = document.querySelectorAll('.accordion__item--trigger, .accordion-footer__item--trigger');

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener('click', expandAccordion);
});

function expandAccordion(event) {
  const { target: targetElement } = event;
  const isPanelExpanded = targetElement.getAttribute('aria-expanded');

  collapseAllAccordions();

  if (isPanelExpanded === "false") {
    targetElement.setAttribute('aria-expanded', true);
  } else {
    targetElement.setAttribute('aria-expanded', false);
  }
}

function collapseAllAccordions() {
  accordionTriggers.forEach((trigger) => {
    trigger.setAttribute('aria-expanded', false);
  });
}
// ..............................
// Sort........
// Sort by Most recent
$('#sort-recent').on('click', function () {
  tinysort('.load-block .section-products-items-item', { attr: 'data-rating' });
});

// Sort by Price
$('#sort-asc').on('click', function () {
  tinysort('.load-block .section-products-items-item', { attr: 'data-price' });
});
