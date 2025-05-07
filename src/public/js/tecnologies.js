document.querySelectorAll(".toggle-category").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      header.classList.toggle("open");
      content.classList.toggle("expanded");
    });
  });