// Code for zrygan.github.io
// Created by Zhean Robby L. Ganituen (zrygan)
// Created on December 23, 2023

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.toggle-btn');
  const isSidebarOpen = sidebar.classList.contains('sidebar-open');

  if (!isSidebarOpen) {
    sidebar.style.left = '0';
    toggleBtn.style.left = '75%'; // Adjust the button position
    sidebar.classList.add('sidebar-open');
    toggleBtn.classList.remove('faster-transition'); // Remove the faster transition class
  } else {
    sidebar.style.left = '-80%';
    toggleBtn.style.left = '0'; // Reset button position when sidebar closes
    sidebar.classList.remove('sidebar-open');
    toggleBtn.classList.add('faster-transition'); // Add the faster transition class when closing
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

// download cv
document.getElementById('downloadLink').addEventListener('click', function() {
  // Get the content of the current page
  var htmlContent = document.documentElement.outerHTML;

  // Create a Blob containing the page's content
  var blob = new Blob([htmlContent], { type: 'text/html' });

  // Create a URL for the Blob
  var url = URL.createObjectURL(blob);

  // Create a link element and trigger the download
  var link = document.createElement('a');
  link.href = url;
  link.download = 'current_page'; // Set a default filename
  link.click();

  // Clean up by revoking the URL object
  URL.revokeObjectURL(url);
});

