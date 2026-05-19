// Data Portfolio
const projects = [
  { title: "NeoBank App", desc: "UI/UX modern banking", tech: ["Figma", "React"], category: "uiux", thumb: "https://picsum.photos/id/104/300/200", image: "https://picsum.photos/id/104/800/600" },
  { title: "TechVibe", desc: "Landing futuristik", tech: ["HTML","CSS","JS"], category: "web", thumb: "https://picsum.photos/id/26/300/200", image: "https://picsum.photos/id/26/800/600" },
  { title: "EcoDash", desc: "Dashboard admin realtime", tech: ["Vue","Chart.js"], category: "frontend", thumb: "https://picsum.photos/id/20/300/200", image: "https://picsum.photos/id/20/800/600" },
  { title: "Portfolio 3D", desc: "Three.js showcase", tech: ["Three.js","GSAP"], category: "frontend", thumb: "https://picsum.photos/id/77/300/200", image: "https://picsum.photos/id/77/800/600" },
  { title: "Foodie Order", desc: "Fullstack MERN", tech: ["MongoDB","Express","React"], category: "fullstack", thumb: "https://picsum.photos/id/108/300/200", image: "https://picsum.photos/id/108/800/600" },
  { title: "AI Mockup", desc: "Generative UI kit", tech: ["Tailwind","Figma"], category: "uiux", thumb: "https://picsum.photos/id/0/300/200", image: "https://picsum.photos/id/0/800/600" }
];

let currentFilter = "all";
const grid = document.getElementById("portfolioGrid");

function renderPortfolio() {
  let filtered = projects.filter(p => currentFilter === "all" ? true : p.category === currentFilter);
  grid.innerHTML = filtered.map((proj, idx) => `
    <div class="portfolio-card" data-category="${proj.category}" data-img="${proj.image}" data-title="${proj.title}">
      <div class="card-img" style="background-image: url('${proj.thumb}'); background-size: cover;"></div>
      <div class="card-info">
        <h3>${proj.title}</h3>
        <p>${proj.desc}</p>
        <div class="tech-stack">${proj.tech.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
  attachCardEvents();
}

function attachCardEvents() {
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const imgSrc = card.getAttribute('data-img');
      document.getElementById('lightboxImg').src = imgSrc;
      document.getElementById('lightbox').classList.add('active');
    });
  });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderPortfolio();
  });
});

// Loading simulation + scroll reveal
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
  }, 800);
  AOS.init({ duration: 800, once: false, offset: 100 });
  renderPortfolio();
  animateSkills();
});

function animateSkills() {
  const skills = document.querySelectorAll('.skill-item');
  skills.forEach(skill => {
    let progress = skill.getAttribute('data-progress');
    let fill = skill.querySelector('.progress-fill');
    if (fill) setTimeout(() => fill.style.width = progress + '%', 200);
  });
}

// Navbar scroll & hamburger
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  const backBtn = document.getElementById('backToTop');
  if (window.scrollY > 500) backBtn.classList.add('show'); else backBtn.classList.remove('show');
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    document.getElementById('navLinks').classList.remove('active');
    const target = link.getAttribute('href');
    if(target && target !== "#") {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById('viewPortfolioBtn').addEventListener('click', () => document.getElementById('portfolio').scrollIntoView({ behavior: "smooth" }));
document.getElementById('contactMeBtn').addEventListener('click', () => document.getElementById('contact').scrollIntoView({ behavior: "smooth" }));

// Lightbox close
document.querySelector('.close-lightbox').addEventListener('click', () => document.getElementById('lightbox').classList.remove('active'));
document.getElementById('lightbox').addEventListener('click', (e) => { 
  if(e.target === document.getElementById('lightbox')) document.getElementById('lightbox').classList.remove('active'); 
});

// Dark/Light mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('light')) icon.classList.replace('fa-moon', 'fa-sun');
  else icon.classList.replace('fa-sun', 'fa-moon');
});

// Form validation + loading animation
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('formFeedback');
  
  if (!name || !email || !message) { 
    feedback.innerHTML = '<span style="color:red;">Semua field harus diisi!</span>'; 
    return; 
  }
  
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (!emailRegex.test(email)) { 
    feedback.innerHTML = '<span style="color:red;">Email tidak valid!</span>'; 
    return; 
  }
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading-spinner"></span> Mengirim...';
  
  setTimeout(() => {
    feedback.innerHTML = '<span style="color: #0ff0fc;">Pesan terkirim! Terima kasih ✨</span>';
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Kirim Pesan';
  }, 1200);
});

// Smooth scroll all menu internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if(hash === "#") return;
    const target = document.querySelector(hash);
    if(target) { 
      e.preventDefault(); 
      target.scrollIntoView({ behavior: 'smooth' }); 
    }
  });
});