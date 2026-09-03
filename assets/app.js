(function () {
  "use strict";
  var doc = document;
  var burger = doc.querySelector(".burger");
  var nav = doc.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Закрыть меню сайта" : "Открыть меню сайта");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  var top = doc.querySelector(".top");
  if (top) {
    var onScroll = function () {
      if (window.scrollY > 8) top.classList.add("scrolled");
      else top.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var items = [].slice.call(doc.querySelectorAll(".rv, .photo"));
  var showAll = function () {
    for (var i = 0; i < items.length; i++) items[i].classList.add("in");
  };

  if (!doc.documentElement.classList.contains("js-rv") || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 80 + "ms";
      io.observe(el);
    });
    window.setTimeout(showAll, 2200);
  }

  var form = doc.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("is-ok");
    });
  }
})();
