document.addEventListener("DOMContentLoaded", function () {
  // Get the mode toggle button
  const modeToggle = document.getElementById("mode-toggle");
  // Check if the user has a stored preference and apply it
  if (localStorage.getItem("theme") == "light") {
    document.documentElement.classList.add("light-mode");
    modeToggle.innerText = "🌙";
  } else {
    modeToggle.innerText = "☀️"
  }
  // Add an event listener to the button
  modeToggle.addEventListener("click", () => {
    // Toggle the dark-mode class on the :root element
    document.documentElement.classList.toggle("light-mode");

    if (document.documentElement.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      modeToggle.innerText = "🌙";//"⚫";
    } else {
      modeToggle.innerText = "☀️";//"⚪";
      localStorage.removeItem("theme");
    }
  });

  // navbar IOS problem
  var lastScrollTop = 0;
  var navbar = document.querySelector("header");

  window.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.classList.remove("visible");
      navbar.classList.add("hidden");
    } else {
      // Scrolling up
      navbar.classList.remove("hidden");
      navbar.classList.add("visible");
    }
    if (scrollTop === 0) {
      // At the top of the page
      navbar.classList.add("visible");
    }
    lastScrollTop = scrollTop;
  });
});

// Select modal elements
const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.querySelector(".modal-close");
const modalDescription = document.getElementById("modal-description");
const galleryItems = document.querySelectorAll(".gallery-item");

// Open modal on click
galleryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const thumbnail = item.querySelector(".gallery-thumbnail");
    const imageSrc = thumbnail.dataset.large;
    const imageDesc = thumbnail.dataset.desc || "";
    
    // Update URL fragment
    window.location.hash = item.id;

    openModal(imageSrc, imageDesc);
  });
});

function openModal(src, desc) {
  modal.style.display = "flex";
  modalImage.src = src;
  modalDescription.textContent = desc;
}

// Close modal when the close button is clicked
modalClose.addEventListener("click", () => {
  closeModal();
});

// Close modal when clicking outside the content box
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
  modalImage.src = "";
  modalDescription.textContent = "";
  // Remove hash to disable highlight
  history.replaceState("", document.title, window.location.pathname + window.location.search);
}

// Optional: Check for a fragment on page load and open that image
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const item = document.getElementById(hash);
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "center" });
      const thumbnail = item.querySelector(".gallery-thumbnail");
      const imageSrc = thumbnail.dataset.large;
      const imageDesc = thumbnail.dataset.desc || "";
      openModal(imageSrc, imageDesc);
    }
  }
});
