/**
 * Comportements réservés à la page Qui sommes-nous (sans charger script.js de l'accueil).
 */
(function () {
  "use strict";

  const menu = document.querySelector(".menu-card");
  if (!menu) return;

  menu.querySelectorAll("details").forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      menu.querySelectorAll("details").forEach(function (other) {
        if (other !== detail) other.removeAttribute("open");
      });
    });
  });

  document.querySelectorAll(".nav-links > li").forEach(function (li) {
    var timer;
    li.addEventListener("mouseenter", function () {
      clearTimeout(timer);
      var dd = li.querySelector(".dropdown");
      if (dd) dd.classList.add("open");
    });
    li.addEventListener("mouseleave", function () {
      timer = setTimeout(function () {
        var dd = li.querySelector(".dropdown");
        if (dd) dd.classList.remove("open");
      }, 150);
    });
  });

  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".nav-links");

  if (!burger || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }

  burger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", function (e) {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 1120) closeMenu();
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1120) closeMenu();
  });

  document.querySelectorAll(".nav-links > li > span").forEach(function (span) {
    span.addEventListener("click", function (e) {
      if (window.innerWidth <= 1120) {
        e.stopPropagation();
        const dropdown = span.nextElementSibling;
        if (dropdown) dropdown.classList.toggle("open");
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();
