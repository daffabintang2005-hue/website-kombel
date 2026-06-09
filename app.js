// ============================================
// KOMBEL PAUD KARAMEN SIMAERUK
// UPLOAD SIZE: MAX 500 MB (bebas untuk ukuran lebih kecil)
// ============================================

// Data default
let komunitasData = {
    coverPhoto: "https://placehold.co/600x300/FCE9C4/B47C42?text=Ilustrasi+PAUD+Mentawai",
    deskripsi: `<p><strong>Gugus PAUD Karamen Simaeruk</strong> adalah wadah koordinasi dan kerja sama antar satuan PAUD (TK, KB, TPA, SPS) di Kecamatan Karamen, Kepulauan Mentawai. Terinspirasi dari filosofi "Simaeruk" (bersatu dalam perbedaan), komunitas ini menjadi "rumah belajar" bagi para pendidik PAUD serta kepala sekolah untuk saling berbagi praktik baik, mengembangkan program bersama, dan meningkatkan mutu layanan anak usia dini.</p><br><p>Sebagai bagian dari penguatan <strong>Pusat Kegiatan Gugus (PKG) PAUD</strong>, kami mewadahi pembinaan profesionalitas guru secara terencana, koordinasi antarlembaga, serta pengembangan kurikulum yang kontekstual dengan budaya Mentawai.</p><br><div style="background: #EFE2CC; border-radius: 28px; padding: 20px;"><i class="fas fa-star-of-life"></i> <strong>Fungsi Utama Komunitas:</strong><ul style="margin-top: 12px; list-style-type: none;"><li>✓ Wadah Pembinaan & peningkatan kompetensi pendidik PAUD</li><li>✓ Pusat Koordinasi berbagi informasi & sumber daya antar lembaga</li><li>✓ Pengembangan Kurikulum bermuatan budaya Mentawai & standar mutu</li><li>✓ Kolaborasi bersama Dinas Pendidikan dan mitra orang tua</li></ul></div>`,
    visi: `<p style="font-size:1.2rem; font-weight:600; background:#F7EAD6; border-radius: 30px; padding: 16px;"><i class="fas fa-quote-left"></i> "Terwujudnya Gugus PAUD yang unggul, berkarakter, dan berdaya saing untuk membentuk generasi emas Indonesia yang cerdas, kreatif, dan berakhlak mulia"</p><p>Inti visi: <strong>Anak PAUD menjadi generasi emas yang pintar dan berkarakter Pancasila</strong> dengan semangat budaya Mentawai.</p>`,
    misi: `<div class="grid-misi"><div class="misi-item"><i class="fas fa-chalkboard-user"></i> <strong>Pengembangan Kompetensi Pendidik</strong><br>Meningkatkan profesionalisme guru melalui Kelompok Kerja Guru (KKG) dan pelatihan manajerial.</div><div class="misi-item"><i class="fas fa-book-open"></i> <strong>Peningkatan Kualitas Pembelajaran</strong><br>Memfasilitasi kurikulum inovatif, metode kreatif, dan alat penilaian sesuai tumbuh kembang anak.</div><div class="misi-item"><i class="fas fa-building"></i> <strong>Pengelolaan Kelembagaan</strong><br>Koordinasi administrasi PAUD yang tertib, akuntabel, dan berstandar nasional.</div><div class="misi-item"><i class="fas fa-handshake"></i> <strong>Kemitraan & Komunikasi</strong><br>Kolaborasi antara sekolah, orang tua, masyarakat, dan pemerintah.</div><div class="misi-item"><i class="fas fa-heart"></i> <strong>Pembentukan Karakter Anak</strong><br>Penanaman nilai jujur, disiplin, gotong royong, toleransi, serta kearifan lokal Mentawai.</div><div class="misi-item"><i class="fas fa-leaf"></i> <strong>PAUD Holistik Integratif</strong><br>Perhatian pada gizi, kesehatan, pengasuhan, dan perlindungan anak di lingkungan sekolah.</div></div>`,
    gallery: []
};

