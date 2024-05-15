document.addEventListener("DOMContentLoaded", function () {
  // Get the mode toggle button
  const modeToggle = document.getElementById("mode-toggle");
  // Check if the user has a stored preference and apply it
  if (localStorage.getItem("theme") == "light") {
    document.documentElement.classList.add("light-mode");
    modeToggle.innerText = "⚫";
  } else {
    modeToggle.innerText = "⚪";
  }
  // Add an event listener to the button
  modeToggle.addEventListener("click", () => {
    // Toggle the dark-mode class on the :root element
    document.documentElement.classList.toggle("light-mode");

    if (document.documentElement.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      modeToggle.innerText = "⚫";
    } else {
      modeToggle.innerText = "⚪";
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
