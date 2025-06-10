/**
 * Template Name: Impact
 * Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

import { portfolioItems, iconBoxes } from "./content.js";

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  // --------------------------
  // PORTFOLIO: Render + Isotope
  // --------------------------

  // Step 1: Get the container
  const container = document.getElementById("portfolio-container");

  // Step 2: Render portfolio items
  portfolioItems.forEach((item) => {
    const div = document.createElement("div");
    const categoryClasses = item.category
      .map((cat) => `filter-${cat}`)
      .join(" ");

    div.className = `col-lg-4 col-md-6 portfolio-item isotope-item ${categoryClasses}`;

    div.innerHTML = `
      <div class="portfolio-content h-100">
        <a href="${item.link}">
          <img src="${item.image.src}" class="img-fluid" alt="${item.image.alt}">
          <div class="portfolio-info">
            <h4>${item.title}</h4>
            <p>${item.year}</p>
          </div>
        </a>
      </div>
    `;

    container.appendChild(div);
  });

  // Step 3: Initialize Isotope AFTER items rendered and images loaded
  let iso;
  imagesLoaded(container, function () {
    iso = new Isotope(container, {
      itemSelector: ".isotope-item",
      layoutMode: "masonry",
      filter: "*",
      sortBy: "original-order",
    });
  });

  // Step 4: Setup filter buttons
  const filterButtons = document.querySelectorAll(".portfolio-filters li");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all filters
      filterButtons.forEach((b) => b.classList.remove("filter-active"));

      // Add active class on clicked filter
      this.classList.add("filter-active");

      // Get filter value and apply filter on isotope
      const filterValue = this.getAttribute("data-filter");

      if (iso) {
        iso.arrange({ filter: filterValue });
      }

      // Re-init AOS animations after filtering (optional)
      if (typeof aosInit === "function") {
        aosInit();
      }
    });
  });

  function renderIconBoxes(containerId, boxes) {
    const container = document.getElementById(containerId);

    // Create the row container div
    const rowDiv = document.createElement("div");
    rowDiv.className = "row gy-4 mt-5";

    // Loop through each box and create the structure
    boxes.forEach((box) => {
      const colDiv = document.createElement("div");
      colDiv.className = "col-xl-3 col-md-6";

      colDiv.innerHTML = `
      <div class="icon-box">
        <div class="icon"><i class="${box.iconClass}"></i></div>
        <h4 class="title"><a href="${box.link}" class="stretched-link">${box.title}</a></h4>
        <p>${box.description}</p>
      </div>
    `;

      rowDiv.appendChild(colDiv);
    });

    // Append the row inside the container
    container.appendChild(rowDiv);
  }

  renderIconBoxes("icon-box-container", iconBoxes);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
