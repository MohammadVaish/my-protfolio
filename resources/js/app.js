import './bootstrap';
import 'bootstrap';
import AOS from 'aos';

AOS.init({
    duration: 1000,
    once: true
});

/* ==========================
        Sticky Navbar
========================== */

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".custom-navbar");

    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ==========================
      Counter Animation
========================== */
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = parseInt(counter.dataset.target);
    const duration = 3000; // 4 seconds (5000 = 5 sec)
    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        counter.textContent = Math.floor(progress * target);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = target;
        }

    }

    requestAnimationFrame(update);
}

let started = false;

const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting && !started) {

        started = true;

        counters.forEach(counter => animateCounter(counter));

    }

}, {
    threshold: 0.5
});

observer.observe(document.querySelector(".hero-counter"));