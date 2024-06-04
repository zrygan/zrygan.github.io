// Code for zrygan.github.io
// Created by Zhean Robby L. Ganituen (zrygan)
// Created on December 22, 2023

document.querySelector('.prev-btn').style.display = 'none';
document.querySelector('.next-btn').style.display = 'block';

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id^='section']");
    let currentSectionIndex = 0;
    let isScrolling = false;

    // Function to handle scroll animation
    function scrollToSection(sectionIndex) {
        isScrolling = true;
        sections[sectionIndex].scrollIntoView({
            behavior: "smooth"
        });
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Adjust the duration of scrolling animation
    }

    // Snap scrolling behavior
    function handleScroll(event) {
        if (!isScrolling) {
            const scrollDirection = event.deltaY > 0 ? 1 : -1;

            if (scrollDirection === 1 && currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
            } else if (scrollDirection === -1 && currentSectionIndex > 0) {
                currentSectionIndex--;
            }

            scrollToSection(currentSectionIndex);
        }

        event.preventDefault();
    }

    // Disable scroll wheel
    document.addEventListener("wheel", handleScroll, { passive: false });

    // Event listeners for PREV and NEXT buttons
    document.querySelector(".prev-btn").addEventListener("click", function (e) {
        e.preventDefault();
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            if (currentSectionIndex === 0) {
                document.querySelector('.prev-btn').style.display = 'none';
            } else {
                document.querySelector('.prev-btn').style.display = 'block';
            }
            scrollToSection(currentSectionIndex);
        }
    });

    document.querySelector(".next-btn").addEventListener("click", function (e) {
        e.preventDefault();
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            if (currentSectionIndex === 0) {
                document.querySelector('.prev-btn').style.display = 'none';
            } else {
                document.querySelector('.prev-btn').style.display = 'block';
            }
            scrollToSection(currentSectionIndex);
        }
    });
});

function initialize() {
    const section = document.querySelector('#section0');
    const circle = document.querySelector('.circle');

    circle.style.backgroundColor = 'black';
    section.style.backgroundColor = '#000050';
}

function revertColors() {
    const section = document.querySelector('#section0');
    const circle = document.querySelector('.circle');

    circle.style.backgroundColor = 'black';
    section.style.backgroundColor = '#000050';

    const paragraph = document.querySelector('.sec0-contain p');
    paragraph.innerHTML = 'This is a hard stop. <br /> Learn to take a break.';

}

function changeColors() {
    const section = document.querySelector('#section0');
    const circle = document.querySelector('.circle');

    circle.style.backgroundColor = 'red';
    section.style.backgroundColor = '#101010';

    const paragraph = document.querySelector('.sec0-contain p');
    paragraph.innerHTML = 'All work and no play makes Jack a dull boy. <br /> All work and no play makes Jack a dull boy.';

}

initialize();

function changeText1() {
    const title = document.querySelector('#section1 p');
    const par = document.querySelector('.sec1-contain');

    title.innerHTML = 'This is <i>me</i>!';
    par.innerHTML = `Booyah! Got the bounty for identifying the person in the the mysterious picture!
    Here's some gold! <br /> <br /> <br /> 5🪙 added to stash.`;
}

function revertText1() {
    const title = document.querySelector('#section1 p');
    const par = document.querySelector('.sec1-contain');

    title.innerHTML = 'Who is this man?';
    par.innerHTML = `Hi! I'm Zhean Robby L. Ganituen, known online by the alias
    <span> zrygan</span>. Welcome to my web page,
    where I mostly talk about myself, my work, research, academia,
    computers, graphics, and many more.`
}
