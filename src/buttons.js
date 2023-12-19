// Code for obin-odayo.github.io
// Created by Zhean Robby L. Ganituen (Obin Odayo)
// Created on December 20, 2023

// scroll checker and fade button in
window.addEventListener('scroll', function() {
    var backToTopButton = document.getElementById('backToTopBtn');
    if (window.scrollY > 200) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
});  

// fade button
window.addEventListener('scroll', function() {
  var backToTopButton = document.getElementById('backToTopBtn');
  if (window.scrollY > 200) {
    backToTopButton.style.opacity = '1'; // Show the button by setting opacity to 1
  } else {
    backToTopButton.style.opacity = '0'; // Hide the button by setting opacity to 0
  }
});