// Konfigurasi upload
const MAX_FILE_SIZE_MB = 500; // 500 MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Load data dari LocalStorage dengan validasi
function loadData() {
    const savedData = localStorage.getItem('komunitasPAUD');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            if (parsed && Array.isArray(parsed.gallery)) {
                komunitasData = parsed;
                // Pastikan setiap foto memiliki ID yang valid
                komunitasData.gallery = komunitasData.gallery.filter(foto => foto && foto.id);
                // Re-assign ID jika ada yang duplikat
                const ids = new Set();
                komunitasData.gallery = komunitasData.gallery.filter(foto => {
                    if (ids.has(foto.id)) {
                        foto.id = Date.now() + Math.floor(Math.random() * 100000);
                    }
                    ids.add(foto.id);
                    return true;
                });
            } else if (parsed) {
                komunitasData = { ...komunitasData, ...parsed };
                if (!Array.isArray(komunitasData.gallery)) {
                    komunitasData.gallery = [];
                }
            }
        } catch(e) {
            console.error('Error parsing saved data:', e);
            komunitasData.gallery = [];
        }
    }
    
    // Jika gallery kosong, tambahkan default
    if (komunitasData.gallery.length === 0) {
        for (let i = 1; i <= 4; i++) {
            komunitasData.gallery.push({
                id: Date.now() + i,
                url: `https://placehold.co/400x400/E7C994/9C6A3A?text=Foto+PAUD+${i}`,
                caption: `Kegiatan PAUD ${i}`
            });
        }
        saveData();
    }
}

// Fungsi simpan ke LocalStorage
function saveData() {
    localStorage.setItem('komunitasPAUD', JSON.stringify(komunitasData));
    console.log("Data tersimpan, jumlah gallery:", komunitasData.gallery.length);
}

// ============================================
// FUNGSI UPLOAD COVER - MAX 500 MB
// ============================================
function uploadCoverPhoto(file) {
    if (!file) {
        showNotification('Pilih file terlebih dahulu!', 'error');
        return;
    }
    
    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
        showNotification('Harap pilih file gambar!', 'error');
        return;
    }
    
    // Validasi ukuran file (max 500 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        showNotification(`Ukuran file terlalu besar! (${fileSizeMB} MB). Maksimal ${MAX_FILE_SIZE_MB} MB!`, 'error');
        return;
    }
    
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    console.log(`Upload cover: ${file.name}, ukuran: ${fileSizeMB} MB`);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        komunitasData.coverPhoto = e.target.result;
        saveData();
        renderCoverPhoto();
        showNotification(`Foto cover berhasil diupdate! (${fileSizeMB} MB)`, 'success');
        const coverUpload = document.getElementById('coverUpload');
        if (coverUpload) coverUpload.value = '';
    };
    reader.onerror = function() {
        showNotification('Gagal membaca file!', 'error');
    };
    reader.readAsDataURL(file);
}

// ============================================
// FUNGSI UPLOAD DOKUMENTASI - MAX 500 MB per file
// ============================================
function uploadDokumentasi(files) {
    if (!files || files.length === 0) {
        showNotification('Pilih foto yang akan diupload!', 'error');
        return;
    }
    
    let count = 0;
    let successCount = 0;
    const total = files.length;
    
    for (let file of files) {
        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            showNotification(`File ${file.name} bukan gambar!`, 'error');
            count++;
            if (count === total) {
                const docUpload = document.getElementById('docUpload');
                if (docUpload) docUpload.value = '';
                if (successCount > 0) {
                    showNotification(`${successCount} foto berhasil ditambahkan!`, 'success');
                }
            }
            continue;
        }
        
        // Validasi ukuran file (max 500 MB)
        if (file.size > MAX_FILE_SIZE_BYTES) {
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
            showNotification(`File ${file.name} terlalu besar (${fileSizeMB} MB)! Maksimal ${MAX_FILE_SIZE_MB} MB`, 'error');
            count++;
            if (count === total) {
                const docUpload = document.getElementById('docUpload');
                if (docUpload) docUpload.value = '';
                if (successCount > 0) {
                    showNotification(`${successCount} foto berhasil ditambahkan!`, 'success');
                }
            }
            continue;
        }
        
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        console.log(`Upload dokumentasi: ${file.name}, ukuran: ${fileSizeMB} MB`);
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const newId = Date.now() + Math.floor(Math.random() * 100000) + count;
            const caption = prompt('Masukkan caption untuk foto ini:', `Kegiatan PAUD Karamen Simaeruk (${fileSizeMB} MB)`);
            
            komunitasData.gallery.push({
                id: newId,
                url: e.target.result,
                caption: caption || `Kegiatan PAUD (${fileSizeMB} MB)`
            });
            
            count++;
            successCount++;
            
            if (count === total) {
                saveData();
                renderGallery();
                renderGalleryManager();
                showNotification(`${successCount} dari ${total} foto berhasil ditambahkan!`, 'success');
                const docUpload = document.getElementById('docUpload');
                if (docUpload) docUpload.value = '';
            }
        };
        reader.onerror = function() {
            showNotification(`Gagal membaca file ${file.name}!`, 'error');
            count++;
            if (count === total) {
                const docUpload = document.getElementById('docUpload');
                if (docUpload) docUpload.value = '';
                if (successCount > 0) {
                    showNotification(`${successCount} foto berhasil ditambahkan!`, 'success');
                }
            }
        };
        reader.readAsDataURL(file);
    }
}

