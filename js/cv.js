window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    const backToTopBtn = document.getElementById("back-to-top");

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

document.getElementById("back-to-top").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const contentsBtn = document.getElementById("contents-btn");
const contentsModal = document.getElementById("contents-modal");
const closeContentsModal = document.getElementById("closeContentsModal");

contentsBtn.addEventListener("click", function (e) {
    e.preventDefault();
    contentsModal.style.display = "flex";
    setTimeout(() => {
        contentsModal.classList.add("active");
    }, 10);
});

closeContentsModal.addEventListener("click", function () {
    contentsModal.classList.remove("active");
    setTimeout(() => {
        contentsModal.style.display = "none";
    }, 500);
});

window.addEventListener("click", function (e) {
    if (e.target === contentsModal) {
        contentsModal.classList.remove("active");
        setTimeout(() => {
            contentsModal.style.display = "none";
        }, 500);
    }
});

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
  const modalToc = document.querySelector("#modal-toc");
  if (!modalToc) return;

  // create a <ol> for the TOC
  const tocList = document.createElement("ol");

  // get all section h2s
  const sections = document.querySelectorAll("section > h2");
  
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
    
    // Add click handler to close modal when clicking on TOC links
    a.addEventListener("click", function() {
      const contentsModal = document.getElementById("contents-modal");
      contentsModal.classList.remove("active");
      setTimeout(() => {
        contentsModal.style.display = "none";
      }, 500);
    });
    
    li.appendChild(a);
    tocList.appendChild(li);
  });

  modalToc.appendChild(tocList);
});


