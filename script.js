/* =========================================================
   CASA DI FORNO — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     CONFIGURAÇÃO — troque pelos dados reais do restaurante
     --------------------------------------------------------- */
  const WHATSAPP_NUMBER = '5547999999999'; // DDI+DDD+número, só dígitos
  const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da Casa Di Forno e gostaria de mais informações.';
  const ADDRESS = 'Rua da Alegria, 123 - América, Joinville - SC';

  /* ---------------------------------------------------------
     LINKS DE WHATSAPP
     --------------------------------------------------------- */
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  document.querySelectorAll('#whatsapp-header-btn, #whatsapp-hero-btn, #whatsapp-footer-btn')
    .forEach(btn => {
      btn.setAttribute('href', whatsappUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });

  /* ---------------------------------------------------------
     LINKS DO GOOGLE MAPS
     --------------------------------------------------------- */
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
  document.querySelectorAll('#maps-btn-list, #maps-btn-badge')
    .forEach(btn => {
      btn.setAttribute('href', mapsUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });

  /* ---------------------------------------------------------
     MENU MOBILE (hambúrguer)
     --------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Destaca o link ativo do menu conforme a rolagem */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) currentId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  /* ---------------------------------------------------------
     CARDÁPIO — CARROSSEL DE PIZZAS
     --------------------------------------------------------- */
  const pizzas = [
    {
      name: 'Marguerita',
      desc: 'Molho de tomate, mussarela e manjericão fresco.',
      img: 'img/pizzas/Marguerita.png'
    },
    {
      name: 'Champignon',
      desc: 'Molho de tomate, mussarela, champignon, pimentão e cebola.',
      img: 'img/pizzas/Champignon.png'
    },
    {
      name: 'Camarão',
      desc: 'Molho caseiro, queijo, camarão e especiarias.',
      img: 'img/pizzas/Camarão.png'
    },
    {
      name: 'Quatro Queijos',
      desc: 'Mussarela, provolone, parmesão e gorgonzola.',
      img: 'img/pizzas/Queijo.png'
    },
    {
      name: 'Frango Teriaki',
      desc: 'Molho de tomate, mussarela e frango ao molho teriaki.',
      img: 'img/pizzas/FrangoTeriaki.png'
    },
    {
      name: 'Morango e Nutella',
      desc: 'Creme doce, queijo, nutella e morango.',
      img: 'img/pizzas/MorangoNutella.png'
    }
  ];

  const track = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const nameEl = document.getElementById('pizza-name');
  const descEl = document.getElementById('pizza-desc');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  let activeIndex = 2; // começa na pizza "Camarão", como na referência

  const wrap = i => (i + pizzas.length) % pizzas.length;

  function renderDots(){
    dotsWrap.innerHTML = '';
    pizzas.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver pizza ${pizzas[i].name}`);
      if (i === activeIndex) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function renderCarousel(){
    track.innerHTML = '';

    const order = [wrap(activeIndex - 1), activeIndex, wrap(activeIndex + 1)];

    order.forEach(i => {
      const pizza = pizzas[i];
      const slide = document.createElement('div');
      slide.className = 'pizza-slide' + (i === activeIndex ? ' is-active' : '');
      slide.setAttribute('role', 'button');
      slide.setAttribute('tabindex', '0');
      slide.setAttribute('aria-label', `Selecionar pizza ${pizza.name}`);

      const img = document.createElement('img');
      img.src = pizza.img;
      img.alt = `Pizza ${pizza.name}`;
      img.loading = 'lazy';
      slide.appendChild(img);

      if (i !== activeIndex){
        slide.addEventListener('click', () => goTo(i));
        slide.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); goTo(i); }
        });
      }

      track.appendChild(slide);
    });

    nameEl.textContent = pizzas[activeIndex].name;
    descEl.textContent = pizzas[activeIndex].desc;

    renderDots();
  }

  function goTo(index){
    activeIndex = wrap(index);
    renderCarousel();
  }

  prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
  nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

  renderCarousel();
});

/* ==========================
   Reveal ao rolar
========================== */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

reveals.forEach(item=>observer.observe(item));