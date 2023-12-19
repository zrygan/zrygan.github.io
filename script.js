const logos = document.querySelectorAll('.logo');
const links = document.querySelectorAll('.link-remove');

links.forEach(link => {
  link.addEventListener('mouseenter', function() {
    const altSrc = this.getAttribute('data-alt-src');
    logos.forEach(logo => {
      logo.setAttribute('src', altSrc);
    });
  });

  link.addEventListener('mouseleave', function() {
    logos.forEach(logo => {
      const originalSrc = logo.getAttribute('src');
      const altSrc = logo.getAttribute('data-alt-src');
      if (altSrc && logo.getAttribute('src') !== originalSrc) {
        logo.setAttribute('src', originalSrc);
      }
    });
  });
});

function updateTime() {
  const currentTimeParagraph = document.getElementById('currentTime');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTimeParagraph.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to set the time immediately when the page loads
updateTime();