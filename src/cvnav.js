// Code for obin-odayo.github.io
// Created by Zhean Robby L. Ganituen (Obin Odayo)
// Created on December 22, 2023

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.toggle-btn');

  sidebar.classList.toggle('sidebar-open');

  if (sidebar.classList.contains('sidebar-open')) {
    sidebar.style.left = '0';
    toggleBtn.style.left = '1000px'; // Move the button with the sidebar
  } else {
    sidebar.style.left = '-1000px';
    toggleBtn.style.left = '0'; // Reset button position when sidebar closes
  }
}

const buttons = document.querySelectorAll('.sidebar a');

function handleButtonClick(event) {
  buttons.forEach(button => {
    button.style.color = '#fff'; // Reset all buttons to default color
  });

  event.target.style.color = 'red'; // Set the clicked button to red
  toggleSidebar(); // Close the sidebar
}

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

