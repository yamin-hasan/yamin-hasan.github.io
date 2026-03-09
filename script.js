// script.js
// smooth scroll + mobile menu + scroll reveal (lightweight)

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ---------- Mobile Navigation ----------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    // toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      // optional hamburger animation (cross)
      hamburger.classList.toggle('active');
    });

    // close menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });

    // close if click outside (optional, simple)
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  // ---------- Active link highlight on scroll (header) ----------
  const sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    let scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // offset for sticky header
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (correspondingLink) {
          navLinks.forEach(link => link.classList.remove('active-link'));
          correspondingLink.classList.add('active-link');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav(); // set initial

  // ---------- Smooth scroll for internal links (backup, but we use css) ----------
  // plus manual ensure no default jump issues
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault(); // prevent instant jump, do our smooth
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update url hash without jumping (optional)
        history.pushState(null, null, href);
      }
    });
  });

  // ---------- Scroll reveal animation (simple fade) ----------
  const revealElements = document.querySelectorAll('section:not(#home)'); // all sections except hero
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // small hover effect for project cards (already css, but we ensure glitch for red)
  // also add subtle matrix dot to hero? not needed.
  
  // button hover glow is in css. that's all.
  
  // Extra: ensure footer year dynamic?
  const yearSpan = document.querySelector('.copy .red-text');
  if (yearSpan) {
    // year is static 2025 (no need to change)
  }

  // optional tiny glitch for contact
  console.log('anonymous portfolio ready');
});
