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