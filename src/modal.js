const contactBtn = document.querySelector('.contact-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('#closeModal');

contactBtn.addEventListener('click', function() {
  modalOverlay.style.display = 'flex';
});

closeModal.addEventListener('click', function() {
  modalOverlay.style.display = 'none';
});
