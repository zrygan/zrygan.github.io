// XM-23.js

const pages = document.querySelectorAll('.page');
let currentPageIndex = 0;

document.body.style.overflowX = 'hidden'; // Hide horizontal scrollbar on the body

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    const nextPage = pages[currentPageIndex + 1];
    if (nextPage) {
      currentPageIndex++;
      nextPage.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const prevPage = pages[currentPageIndex - 1];
    if (prevPage) {
      currentPageIndex--;
      prevPage.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

document.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY !== 0) {
    currentPageIndex += e.deltaY > 0 ? 1 : -1;
    currentPageIndex = Math.min(Math.max(currentPageIndex, 0), pages.length - 1);
    pages[currentPageIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

pages.forEach((page) => {
  page.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      page.scrollLeft += e.deltaY;
    }
  });
});

window.addEventListener('scroll', function() {
  var backToTopButton = document.getElementById('backToTopBtn');
  var page2 = document.getElementById('page-2');

  // Check if the user has scrolled to the second page
  var scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  var secondPageOffset = page2.offsetTop - 100; // Adjust offset as needed

  if (scrollPosition > secondPageOffset) {
    backToTopButton.style.opacity = '1'; // Show the button by setting opacity to 1
  } else {
    backToTopButton.style.opacity = '0'; // Hide the button by setting opacity to 0
  }
});

window.addEventListener('scroll', function() {
  var backToTopButton = document.getElementById('backToTopBtn');
  if (window.scrollX > 200) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});  

// info button
const inBtn = document.querySelector('.info-btn');
const modalOverlay3 = document.querySelector('#modalOverlay3');
const closeModal3 = document.querySelector('#closeModal3');

inBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior
  modalOverlay3.style.display = 'flex';
  console.log("Hello");
});

closeModal3.addEventListener('click', function() {
  modalOverlay3.style.display = 'none';
});