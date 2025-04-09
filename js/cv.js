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

// Update the modal handling for download button
const downloadBtn = document.getElementById("download-cv");
const downloadModal = document.getElementById("download-modal");
const closeDownloadModal = document.getElementById("closeDownloadModal");

downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // First set display to flex, then add the active class for the fade-in
    downloadModal.style.display = "flex";
    // Use a slight delay to ensure the display change takes effect before starting the opacity transition
    setTimeout(() => {
        downloadModal.classList.add("active");
    }, 10);
});

closeDownloadModal.addEventListener("click", function () {
    // First remove the active class to start the fade-out
    downloadModal.classList.remove("active");
    // Then wait for the transition to complete before setting display to none
    setTimeout(() => {
        downloadModal.style.display = "none";
    }, 500); // Match this to your transition duration (0.5s)
});

// Close modal when clicking outside of it
window.addEventListener("click", function (e) {
    if (e.target === downloadModal) {
        // Same fade-out process
        downloadModal.classList.remove("active");
        setTimeout(() => {
            downloadModal.style.display = "none";
        }, 500);
    }
});