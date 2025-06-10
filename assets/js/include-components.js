// Function to include HTML components
function includeHTML() {
  const includes = document.getElementsByTagName("include");
  Array.from(includes).forEach((include) => {
    const filePath = include.getAttribute("data-file");
    if (filePath) {
      fetch(filePath)
        .then((response) => response.text())
        .then((html) => {
          include.outerHTML = html;
        })
        .catch((error) => {
          console.error("Error loading component:", error);
          include.outerHTML = `Error loading component: ${filePath}`;
        });
    }
  });
}

// Run when DOM is loaded
document.addEventListener("DOMContentLoaded", includeHTML);
