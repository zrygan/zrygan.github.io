// Code for obin-odayo.github.io
// Created by Zhean Robby L. Ganituen (Obin Odayo)
// Created on December 22, 2023

// contact button
const contactBtn = document.querySelector('.contact-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('#closeModal');

contactBtn.addEventListener('click', function() {
  modalOverlay.style.display = 'flex';
});

closeModal.addEventListener('click', function() {
  modalOverlay.style.display = 'none';
});

// cv formats button
const cvBtn = document.querySelector('.cv-btn'); 
const modalOverlay2 = document.querySelector('.modal-overlay2'); 
const closeModal2 = document.querySelector('#closeModal2'); 

cvBtn.addEventListener('click', function() {
  modalOverlay2.style.display = 'flex';
});

closeModal2.addEventListener('click', function() {
  modalOverlay2.style.display = 'none';
});