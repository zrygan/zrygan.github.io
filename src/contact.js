// Code for zrygan.github.io
// Created by Zhean Robby L. Ganituen (zrygan)
// Created on December 23, 2023

function displayText(buttonText) {
    var displayArea = document.getElementById('dynamic-text');
    var circle = document.querySelector('.circle');
    var currentOpacity = 0; // Initial opacity
  
    switch (buttonText) {
      case 'Email':
        newText = `I use this email <span class="mono"> <a href="mailto:zr.gntn@gmail.com">zr.gntn@gmail.com</a> </span> for professional emails. You can also contact me through <a href="mailto:zhean_robby_ganituen@dlsu.edu.ph">DLSU mail</a> and <a href="mailto:zganituen@acm.org">ACM mail</a>. <b>I do not correspond thorugh accounts not listed above.</b> Should I "email" you and the account used for correspondence is not the ones above, contact me ASAP. `;
        circle.style.backgroundColor = 'blue';
        break;
      case 'Websites':
        newText = `I have a <a href="https://www.linkedin.com/in/zrygan/">LinkedIn</a>, <a href="https://github.com/zrygan">GitHub</a>, <a href="https://orcid.org/0009-0002-3266-5384">ORCID</a>, <a href="https://scholar.google.com/citations?user=tGIiReAAAAAJ">Google Scholar</a>, and <a href="https://www.instagram.com/o___dayo">Instagram</a>. Aside from these, I do not use any other social media accounts for professional purposes. For professional and academic purpuses, <b>do not </b> contact me outside these profiles.`;
        circle.style.backgroundColor = 'green';
        break;
      case 'CV':
        newText = `My curriculum vitae and portfolio are available on this website. You can access my <a href='/pages/cv.html'>CV</a> or view my <a href='/pages/portfolio.html'>portfolio</a>; both are available in PDF format as well.`;
        circle.style.backgroundColor = 'white';
        break;
      case 'Zhean':
        newText = `I am a Computer Science and Game Design student at <a href='https://www.dlsu.edu.ph/'>DLSU</a>, graduating in 2027. I am actively involved in research, focusing on computer graphics, interactive entertainment, and HCI. I sometimes even work with liminal spaces and architecture!`;
        circle.style.backgroundColor = 'purple';
        break;
      case 'What':
        newText = `This website serves as Zhean Ganituen's (frequently using the nickname: <span class="mono">zrygan</span>) personal webpage, encompassing various aspects about me such as bio, CV, portfolio, papers, interests, blogs, etc.`;
        circle.style.backgroundColor = 'orange';
        break;
      default:
        displayArea.innerHTML = '<span class="small">try clicking a button.</span>';
        circle.style.backgroundColor = 'red';
        return;
    }
  

    displayArea.style.opacity = '0'; // Set initial opacity to 0

    var fadeOut = function() {
        currentOpacity -= 0.05; // Incremental decrease in opacity
        displayArea.style.opacity = currentOpacity;
        if (currentOpacity > 0) {
            setTimeout(fadeOut, 50); // Adjust the timing for the fade-out effect
        } else {
            // When the fade-out completes, set new text and start fade-in
            displayArea.innerHTML = newText; // Set the new text
            fadeIn(); // Start fade-in for the new text
        }
    };

    var fadeIn = function() {
        currentOpacity += 0.05; // Incremental increase in opacity
        displayArea.style.opacity = currentOpacity;
        if (currentOpacity < 1) {
            setTimeout(fadeIn, 50); // Adjust the timing for the fade-in effect
        }
    };

    // Start the fade-out effect for the current text
    fadeOut();
    fadeIn()
}

  