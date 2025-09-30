// window.onscroll = function () { scrollFunction() };

// function scrollFunction() {
//     const backToTopBtn = document.getElementById("back-to-top");

//     if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
//         backToTopBtn.style.display = "block";
//     } else {
//         backToTopBtn.style.display = "none";
//     }
// }

// document.getElementById("back-to-top").addEventListener("click", function (e) {
//     e.preventDefault();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// // Update the modal handling for download button
// const downloadBtn = document.getElementById("download-cv");
// const downloadModal = document.getElementById("download-modal");
// const closeDownloadModal = document.getElementById("closeDownloadModal");

// downloadBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//     // First set display to flex, then add the active class for the fade-in
//     downloadModal.style.display = "flex";
//     // Use a slight delay to ensure the display change takes effect before starting the opacity transition
//     setTimeout(() => {
//         downloadModal.classList.add("active");
//     }, 10);
// });

// closeDownloadModal.addEventListener("click", function () {
//     // First remove the active class to start the fade-out
//     downloadModal.classList.remove("active");
//     // Then wait for the transition to complete before setting display to none
//     setTimeout(() => {
//         downloadModal.style.display = "none";
//     }, 500); // Match this to your transition duration (0.5s)
// });

// // Close modal when clicking outside of it
// window.addEventListener("click", function (e) {
//     if (e.target === downloadModal) {
//         // Same fade-out process
//         downloadModal.classList.remove("active");
//         setTimeout(() => {
//             downloadModal.style.display = "none";
//         }, 500);
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
  // only sections with id="ctr"
  const sections = document.querySelectorAll("section#ctr");

  sections.forEach(section => {
    const prefix = section.dataset.prefix || "";
    const items = section.querySelectorAll(".section-content");

    items.forEach((item, idx) => {
      const left = item.querySelector(".left-column, .left-column-sans");
      if (left) {
        const label = prefix ? `${prefix} ${idx + 1}.` : `${idx + 1}.`;
        left.textContent = label;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tocSection = document.querySelector("#toc");
  if (!tocSection) return;

  const tocRightColumn = tocSection.querySelector(".right-column");
  if (!tocRightColumn) return;

  // create a <ul> for the TOC
  const tocList = document.createElement("ol");

  // get all section h2s except the TOC section itself
  const sections = document.querySelectorAll("section:not(#toc) > h2");
  
  sections.forEach((h2, idx) => {
    let section = h2.parentElement;
    if (!section.id) {
      section.id = `section-${idx + 1}`;
    }

    // create TOC entry
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${section.id}`;
    a.textContent = h2.textContent;
    li.appendChild(a);
    tocList.appendChild(li);
  });

  tocRightColumn.appendChild(tocList);
});


