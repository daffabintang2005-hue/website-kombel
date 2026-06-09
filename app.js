
const totalFoto = 20;

const temaCaption = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];

// === JANGAN UBAH KODE DI BAWAH INI KECUALI ANDA PAHAM ===

// Data gallery akan diisi secara otomatis
const galleryData = [];

// Generate data gallery dari folder images
for (let i = 1; i <= totalFoto; i++) {
  // Format nama file: dokumentasi1.jpg, dokumentasi2.jpg, dst.
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

// Render gallery ke halaman
const galleryContainer = document.getElementById('galleryGrid');

function renderGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
  
  galleryData.forEach((item, idx) => {
    const col = document.createElement('div');
    col.className = 'foto-card';
    col.innerHTML = `
      <img src="${item.url}" alt="${item.alt}" loading="lazy" onerror="this.src='${item.fallback}'">
      <p><i class="fas fa-camera"></i> ${item.caption}</p>
    `;
    col.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(item.url);
    });
    galleryContainer.appendChild(col);
  });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  if (lightboxImg) {
    lightboxImg.src = src;
  }
  if (lightbox) {
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

if (lightbox) {
  lightbox.addEventListener('click', closeLightbox);
}

// Page navigation
const pages = {
  cover: document.getElementById('cover-page'),
  deskripsi: document.getElementById('deskripsi-page'),
  visimisi: document.getElementById('visimisi-page'),
  dokumentasi: document.getElementById('dokumentasi-page')
};

const navBtns = document.querySelectorAll('.nav-btn');

function showPage(pageId) {
  // Hide all pages
  Object.values(pages).forEach(page => {
    if (page) page.classList.remove('active-page');
  });
  
  // Show target page
  if (pages[pageId]) {
    pages[pageId].classList.add('active-page');
  }
  
  // Update active button style
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-page') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // If dokumentasi page, ensure gallery is rendered
  if (pageId === 'dokumentasi' && galleryContainer && galleryContainer.children.length === 0) {
    renderGallery();
  }
}

// Add event listeners to navigation buttons
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const pageTarget = btn.getAttribute('data-page');
    if (pageTarget === 'cover') showPage('cover');
    if (pageTarget === 'deskripsi') showPage('deskripsi');
    if (pageTarget === 'visimisi') showPage('visimisi');
    if (pageTarget === 'dokumentasi') showPage('dokumentasi');
    
    // Smooth scroll to container
    const container = document.querySelector('.pages-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Button from cover page
const toDeskBtn = document.getElementById('toDeskBtn');
const toGalBtn = document.getElementById('toGalBtn');

if (toDeskBtn) {
  toDeskBtn.addEventListener('click', () => {
    showPage('deskripsi');
    const container = document.querySelector('.pages-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

if (toGalBtn) {
  toGalBtn.addEventListener('click', () => {
    showPage('dokumentasi');
    if (galleryContainer && galleryContainer.children.length === 0) {
      renderGallery();
    }
    const container = document.querySelector('.pages-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Initial render for gallery
if (galleryContainer) {
  renderGallery();
}

// Animation on scroll
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

// Observe cards for fade-in effect
document.querySelectorAll('.card-content, .misi-item, .foto-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

console.log("✅ KOMBEL PAUD Karamen Simaeruk siap! Masukkan 20 foto ke folder images dengan nama dokumentasi1.jpg s/d dokumentasi20.jpg");