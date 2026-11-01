document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");

  if (backToTopButton) {
    // Smooth scroll to top on click
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"});
    });
  }

  const subcategories = document.querySelectorAll(".subcategory-link");
  const products = document.querySelectorAll(".product-card-wrapper"); // use wrapper

  subcategories.forEach((sub) => {
    sub.addEventListener("click", (e) => {
      e.preventDefault();
      const category = sub.dataset.category;

      products.forEach((product) => {
        if (product.dataset.category === category || category === "all") {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  });

  function animateValue(el, start, end, duration, suffix = "") {
    const range = end - start;
    if(range===0)
    {el.textContent= end + suffix;
    return;
    }

    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.max(10,Math.floor(duration / Math.abs(range)));

    const timer = setInterval(() => {
      current+= increment;
      el.textContent=current +suffix;
      if((increment>0 && current>= end)||(increment<0 && current<= end))
      {el.textContent = end + suffix ;
      clearInterval(timer);
      }
    }, stepTime);
  }

  const counters= document.querySelectorAll(".counter");
  if (!counters.length) return;
const seen = new WeakSet();
  const io = ("IntersectionObserver" in window)
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            const end = parseInt(entry.target.dataset.end, 10) || 0;
            const suffix = entry.target.dataset.suffix || "";
            animateValue(entry.target, 0, end, 1500, suffix);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" })
    : null;

  counters.forEach(el => {
    if (io) io.observe(el);
    else {
      // Fallback for very old browsers: animate immediately
      const end = parseInt(el.dataset.end, 10) || 0;
      const suffix = el.dataset.suffix || "";
      animateValue(el, 0, end, 1500, suffix);
    }
  });
});