// ============================================
// FUNGSI RENDER GALLERY MANAGER
// ============================================
function renderGalleryManager() {
    const manager = document.getElementById('galleryManager');
    if (!manager) return;
    
    manager.innerHTML = '';
    
    if (komunitasData.gallery.length === 0) {
        manager.innerHTML = '<p style="text-align:center; padding:20px;">Belum ada foto. Klik "Tambah Foto" untuk mengupload.</p>';
        return;
    }
    
    komunitasData.gallery.forEach((foto, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-manager-item';
        item.setAttribute('data-foto-index', index);
        item.innerHTML = `
            <img src="${foto.url}" alt="${foto.caption}">
            <input type="text" class="caption-input" data-id="${foto.id}" value="${escapeHtml(foto.caption)}" placeholder="Caption foto">
            <button class="delete-doc-btn" data-id="${foto.id}" data-index="${index}"><i class="fas fa-trash"></i> Hapus</button>
        `;
        manager.appendChild(item);
    });
    
    // Event untuk edit caption
    const captionInputs = document.querySelectorAll('.caption-input');
    captionInputs.forEach(input => {
        input.onchange = function() {
            const id = parseInt(this.getAttribute('data-id'));
            const found = komunitasData.gallery.find(f => f.id === id);
            if (found) {
                found.caption = this.value;
                saveData();
                renderGallery();
                showNotification('Caption berhasil diupdate!', 'success');
            }
        };
    });
    
    // Event untuk tombol hapus
    const deleteBtns = document.querySelectorAll('.delete-doc-btn');
    deleteBtns.forEach(btn => {
        btn.removeEventListener('click', handleDelete);
        btn.addEventListener('click', handleDelete);
    });
}

// Fungsi handle delete
function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const btn = e.currentTarget;
    const id = parseInt(btn.getAttribute('data-id'));
    const index = parseInt(btn.getAttribute('data-index'));
    
    if (confirm(`Apakah Anda yakin ingin menghapus foto ini?`)) {
        let foundIndex = komunitasData.gallery.findIndex(f => f.id === id);
        
        if (foundIndex === -1 && index >= 0 && index < komunitasData.gallery.length) {
            foundIndex = index;
        }
        
        if (foundIndex !== -1) {
            komunitasData.gallery.splice(foundIndex, 1);
            saveData();
            renderGallery();
            renderGalleryManager();
            showNotification('Foto berhasil dihapus!', 'success');
        } else {
            showNotification('Gagal menghapus foto!', 'error');
        }
    }
}

// ============================================
// FUNGSI CEK UKURAN STORAGE (opsional)
// ============================================
function checkStorageSize() {
    let totalSize = 0;
    for (let foto of komunitasData.gallery) {
        if (foto.url && foto.url.startsWith('data:image')) {
            // Perkiraan ukuran base64 (hampir sama dengan ukuran asli)
            const sizeInBytes = Math.ceil(foto.url.length * 0.75);
            totalSize += sizeInBytes;
        }
    }
    
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`Total penyimpanan foto: ${totalSizeMB} MB`);
    
    // Peringatan jika melebihi 50MB (karena localStorage terbatas)
    if (totalSize > 50 * 1024 * 1024) {
        showNotification(`Peringatan: Total foto ${totalSizeMB} MB. LocalStorage mungkin penuh!`, 'error');
    } else {
        showNotification(`Total foto: ${komunitasData.gallery.length} (${totalSizeMB} MB)`, 'success');
    }
    
    return totalSize;
}

// ============================================
// FUNGSI HAPUS COVER
// ============================================
function deleteCoverPhoto() {
    if (confirm('Hapus foto cover? Foto akan kembali ke default.')) {
        komunitasData.coverPhoto = "https://placehold.co/600x300/FCE9C4/B47C42?text=Ilustrasi+PAUD+Mentawai";
        saveData();
        renderCoverPhoto();
        showNotification('Foto cover berhasil dihapus!', 'success');
    }
}

