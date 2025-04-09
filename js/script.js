// Code for zrygan.github.io
// Created by Zhean Robby L. Ganituen (zrygan)
// Created on December 20, 2023

// Code for logo
const logos = document.querySelectorAll('.logo');
const links = document.querySelectorAll('.logo-link-remove');

let isHoveringLink = false; // Flag to check if any link is being hovered

links.forEach(link => {
  link.addEventListener('mouseenter', function() {
    isHoveringLink = true; 
    const altSrc = this.getAttribute('data-alt-src');
    logos.forEach(logo => {
      if (!logo.classList.contains('hovered')) {
        logo.setAttribute('src', altSrc);
      }
    });
  });

  link.addEventListener('mouseleave', function() {
    isHoveringLink = false; 
    resetToRed(); 
  });
});

function resetToRed() {
  if (!isHoveringLink) {
    logos.forEach(logo => {
      if (!logo.classList.contains('hovered')) {
        const redSrc = '/icon/iconRed.svg';
        logo.setAttribute('src', redSrc);
      }
    });
  }
}

logos.forEach(logo => {
  logo.addEventListener('mouseenter', function() {
    const altSrc = this.getAttribute('data-alt-src');
    if (!isHoveringLink && altSrc !== '/icon/iconOrange.svg') {
      this.setAttribute('src', altSrc);
      this.classList.add('hovered');
    }
  });

  logo.addEventListener('mouseleave', function() {
    if (!isHoveringLink) {
      resetToRed();
      this.classList.remove('hovered');
    }
  });
});


// Code for clock
function updateTime() {
  const currentTimeParagraph = document.getElementById('currentTime');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTimeParagraph.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);

updateTime();