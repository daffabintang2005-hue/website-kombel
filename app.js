// ============================================
// KOMBEL PAUD KARAMEN SIMAERUK
// Versi dengan perbaikan tampilan HP
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
  // Cek apakah dekorasi sudah ada
  if (document.querySelector('.decor-leaf')) return;
  
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
  console.log("renderGallery dipanggil, container:", galleryContainer);
  
  if (!galleryContainer) {
    console.error("galleryContainer tidak ditemukan!");
    return;
  }
  
  // Kosongkan container terlebih dahulu
  galleryContainer.innerHTML = '';
  
  // Tambahkan pesan loading sementara
  galleryContainer.innerHTML = '<div style="text-align:center; padding:40px;"><i class="fas fa-spinner fa-spin"></i> Memuat galeri...</div>';
  
  // Gunakan setTimeout untuk memastikan render berjalan
  setTimeout(() => {
    galleryContainer.innerHTML = '';
    
    galleryData.forEach((item, idx) => {
      const col = document.createElement('div');
      col.className = 'foto-card';
      col.style.setProperty('--index', idx);
      col.innerHTML = `
        <div class="image-wrapper" style="position: relative; overflow: hidden;">
          <img src="${item.url}" alt="${item.alt}" loading="lazy" 
               style="width:100%; aspect-ratio:1/1; object-fit:cover;"
               onerror="this.src='${item.fallback}';"
               onclick="openLightbox('${item.url}')">
        </div>
        <p><i class="fas fa-camera"></i> ${item.caption}</p>
      `;
      
      // Tambahkan event click ke card
      col.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(item.url);
      });
      
      galleryContainer.appendChild(col);
    });
    
    console.log("Gallery selesai dirender, jumlah foto:", galleryContainer.children.length);
  }, 50);
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
  document.body.style.overflow = 'hidden';
}

// Expose ke global agar bisa dipanggil dari HTML
window.openLightbox = openLightbox;

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
  }
  document.body.style.overflow = '';
}

if (lightbox) {
  lightbox.addEventListener('click', closeLightbox);
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
  console.log("Menampilkan halaman:", pageId);
  
  // Sembunyikan semua halaman
  Object.values(pages).forEach(page => {
    if (page) page.classList.remove('active-page');
  });
  
  // Tampilkan halaman target
  if (pages[pageId]) {
    pages[pageId].classList.add('active-page');
  }
  
  // Update tombol aktif
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-page') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Jika halaman dokumentasi, RENDER GALERI PASTI JALAN
  if (pageId === 'dokumentasi') {
    console.log("Halaman dokumentasi aktif, memastikan gallery dirender");
    // Beri sedikit delay untuk memastikan DOM sudah siap
    setTimeout(() => {
      if (galleryContainer && galleryContainer.children.length <= 1) {
        renderGallery();
      } else if (galleryContainer && galleryContainer.innerHTML === '') {
        renderGallery();
      }
    }, 100);
  }
  
  // Scroll ke container
  const container = document.querySelector('.pages-container');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Event listener untuk navigasi
navBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const pageTarget = btn.getAttribute('data-page');
    showPage(pageTarget);
  });
});

// === COVER BUTTONS ===
const toDeskBtn = document.getElementById('toDeskBtn');
const toGalBtn = document.getElementById('toGalBtn');

if (toDeskBtn) {
  toDeskBtn.addEventListener('click', () => {
    showPage('deskripsi');
  });
}

if (toGalBtn) {
  toGalBtn.addEventListener('click', () => {
    showPage('dokumentasi');
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

// === INTERSECTION OBSERVER ===
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

// === TYPING EFFECT FOR SUBTITLE ===
const subtitleElement = document.querySelector('.sub');
if (subtitleElement) {
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

// === RIPPLE EFFECT ===
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    0% { width: 0; height: 0; opacity: 0.5; }
    100% { width: 200px; height: 200px; opacity: 0; }
  }
`;
document.head.appendChild(style);

const buttons = document.querySelectorAll('.btn-explore, .nav-links button');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
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

// === INISIALISASI SAAT LOAD ===
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded, memulai inisialisasi...");
  
  // Tambah dekorasi
  addDecorations();
  
  // Pre-render gallery (tapi disembunyikan dulu)
  if (galleryContainer) {
    renderGallery();
  }
  
  // Pastikan halaman cover aktif pertama kali
  if (pages.cover && !pages.cover.classList.contains('active-page')) {
    pages.cover.classList.add('active-page');
  }
  
  console.log("Inisialisasi selesai");
});

// === PERBAIKAN UNTUK HP: Resize handler ===
let resizeTimeout;
window.addEventListener('resize', function() {
  // Jika halaman dokumentasi sedang aktif, refresh gallery layout
  if (pages.dokumentasi && pages.dokumentasi.classList.contains('active-page')) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (galleryContainer) {
        // Trigger reflow
        galleryContainer.style.display = 'none';
        setTimeout(() => {
          galleryContainer.style.display = 'grid';
        }, 10);
      }
    }, 250);
  }
});

// === FALLBACK: Jika gallery masih kosong setelah 2 detik ===
setTimeout(function() {
  if (galleryContainer && galleryContainer.children.length === 0) {
    console.log("Fallback: gallery masih kosong, render ulang");
    renderGallery();
  }
}, 2000);

console.log("✅ KOMBEL PAUD Karamen Simaeruk siap! Pastikan folder 'images' berisi dokumentasi1.jpg - dokumentasi20.jpg");