// ============================================
// FUNGSI HAPUS SEMUA FOTO
// ============================================
function deleteAllPhotos() {
    if (confirm('⚠️ HAPUS SEMUA FOTO? Tindakan ini tidak bisa dibatalkan!')) {
        komunitasData.gallery = [];
        saveData();
        renderGallery();
        renderGalleryManager();
        showNotification('Semua foto berhasil dihapus!', 'success');
    }
}

// ============================================
// FUNGSI RESET DATA
// ============================================
function resetAllData() {
    if (confirm('⚠️ RESET TOTAL! Semua data akan kembali ke default. Lanjutkan?')) {
        localStorage.removeItem('komunitasPAUD');
        location.reload();
    }
}

// ============================================
// FUNGSI RENDER LAINNYA
// ============================================
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (komunitasData.gallery.length === 0) {
        grid.innerHTML = '<p style="text-align:center; padding:40px;">Belum ada foto dokumentasi. Silakan tambah melalui Admin Panel.</p>';
        return;
    }
    
    komunitasData.gallery.forEach((foto, idx) => {
        const card = document.createElement('div');
        card.className = 'foto-card';
        card.style.setProperty('--index', idx);
        card.innerHTML = `
            <img src="${foto.url}" alt="${foto.caption}" loading="lazy" onerror="this.src='https://placehold.co/400x400/E7C994/9C6A3A?text=Error'">
            <p><i class="fas fa-camera"></i> ${escapeHtml(foto.caption)}</p>
        `;
        card.onclick = () => openLightbox(foto.url);
        grid.appendChild(card);
    });
}

function renderCoverPhoto() {
    const coverImg = document.getElementById('coverProfileImg');
    if (coverImg) coverImg.src = komunitasData.coverPhoto;
    const currentCover = document.getElementById('currentCoverImg');
    if (currentCover) currentCover.src = komunitasData.coverPhoto;
}

function renderDeskripsi() {
    const div = document.getElementById('deskripsiDisplay');
    if (div) div.innerHTML = komunitasData.deskripsi;
    
    const ta = document.getElementById('deskripsiText');
    if (ta) {
        const temp = document.createElement('div');
        temp.innerHTML = komunitasData.deskripsi;
        ta.value = temp.innerText;
    }
}

