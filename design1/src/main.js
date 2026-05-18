import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  ScrollTrigger.refresh();

  // Revelar elementos
  gsap.set(".fade-up, .navbar", { visibility: "visible" });

  // 1. Navbar
  gsap.fromTo(".navbar", 
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
  );

  // 2. Elementos del Hero
  const heroElements = document.querySelectorAll(".hero .fade-up");
  gsap.fromTo(heroElements, 
    { y: 60, opacity: 0, scale: 0.98 },
    { y: 0, opacity: 1, scale: 1, duration: 1.6, stagger: 0.15, ease: "expo.out" }
  );

  // 3. Parallax Background
  gsap.to(".hero-bg", {
    y: "20%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // 4. Scroll animaciones general (Bento, Services, Footer, Partners)
  const fadeUpSections = gsap.utils.toArray(".partners, .bento-card, .services-header, .service-card, .footer");
  
  fadeUpSections.forEach((elem) => {
    gsap.fromTo(elem, 
      { y: 80, opacity: 0, scale: 0.98 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.6, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 90%", // Aparece un poco antes
          toggleActions: "play none none none"
        }
      }
    );
  });

  // 5. Mobile Menu Animation
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  let isMenuOpen = false;

  const menuTl = gsap.timeline({ paused: true });
  
  menuTl.to(navLinks, {
    opacity: 1,
    visibility: "visible",
    duration: 0.4,
    ease: "power2.inOut"
  })
  .fromTo(navItems, {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.2");

  if(menuBtn) {
    menuBtn.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;
      const spans = menuBtn.querySelectorAll("span");
      
      if (isMenuOpen) {
        gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
        menuTl.play();
        document.body.style.overflow = "hidden";
      } else {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        menuTl.reverse();
        document.body.style.overflow = "auto";
      }
    });
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      if (isMenuOpen) {
        menuBtn.click();
      }
    });
  });

});
