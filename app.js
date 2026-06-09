
const fotoData = [
    { url: "images/dokumentasi1.jpg", caption: "Kegiatan belajar bersama" },
    { url: "httpsn://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+2", caption: "Lomba mewarnai" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+3", caption: "Outbond seru" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+4", caption: "Kunjungan edukasi" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+5", caption: "Kebersamaan guru dan murid" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+6", caption: "Parenting bareng" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+7", caption: "Prakarya anyaman" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+8", caption: "Pentas seni tari" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+9", caption: "Senam pagi" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+10", caption: "Bermain peran" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+11", caption: "Membaca cerita" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+12", caption: "Makan bersama" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+13", caption: "Menggambar" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+14", caption: "Bermain alat musik" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+15", caption: "Berkebun" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+16", caption: "Upacara" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+17", caption: "Wisata edukasi" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+18", caption: "Foto bersama" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+19", caption: "Eksperimen sains" },
    { url: "https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+20", caption: "Penutupan kegiatan" }
];

// Tunggu sampai halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log("Halaman siap, mulai membuat gallery...");
    
    // Cari container gallery
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) {
        console.error("ERROR: elemen galleryGrid tidak ditemukan!");
        return;
    }
    
    console.log("Container gallery ditemukan, mengisi dengan", fotoData.length, "foto");
    
    // Kosongkan container
    galleryGrid.innerHTML = '';
    
    // Looping untuk membuat 20 foto
    for (let i = 0; i < fotoData.length; i++) {
        const foto = fotoData[i];
        
        // Buat elemen div untuk card
        const card = document.createElement('div');
        card.className = 'foto-card';
        
        // Buat elemen gambar
        const img = document.createElement('img');
        img.src = foto.url;
        img.alt = foto.caption;
        img.loading = 'lazy';
        
        // Buat caption
        const caption = document.createElement('p');
        caption.innerHTML = '<i class="fas fa-camera"></i> ' + foto.caption;
        
        // Masukkan ke card
        card.appendChild(img);
        card.appendChild(caption);
        
        // Tambahkan event klik untuk lightbox
        card.addEventListener('click', function() {
            openLightbox(foto.url);
        });
        
        // Masukkan card ke grid
        galleryGrid.appendChild(card);
    }
    
    console.log("Gallery selesai dibuat, jumlah card:", galleryGrid.children.length);
    
    // Pastikan visible
    galleryGrid.style.display = 'grid';
});

// Fungsi lightbox
function openLightbox(imgSrc) {
    // Cari atau buat lightbox
    let lightbox = document.getElementById('customLightbox');
    
    if (!lightbox) {
        // Buat lightbox baru jika belum ada
        lightbox = document.createElement('div');
        lightbox.id = 'customLightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.id = 'lightboxImg';
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            border: 3px solid white;
        `;
        
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        
        // Tutup jika diklik
        lightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Tampilkan lightbox dengan gambar
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) {
        lightboxImg.src = imgSrc;
    }
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Navigasi halaman
const navButtons = document.querySelectorAll('.nav-btn');
const pages = {
    cover: document.getElementById('cover-page'),
    deskripsi: document.getElementById('deskripsi-page'),
    visimisi: document.getElementById('visimisi-page'),
    dokumentasi: document.getElementById('dokumentasi-page')
};

function showPage(pageId) {
    // Sembunyikan semua halaman
    for (let key in pages) {
        if (pages[key]) {
            pages[key].classList.remove('active-page');
        }
    }
    
    // Tampilkan halaman yang dipilih
    if (pages[pageId]) {
        pages[pageId].classList.add('active-page');
    }
    
    // Update tombol aktif
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Pasang event listener ke tombol navigasi
navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.getAttribute('data-page');
        showPage(target);
    });
});

// Tombol dari halaman cover
const toDeskBtn = document.getElementById('toDeskBtn');
const toGalBtn = document.getElementById('toGalBtn');

if (toDeskBtn) {
    toDeskBtn.addEventListener('click', function() {
        showPage('deskripsi');
    });
}

if (toGalBtn) {
    toGalBtn.addEventListener('click', function() {
        showPage('dokumentasi');
    });
}

// Efek scroll pada navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

console.log("Script berjalan dengan baik!");