function renderVisiMisi() {
    const visiDiv = document.getElementById('visiDisplay');
    if (visiDiv) visiDiv.innerHTML = komunitasData.visi;
    
    const misiDiv = document.getElementById('misiDisplay');
    if (misiDiv) misiDiv.innerHTML = komunitasData.misi;
    
    const visiTa = document.getElementById('visiText');
    if (visiTa) {
        const temp = document.createElement('div');
        temp.innerHTML = komunitasData.visi;
        visiTa.value = temp.innerText.replace(/"/g, '').trim();
    }
    
    const misiTa = document.getElementById('misiText');
    if (misiTa) {
        let misiText = '';
        const temp = document.createElement('div');
        temp.innerHTML = komunitasData.misi;
        const items = temp.querySelectorAll('.misi-item');
        items.forEach(item => {
            const strong = item.querySelector('strong');
            const title = strong ? strong.innerText : 'Misi';
            const text = item.innerText.replace(title, '').trim();
            misiText += title + ': ' + text + '\n';
        });
        misiTa.value = misiText || temp.innerText;
    }
}

function renderAll() {
    renderCoverPhoto();
    renderDeskripsi();
    renderVisiMisi();
    renderGallery();
    renderGalleryManager();
}

function saveDeskripsi() {
    const text = document.getElementById('deskripsiText').value;
    if (!text.trim()) {
        showNotification('Deskripsi tidak boleh kosong!', 'error');
        return;
    }
    const paragraphs = text.split('\n\n');
    let html = '';
    for (let para of paragraphs) {
        if (para.trim()) {
            html += `<p>${escapeHtml(para).replace(/\n/g, '<br>')}</p>`;
        }
    }
    komunitasData.deskripsi = html;
    saveData();
    renderDeskripsi();
    showNotification('Deskripsi berhasil disimpan!', 'success');
}

function saveVisiMisi() {
    const visiText = document.getElementById('visiText').value;
    const misiText = document.getElementById('misiText').value;
    
    if (!visiText.trim()) {
        showNotification('Visi tidak boleh kosong!', 'error');
        return;
    }
    
    komunitasData.visi = `<p style="font-size:1.2rem; font-weight:600; background:#F7EAD6; border-radius: 30px; padding: 16px;"><i class="fas fa-quote-left"></i> "${escapeHtml(visiText)}"</p><p>Inti visi: <strong>Anak PAUD menjadi generasi emas yang pintar dan berkarakter Pancasila</strong> dengan semangat budaya Mentawai.</p>`;
    
    if (misiText.trim()) {
        const lines = misiText.split('\n').filter(l => l.trim());
        let misiHtml = '<div class="grid-misi">';
        for (let line of lines) {
            let title = 'Misi', desc = line;
            const idx = line.indexOf(':');
            if (idx !== -1) {
                title = line.substring(0, idx).trim();
                desc = line.substring(idx + 1).trim();
            }
            misiHtml += `<div class="misi-item"><i class="fas fa-star"></i> <strong>${escapeHtml(title)}</strong><br>${escapeHtml(desc)}</div>`;
        }
        misiHtml += '</div>';
        komunitasData.misi = misiHtml;
    }
    
    saveData();
    renderVisiMisi();
    showNotification('Visi & Misi berhasil disimpan!', 'success');
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function showNotification(message, type) {
    const oldNotif = document.querySelector('.custom-notification');
    if (oldNotif) oldNotif.remove();
    
    const notif = document.createElement('div');
    notif.className = 'custom-notification';
    notif.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        z-index: 1003;
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    notif.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) lightboxImg.src = src;
    if (lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPage(pageId) {
    const pages = ['cover', 'deskripsi', 'visimisi', 'dokumentasi'];
    for (let p of pages) {
        const el = document.getElementById(`${p}-page`);
        if (el) el.classList.remove('active-page');
    }
    const active = document.getElementById(`${pageId}-page`);
    if (active) active.classList.add('active-page');
    
    const btns = document.querySelectorAll('.nav-btn');
    for (let btn of btns) {
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderAll();
    
    const navBtns = document.querySelectorAll('.nav-btn');
    for (let btn of navBtns) {
        btn.onclick = function() {
            showPage(this.getAttribute('data-page'));
        };
    }
    
    const toDesk = document.getElementById('toDeskBtn');
    if (toDesk) toDesk.onclick = () => showPage('deskripsi');
    
    const toGal = document.getElementById('toGalBtn');
    if (toGal) toGal.onclick = () => showPage('dokumentasi');
    
    const toggle = document.getElementById('adminToggleBtn');
    const panel = document.getElementById('adminPanel');
    const close = document.getElementById('closeAdminBtn');
    
    if (toggle) toggle.onclick = () => panel.classList.toggle('open');
    if (close) close.onclick = () => panel.classList.remove('open');
    
    const tabs = document.querySelectorAll('.admin-tab');
    for (let tab of tabs) {
        tab.onclick = function() {
            for (let t of tabs) t.classList.remove('active');
            this.classList.add('active');
            const contents = document.querySelectorAll('.admin-tab-content');
            for (let c of contents) c.classList.remove('active');
            const target = document.getElementById(`tab-${this.getAttribute('data-tab')}`);
            if (target) target.classList.add('active');
            
            if (this.getAttribute('data-tab') === 'dokumentasi') {
                renderGalleryManager();
            }
        };
    }
    
    const saveCover = document.getElementById('saveCoverBtn');
    if (saveCover) {
        saveCover.onclick = function() {
            const file = document.getElementById('coverUpload').files[0];
            if (file) uploadCoverPhoto(file);
            else showNotification('Pilih file foto dulu!', 'error');
        };
    }
    
    const deleteCover = document.getElementById('deleteCoverBtn');
    if (deleteCover) deleteCover.onclick = deleteCoverPhoto;
    
    const addPhotos = document.getElementById('addPhotosBtn');
    if (addPhotos) {
        addPhotos.onclick = function() {
            const files = document.getElementById('docUpload').files;
            if (files.length > 0) uploadDokumentasi(files);
            else showNotification('Pilih foto yang akan diupload!', 'error');
        };
    }
    
    const saveDesc = document.getElementById('saveDeskripsiBtn');
    if (saveDesc) saveDesc.onclick = saveDeskripsi;
    
    const saveVM = document.getElementById('saveVisimisiBtn');
    if (saveVM) saveVM.onclick = saveVisiMisi;
    
    const lb = document.getElementById('lightbox');
    if (lb) lb.onclick = closeLightbox;
    document.onkeydown = function(e) {
        if (e.key === 'Escape') closeLightbox();
    };
    
    window.onscroll = function() {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
    };
    
    addDecorations();
    
    console.log(`✅ Website siap! Maksimal upload: ${MAX_FILE_SIZE_MB} MB per file`);
});

function addDecorations() {
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