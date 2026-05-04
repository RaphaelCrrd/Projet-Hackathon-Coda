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
})();
