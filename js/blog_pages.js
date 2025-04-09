window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    const backToTopBtn = document.getElementById("back-to-top");

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

// Scroll to top when back to top button is clicked
document.getElementById("back-to-top").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// References modal functionality
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("references-modal");
    const btn = document.getElementById("references-btn");
    const span = document.getElementsByClassName("close-modal")[0];
    
    // Open modal when references button is clicked
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    });
    
    // Close modal when X is clicked
    span.addEventListener("click", function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
    });
    
    // Close modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Re-enable scrolling
        }
    });
});