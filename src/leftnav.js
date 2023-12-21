const navItems = document.querySelectorAll('.left-nav ul li a');

navItems.forEach((item) => {
  item.addEventListener('click', function(event) {
    navItems.forEach((navItem) => {
      navItem.parentElement.classList.remove('selected');
    });

    event.target.parentElement.classList.add('selected');
  });
});
