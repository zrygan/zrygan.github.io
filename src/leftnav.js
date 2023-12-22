// Code for obin-odayo.github.io
// Created by Zhean Robby L. Ganituen (Obin Odayo)
// Created on December 22, 2023

// nav items if active
const navItems = document.querySelectorAll('.left-nav ul li a');

navItems.forEach((item) => {
  item.addEventListener('click', function(event) {
    navItems.forEach((navItem) => {
      navItem.parentElement.classList.remove('selected');
    });

    event.target.parentElement.classList.add('selected');
  });
});
