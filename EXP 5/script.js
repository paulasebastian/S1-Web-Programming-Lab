const galleryImages = document.querySelectorAll(".gallery-grid img");
const modal = document.getElementById("modalViewer");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("imageCaption");
const autoPlayBtn = document.getElementById("autoPlayBtn");

let currentSlideIndex = 0;
let autoPlayInterval = null;

// Opens the modal and displays the clicked image
function openModal(index) {
    currentSlideIndex = index;
    modal.style.display = "block";
    updateModalContent();
}

// Closes the modal and stops autoplay
function closeModal() {
    modal.style.display = "none";
    if (autoPlayInterval) {
        togglePlay(); // Stop autoplay if running
    }
}

// Updates the image and caption in the modal
function updateModalContent() {
    modalImg.src = galleryImages[currentSlideIndex].src;
    captionText.textContent = galleryImages[currentSlideIndex].alt + " (" + (currentSlideIndex + 1) + " / " + galleryImages.length + ")";
}

// Navigates left or right
function navigateSlide(direction) {
    currentSlideIndex += direction;
    
    // Loop back to start/end if limits exceeded
    if (currentSlideIndex >= galleryImages.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = galleryImages.length - 1;
    }
    
    updateModalContent();
}

// Toggles the auto-play functionality
function togglePlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayBtn.textContent = "Start Auto-Play";
        autoPlayBtn.style.backgroundColor = "#28a745";
    } else {
        autoPlayInterval = setInterval(() => {
            navigateSlide(1);
        }, 2500); // 2.5 seconds per slide
        autoPlayBtn.textContent = "Stop Auto-Play";
        autoPlayBtn.style.backgroundColor = "#dc3545";
    }
}