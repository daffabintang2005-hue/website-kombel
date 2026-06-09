// ============================================
// KOMBEL PAUD KARAMEN SIMAERUK
// Versi dengan elemen interaktif dan animasi
// ============================================

// === KONFIGURASI ===
const totalFoto = 20;

const temaCaption = [
  "Kegiatan belajar bersama di dalam kelas",
  "Lomba mewarnai gambar bertema Mentawai",
  "Outbond seru di alam terbuka",
  "Kunjungan edukasi ke kebun desa",
  "Kebersamaan guru dan murid tersenyum",
  "Parenting bareng orang tua murid",
  "Prakarya anyaman daun pandan khas Mentawai",
  "Pentas seni tari turuk laggai",
  "Senam pagi ceria bersama",
  "Bermain peran dengan pakaian adat",
  "Sesi membaca cerita rakyat Mentawai",
  "Makan bersama menu lokal yang sehat",
  "Kegiatan menggambar dan mewarnai",
  "Bermain alat musik tradisional",
  "Berkebun sayur di pekarangan sekolah",
  "Kegiatan upacara bendera",
  "Wisata edukasi ke pantai",
  "Foto bersama wali murid dan komite",
  "Eksperimen sains sederhana yang menyenangkan",
  "Penutupan kegiatan dengan tarian bersama"
];

// === GENERATE DATA GALLERY ===
const galleryData = [];

for (let i = 1; i <= totalFoto; i++) {
  const imageUrl = `images/dokumentasi${i}.jpg`;
  const caption = temaCaption[(i-1) % temaCaption.length];
  const altText = `Dokumentasi kegiatan PAUD Karamen Simaeruk ${i}`;
  galleryData.push({ 
    url: imageUrl, 
    caption: caption, 
    alt: altText,
    fallback: `https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+${i}`
  });
}

// === TAMBAHAN ELEMEN DEKORASI ===
function addDecorations() {
  // Tambah elemen dekorasi daun
  const decorLeft = document.createElement('div');
  decorLeft.className = 'decor-leaf';
  decorLeft.innerHTML = '🌿🍃🌱';
  document.body.appendChild(decorLeft);
  
  const decorRight = document.createElement('div');
  decorRight.className = 'decor-leaf-right';
  decorRight.innerHTML = '🌺🌸🌼';
  document.body.appendChild(decorRight);
}

// === RENDER GALLERY ===
const galleryContainer = document.getElementById('galleryGrid');

function renderGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
  
  galleryData.forEach((item, idx) => {
    const col = document.createElement('div');
    col.className = 'foto-card';
    col.style.setProperty('--index', idx);
    col.innerHTML = `
      <div class="image-loading" style="position: relative;">
        <img src="${item.url}" alt="${item.alt}" loading="lazy" 
             onerror="this.src='${item.fallback}'; this.parentElement.classList.remove('image-loading');"
             onload="this.parentElement.classList.remove('image-loading');">
      </div>
      <p><i class="fas fa-camera"></i> ${item.caption}</p>
    `;
    col.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(item.url);
    });
    galleryContainer.appendChild(col);
  });
}

// === LIGHTBOX ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  if (lightboxImg) {
    lightboxImg.src = src;
  }
  if (lightbox) {
    lightbox.classList.add('active');
  }
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
  }
  document.body.style.overflow = '';
}

if (lightbox) {
  lightbox.addEventListener('click', closeLightbox);
  // Close with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// === PAGE NAVIGATION ===
const pages = {
  cover: document.getElementById('cover-page'),
  deskripsi: document.getElementById('deskripsi-page'),
  visimisi: document.getElementById('visimisi-page'),
  dokumentasi: document.getElementById('dokumentasi-page')
};

const navBtns = document.querySelectorAll('.nav-btn');

function showPage(pageId) {
  Object.values(pages).forEach(page => {
    if (page) page.classList.remove('active-page');
  });
  
  if (pages[pageId]) {
    pages[pageId].classList.add('active-page');
  }
  
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-page') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  if (pageId === 'dokumentasi' && galleryContainer && galleryContainer.children.length === 0) {
    renderGallery();
  }
  
  // Trigger re-animation
  const container = document.querySelector('.pages-container');
  if (container) {
    container.style.animation = 'none';
    setTimeout(() => {
      container.style.animation = '';
    }, 10);
  }
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const pageTarget = btn.getAttribute('data-page');
    if (pageTarget === 'cover') showPage('cover');
    if (pageTarget === 'deskripsi') showPage('deskripsi');
    if (pageTarget === 'visimisi') showPage('visimisi');
    if (pageTarget === 'dokumentasi') showPage('dokumentasi');
    
    const container = document.querySelector('.pages-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === COVER BUTTONS ===
const toDeskBtn = document.getElementById('toDeskBtn');
const toGalBtn = document.getElementById('toGalBtn');

if (toDeskBtn) {
  toDeskBtn.addEventListener('click', () => {
    showPage('deskripsi');
    const container = document.querySelector('.pages-container');
    if (container) container.scrollIntoView({ behavior: 'smooth' });
  });
}

if (toGalBtn) {
  toGalBtn.addEventListener('click', () => {
    showPage('dokumentasi');
    if (galleryContainer && galleryContainer.children.length === 0) renderGallery();
    const container = document.querySelector('.pages-container');
    if (container) container.scrollIntoView({ behavior: 'smooth' });
  });
}

// === SCROLL EFFECT NAVBAR ===
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// === INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card-content, .misi-item, .foto-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(25px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
  observer.observe(el);
});

// === TYPING EFFECT FOR SUBTITLE (optional) ===
const subtitleElement = document.querySelector('.sub');
if (subtitleElement) {
  const originalText = subtitleElement.innerHTML;
  const words = ['✨ Menari di Atas Akar Budaya Mentawai', '🌸 Menyemai Generasi Emas', '🍃 Belajar Sambil Bermain', '🌺 PAUD Berkarakter Pancasila'];
  let wordIndex = 0;
  
  setInterval(() => {
    if (subtitleElement) {
      wordIndex = (wordIndex + 1) % words.length;
      subtitleElement.style.opacity = '0';
      setTimeout(() => {
        subtitleElement.innerHTML = `<i class="fas fa-feather-alt"></i> ${words[wordIndex]}`;
        subtitleElement.style.opacity = '1';
      }, 200);
    }
  }, 4000);
}

// === RIPPLE EFFECT ON BUTTONS ===
const buttons = document.querySelectorAll('.btn-explore, .nav-links button');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX - btn.offsetLeft}px`;
    ripple.style.top = `${e.clientY - btn.offsetTop}px`;
    ripple.style.position = 'absolute';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.5)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'rippleAnim 0.6s linear';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    0% { width: 0; height: 0; opacity: 0.5; }
    100% { width: 200px; height: 200px; opacity: 0; }
  }
`;
document.head.appendChild(style);

// === INITIAL RENDER ===
if (galleryContainer) {
  renderGallery();
}

// === ADD DECORATIONS ===
addDecorations();

// === WELCOME CONSOLE MESSAGE ===
console.log("%c✨ KOMBEL PAUD Karamen Simaeruk ✨", "color: #C58C4A; font-size: 16px; font-weight: bold;");
console.log("%cKomunitas Belajar PAUD Berbasis Budaya Mentawai", "color: #8B5A2B; font-size: 12px;");
console.log("%c📸 Masukkan 20 foto ke folder images dengan nama dokumentasi1.jpg s/d dokumentasi20.jpg", "color: #4A5B3C;");