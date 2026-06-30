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

// Firefox print footer — Chrome/Edge use @page @bottom-center instead.
// Firefox doesn't support @page margin boxes, so we inject total-page count
// into a position:fixed element. We can't get the *current* page number from
// JS/CSS without full CSS Paged Media support, so we show "page N of M" where
// N is estimated from scroll height and M is the same estimate.
(function () {
  let footerEl = null;

  function updateFooter() {
    if (!footerEl) footerEl = document.querySelector('.print-footer-text');
    if (!footerEl) return;
    // Letter paper: 11 in. @page margins: 0.75 in top + 0.9 in bottom.
    // Use 96 px/in as the baseline screen resolution estimate.
    const contentPerPagePx = (11 - 0.75 - 0.9) * 96;
    const total = Math.max(1, Math.ceil(document.documentElement.scrollHeight / contentPerPagePx));
    footerEl.textContent = `of ${total}`;
  }

  window.addEventListener('beforeprint', updateFooter);
})();

// Firefox and Edge require lang on the element itself (not just inherited from <html>)
// for hyphens:auto to use the correct hyphenation dictionary.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".entry-label").forEach(el => {
    if (!el.hasAttribute("lang")) el.setAttribute("lang", "en");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modalToc = document.querySelector("#modal-toc");
  if (!modalToc) return;

  const tocList = document.createElement("ol");

  document.querySelectorAll("section").forEach((section, idx) => {
    const h2 = section.querySelector("h2");
    if (!h2) return;

    if (!section.id) {
      section.id = `section-${idx + 1}`;
    }

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${section.id}`;
    a.textContent = h2.textContent;

    a.addEventListener("click", function() {
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
