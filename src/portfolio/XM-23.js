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

function updatePageIndex(partNumber) {
  let scrollPosition = 0;

  switch (partNumber) {
    case 1:
      scrollPosition = 300;
      break;
    case 2:
      scrollPosition = 500;
      break;
    case 3:
      scrollPosition = 1900;
      break;
    default:
      break;
  }

  window.scrollTo({ left: scrollPosition, behavior: 'smooth' });
}

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

window.addEventListener('scroll', function() {
  var backToTopButton = document.getElementById('backToTopBtn');
  if (window.scrollX> 200) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});  

// fade button
window.addEventListener('scroll', function() {
var backToTopButton = document.getElementById('backToTopBtn');
if (window.scrollX > 200) {
  backToTopButton.style.opacity = '1'; // Show the button by setting opacity to 1
} else {
  backToTopButton.style.opacity = '0'; // Hide the button by setting opacity to 0
}
});