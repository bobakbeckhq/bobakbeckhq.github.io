const darkModeToggle = document.getElementById("dark-mode");
const circleIcon = document.querySelector(".circle .icon");

darkModeToggle.addEventListener("change", () => {
  const darkTheme = darkModeToggle.checked;

  // Switch page colors
  document.body.style.backgroundColor = darkTheme ? "#121212" : "#ffffff";
  document.body.style.color = darkTheme ? "#f5f5f5" : "#000000";

  // Switch between sun and moon icons
  circleIcon.textContent = darkTheme ? "🌙" : "☀️";
});
