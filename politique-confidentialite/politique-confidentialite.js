(function () {
  "use strict";

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
