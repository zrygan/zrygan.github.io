// Code for obin-odayo.github.io
// Created by Zhean Robby L. Ganituen (Obin Odayo)
// Created on December 20, 2023

// Code for logo
const logos = document.querySelectorAll('.logo');
const links = document.querySelectorAll('.link-remove');

let isHoveringLink = false; // Flag to check if any link is being hovered

links.forEach(link => {
  link.addEventListener('mouseenter', function() {
    isHoveringLink = true; 
    const altSrc = this.getAttribute('data-alt-src');
    logos.forEach(logo => {
      logo.setAttribute('src', altSrc);
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
      const originalSrc = logo.getAttribute('src');
      const redSrc = '/icon/iconRed.svg';
      if (originalSrc !== redSrc) {
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
    }
  });

  logo.addEventListener('mouseleave', function() {
    if (!isHoveringLink) {
      resetToRed();
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