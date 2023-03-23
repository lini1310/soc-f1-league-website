function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const barTop = document.getElementById('1');
    const barMiddle = document.getElementById('2');
    const barBottom = document.getElementById('3');
  
    navMenu.classList.toggle('active');
    barTop.classList.toggle('bar-top-open');
    barMiddle.classList.toggle('bar-middle-open');
    barBottom.classList.toggle('bar-bottom-open');
  }
  
  