function displayText(buttonText) {
    var displayArea = document.getElementById('dynamic-text');
    var textToDisplay = '';
  
    switch (buttonText) {
      case 'Email':
        textToDisplay = `I use this email <span class="mono"> <a href="mailto:obin-odayo@gmail.com">obin-odayo@gmail.com</a> </span> for professional emails. You can also contact me through my <a href="mailto:zhean_robby_ganituen@dlsu.edu.ph">DLSU</a> and <a href="mailto:zganituen@acm.org">ACM</a> emails. <br /> Although unprofessional, you may also correspond with me through Discord (Username: ob1n.), but I prefer initial correspondence via my professional email.`;
        break;
      case 'Websites':
        textToDisplay = `I have a <a href="https://www.linkedin.com/in/zr-gntn/">LinkedIn</a> and <a href="https://github.com/obin-odayo">GitHub</a>. Aside from these, I do not use any other social media accounts for professional purposes. <br /> I will update my academic accounts in the future, including my Google Scholar account.`;
        break;
      case 'CV':
        textToDisplay = `My curriculum vitae and portfolio are available on this website. You can access my <a href='/pages/cv.html'>CV</a> or view my <a href='/pages/portfolio.html'>portfolio</a>; both are available in PDF format as well.`;
        break;
      case 'Zhean':
        textToDisplay = `I am a Computer Science and Philosophy student at <a href='https://www.dlsu.edu.ph/'>DLSU</a>, graduating in 2027. I am actively involved in research, focusing on computer graphics, interactive entertainment, and HCI. I sometimes even work with liminal spaces and architecture!`;
        break;
      case 'What':
        textToDisplay = `This website serves as Zhean Ganituen's (frequently using the nickname: <span class="mono">Obi</span>) personal webpage, encompassing various aspects about me such as bio, CV, portfolio, papers, interests, blogs, etc.`;
        break;
      default:
        textToDisplay = '<span class="small">try clicking a button.</span>';
    }
  
    displayArea.innerHTML = textToDisplay;
  }
  