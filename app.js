// ============================================
// KOMBEL PAUD KARAMEN SIMAERUK
// FULLY UPDATED - UPLOAD LANGSUNG MUNCUL
// ============================================

// Data default dengan multiple gallery
let komunitasData = {
    coverPhoto: "https://placehold.co/600x300/FCE9C4/B47C42?text=Ilustrasi+PAUD+Mentawai",
    deskripsi: `<p><strong>Gugus PAUD Karamen Simaeruk</strong> adalah wadah koordinasi dan kerja sama antar satuan PAUD (TK, KB, TPA, SPS) di Kecamatan Karamen, Kepulauan Mentawai. Terinspirasi dari filosofi "Simaeruk" (bersatu dalam perbedaan), komunitas ini menjadi "rumah belajar" bagi para pendidik PAUD serta kepala sekolah untuk saling berbagi praktik baik, mengembangkan program bersama, dan meningkatkan mutu layanan anak usia dini.</p><br><p>Sebagai bagian dari penguatan <strong>Pusat Kegiatan Gugus (PKG) PAUD</strong>, kami mewadahi pembinaan profesionalitas guru secara terencana, koordinasi antarlembaga, serta pengembangan kurikulum yang kontekstual dengan budaya Mentawai.</p><br><div style="background: #EFE2CC; border-radius: 28px; padding: 20px;"><i class="fas fa-star-of-life"></i> <strong>Fungsi Utama Komunitas:</strong><ul style="margin-top: 12px; list-style-type: none;"><li>✓ Wadah Pembinaan & peningkatan kompetensi pendidik PAUD</li><li>✓ Pusat Koordinasi berbagi informasi & sumber daya antar lembaga</li><li>✓ Pengembangan Kurikulum bermuatan budaya Mentawai & standar mutu</li><li>✓ Kolaborasi bersama Dinas Pendidikan dan mitra orang tua</li></ul></div>`,
    visi: `<p style="font-size:1.2rem; font-weight:600; background:#F7EAD6; border-radius: 30px; padding: 16px;"><i class="fas fa-quote-left"></i> "Terwujudnya Gugus PAUD yang unggul, berkarakter, dan berdaya saing untuk membentuk generasi emas Indonesia yang cerdas, kreatif, dan berakhlak mulia"</p><p>Inti visi: <strong>Anak PAUD menjadi generasi emas yang pintar dan berkarakter Pancasila</strong> dengan semangat budaya Mentawai.</p>`,
    misi: `<div class="grid-misi"><div class="misi-item"><i class="fas fa-chalkboard-user"></i> <strong>Pengembangan Kompetensi Pendidik</strong><br>Meningkatkan profesionalisme guru melalui Kelompok Kerja Guru (KKG) dan pelatihan manajerial.</div><div class="misi-item"><i class="fas fa-book-open"></i> <strong>Peningkatan Kualitas Pembelajaran</strong><br>Memfasilitasi kurikulum inovatif, metode kreatif, dan alat penilaian sesuai tumbuh kembang anak.</div><div class="misi-item"><i class="fas fa-building"></i> <strong>Pengelolaan Kelembagaan</strong><br>Koordinasi administrasi PAUD yang tertib, akuntabel, dan berstandar nasional.</div><div class="misi-item"><i class="fas fa-handshake"></i> <strong>Kemitraan & Komunikasi</strong><br>Kolaborasi antara sekolah, orang tua, masyarakat, dan pemerintah.</div><div class="misi-item"><i class="fas fa-heart"></i> <strong>Pembentukan Karakter Anak</strong><br>Penanaman nilai jujur, disiplin, gotong royong, toleransi, serta kearifan lokal Mentawai.</div><div class="misi-item"><i class="fas fa-leaf"></i> <strong>PAUD Holistik Integratif</strong><br>Perhatian pada gizi, kesehatan, pengasuhan, dan perlindungan anak di lingkungan sekolah.</div></div>`,
    galleries: {
        "Kegiatan Belajar": [],
        "Ekstrakurikuler": [],
        "Acara Penting": [],
        "Prestasi": [],
        "Lainnya": []
    }
};

// Konfigurasi
const MAX_FILE_SIZE_MB = 500;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
let selectedGallery = "Kegiatan Belajar";

// ============================================
// LOAD & SAVE DATA
// ============================================
function loadData() {
    const savedData = localStorage.getItem('komunitasPAUD');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            if (parsed && parsed.galleries) {
                komunitasData = parsed;
            }
        } catch(e) {
            console.error('Error:', e);
        }
    }
    
    const defaultGalleries = ["Kegiatan Belajar", "Ekstrakurikuler", "Acara Penting", "Prestasi", "Lainnya"];
    defaultGalleries.forEach(gallery => {
        if (!komunitasData.galleries[gallery]) {
            komunitasData.galleries[gallery] = [];
        }
    });
    
    saveData();
}

function saveData() {
    localStorage.setItem('komunitasPAUD', JSON.stringify(komunitasData));
    console.log("Data tersimpan");
}

// ============================================
// UPLOAD DOKUMENTASI
// ============================================
function uploadDokumentasi(files) {
    if (!files || files.length === 0) {
        showNotification('Pilih foto yang akan diupload!', 'error');
        return;
    }
    
    let processed = 0;
    let successCount = 0;
    const total = files.length;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
            showNotification(`File ${file.name} bukan gambar!`, 'error');
            processed++;
            checkComplete(processed, total, successCount);
            continue;
        }
        
        if (file.size > MAX_FILE_SIZE_BYTES) {
            showNotification(`File ${file.name} terlalu besar!`, 'error');
            processed++;
            checkComplete(processed, total, successCount);
            continue;
        }
        
        const reader = new FileReader();
        
        reader.onload = (function(file, galleryName) {
            return function(e) {
                const newId = Date.now() + Math.floor(Math.random() * 100000) + processed;
                const caption = prompt(`Caption untuk: ${file.name}`, `Foto - ${galleryName}`);
                
                if (!komunitasData.galleries[galleryName]) {
                    komunitasData.galleries[galleryName] = [];
                }
                
                komunitasData.galleries[galleryName].push({
                    id: newId,
                    url: e.target.result,
                    caption: caption || `Foto ${galleryName}`,
                    uploadedAt: new Date().toISOString()
                });
                
                processed++;
                successCount++;
                
                saveData();
                
                // LANGSUNG RENDER ULANG
                renderGallery();
                renderGalleryManager();
                
                checkComplete(processed, total, successCount);
            };
        })(file, selectedGallery);
        
        reader.onerror = (function(fileName) {
            return function() {
                showNotification(`Gagal membaca file ${fileName}!`, 'error');
                processed++;
                checkComplete(processed, total, successCount);
            };
        })(file.name);
        
        reader.readAsDataURL(file);
    }
}

function checkComplete(processed, total, successCount) {
    if (processed === total && successCount > 0) {
        showNotification(`${successCount} foto berhasil ditambahkan ke "${selectedGallery}"!`, 'success');
        const docUpload = document.getElementById('docUpload');
        if (docUpload) docUpload.value = '';
    }
}

// ============================================
// RENDER GALERI UTAMA
// ============================================
function renderGallery() {
    // Cari container dengan berbagai kemungkinan ID
    let container = document.getElementById('galleryContainer');
    if (!container) container = document.getElementById('galleryGrid');
    if (!container) container = document.getElementById('dokumentasiGrid');
    if (!container) container = document.querySelector('.gallery-grid');
    if (!container) container = document.querySelector('#dokumentasi-page .gallery');
    
    if (!container) {
        console.error("Container galeri tidak ditemukan!");
        return;
    }
    
    container.innerHTML = '';
    
    // Selector Galeri
    const selectorDiv = document.createElement('div');
    selectorDiv.className = 'gallery-selector';
    selectorDiv.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 30px;
        padding: 15px;
        background: #F7EAD6;
        border-radius: 60px;
        justify-content: center;
    `;
    
    const galleryNames = Object.keys(komunitasData.galleries);
    
    galleryNames.forEach(name => {
        const btn = document.createElement('button');
        const fotoCount = komunitasData.galleries[name].length;
        btn.textContent = `${name} (${fotoCount})`;
        btn.style.cssText = `
            padding: 10px 24px;
            border: none;
            border-radius: 40px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            background: ${selectedGallery === name ? '#B47C42' : '#FFFFFF'};
            color: ${selectedGallery === name ? '#FFFFFF' : '#4A3520'};
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: all 0.3s;
        `;
        btn.onclick = () => {
            selectedGallery = name;
            renderGallery();
            renderGalleryManager();
        };
        selectorDiv.appendChild(btn);
    });
    
    container.appendChild(selectorDiv);
    
    // Grid Foto
    const galleryGrid = document.createElement('div');
    galleryGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
        padding: 10px;
    `;
    
    const currentPhotos = komunitasData.galleries[selectedGallery] || [];
    
    if (currentPhotos.length === 0) {
        galleryGrid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px; background:#F9F5EE; border-radius:20px;">
                <i class="fas fa-images" style="font-size:48px; color:#B47C42; margin-bottom:15px; display:block;"></i>
                <h3>Belum ada foto di "${selectedGallery}"</h3>
                <p>Silakan upload foto melalui Admin Panel</p>
            </div>
        `;
    } else {
        currentPhotos.forEach((foto) => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: white;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 6px 15px rgba(0,0,0,0.1);
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
            `;
            card.onmouseenter = () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
            };
            card.onmouseleave = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
            };
            card.onclick = () => openLightbox(foto.url);
            card.innerHTML = `
                <img src="${foto.url}" style="width:100%; height:220px; object-fit:cover;">
                <div style="padding: 12px;">
                    <p style="margin:0; color:#4A3520;"><i class="fas fa-camera"></i> ${escapeHtml(foto.caption)}</p>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }
    
    container.appendChild(galleryGrid);
}

// ============================================
// RENDER GALLERY MANAGER (ADMIN)
// ============================================
function renderGalleryManager() {
    const manager = document.getElementById('galleryManager');
    if (!manager) return;
    
    manager.innerHTML = '';
    
    // Selector
    const adminSelector = document.createElement('div');
    adminSelector.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
        padding: 12px;
        background: #F7EAD6;
        border-radius: 50px;
        justify-content: center;
    `;
    
    const galleryNames = Object.keys(komunitasData.galleries);
    
    galleryNames.forEach(name => {
        const btn = document.createElement('button');
        btn.textContent = `${name} (${komunitasData.galleries[name].length})`;
        btn.style.cssText = `
            padding: 6px 18px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-weight: bold;
            background: ${selectedGallery === name ? '#B47C42' : 'white'};
            color: ${selectedGallery === name ? 'white' : '#4A3520'};
        `;
        btn.onclick = () => {
            selectedGallery = name;
            renderGalleryManager();
            renderGallery();
        };
        adminSelector.appendChild(btn);
    });
    
    manager.appendChild(adminSelector);
    
    // Info upload
    const uploadInfo = document.createElement('div');
    uploadInfo.style.cssText = `
        background: #E8F5E9;
        padding: 12px;
        border-radius: 12px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        color: #2E7D32;
    `;
    uploadInfo.innerHTML = `<i class="fas fa-upload"></i> Upload foto akan masuk ke: <span style="color:#B47C42;">${selectedGallery}</span>`;
    manager.appendChild(uploadInfo);
    
    const currentPhotos = komunitasData.galleries[selectedGallery] || [];
    
    if (currentPhotos.length === 0) {
        manager.innerHTML += `<p style="text-align:center; padding:30px;">Belum ada foto di galeri "${selectedGallery}"</p>`;
        return;
    }
    
    currentPhotos.forEach((foto) => {
        const item = document.createElement('div');
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px;
            border-bottom: 1px solid #eee;
            flex-wrap: wrap;
            background: #fff;
            margin-bottom: 8px;
            border-radius: 12px;
        `;
        item.innerHTML = `
            <img src="${foto.url}" style="width:70px; height:70px; object-fit:cover; border-radius:10px;">
            <input type="text" class="caption-input" data-id="${foto.id}" data-gallery="${selectedGallery}" value="${escapeHtml(foto.caption)}" style="flex:2; padding:10px; border-radius:8px; border:1px solid #ddd;">
            <button class="delete-photo-btn" data-id="${foto.id}" data-gallery="${selectedGallery}" style="background:#e74c3c; color:white; border:none; padding:8px 16px; border-radius:8px; cursor:pointer;">
                <i class="fas fa-trash"></i> Hapus
            </button>
        `;
        manager.appendChild(item);
    });
    
    // Event edit caption
    document.querySelectorAll('.caption-input').forEach(input => {
        input.onchange = function() {
            const gallery = this.getAttribute('data-gallery');
            const id = parseInt(this.getAttribute('data-id'));
            const foto = komunitasData.galleries[gallery]?.find(f => f.id === id);
            if (foto) {
                foto.caption = this.value;
                saveData();
                renderGallery();
                showNotification('Caption berhasil diupdate!', 'success');
            }
        };
    });
    
    // Event hapus foto
    document.querySelectorAll('.delete-photo-btn').forEach(btn => {
        btn.onclick = function() {
            const gallery = this.getAttribute('data-gallery');
            const id = parseInt(this.getAttribute('data-id'));
            
            if (confirm(`Hapus foto dari galeri "${gallery}"?`)) {
                const index = komunitasData.galleries[gallery].findIndex(f => f.id === id);
                if (index !== -1) {
                    komunitasData.galleries[gallery].splice(index, 1);
                    saveData();
                    renderGallery();
                    renderGalleryManager();
                    showNotification('Foto berhasil dihapus!', 'success');
                }
            }
        };
    });
}

// ============================================
// FUNGSI LAINNYA
// ============================================
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

function uploadCoverPhoto(file) {
    if (!file) {
        showNotification('Pilih file terlebih dahulu!', 'error');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showNotification('Harap pilih file gambar!', 'error');
        return;
    }
    
    if (file.size > MAX_FILE_SIZE_BYTES) {
        showNotification(`Ukuran file terlalu besar! Maksimal ${MAX_FILE_SIZE_MB} MB!`, 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        komunitasData.coverPhoto = e.target.result;
        saveData();
        renderCoverPhoto();
        showNotification('Foto cover berhasil diupdate!', 'success');
        const coverUpload = document.getElementById('coverUpload');
        if (coverUpload) coverUpload.value = '';
    };
    reader.readAsDataURL(file);
}

function deleteCoverPhoto() {
    if (confirm('Hapus foto cover? Foto akan kembali ke default.')) {
        komunitasData.coverPhoto = "https://placehold.co/600x300/FCE9C4/B47C42?text=Ilustrasi+PAUD+Mentawai";
        saveData();
        renderCoverPhoto();
        showNotification('Foto cover berhasil dihapus!', 'success');
    }
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
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        `;
        lightbox.innerHTML = '<img id="lightboxImg" style="max-width:90%; max-height:90%;">';
        lightbox.onclick = closeLightbox;
        document.body.appendChild(lightbox);
    }
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) lightboxImg.src = src;
    lightbox.classList.add('active');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
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
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderAll();
    
    // Navigasi
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.onclick = () => showPage(btn.getAttribute('data-page'));
    });
    
    const toDesk = document.getElementById('toDeskBtn');
    if (toDesk) toDesk.onclick = () => showPage('deskripsi');
    
    const toGal = document.getElementById('toGalBtn');
    if (toGal) toGal.onclick = () => showPage('dokumentasi');
    
    // Admin Panel
    const toggle = document.getElementById('adminToggleBtn');
    const panel = document.getElementById('adminPanel');
    const close = document.getElementById('closeAdminBtn');
    
    if (toggle) toggle.onclick = () => panel.classList.toggle('open');
    if (close) close.onclick = () => panel.classList.remove('open');
    
    // Tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.onclick = function() {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            const target = document.getElementById(`tab-${this.getAttribute('data-tab')}`);
            if (target) target.classList.add('active');
            if (this.getAttribute('data-tab') === 'dokumentasi') renderGalleryManager();
        };
    });
    
    // Cover buttons
    const saveCover = document.getElementById('saveCoverBtn');
    if (saveCover) saveCover.onclick = () => {
        const file = document.getElementById('coverUpload')?.files[0];
        file ? uploadCoverPhoto(file) : showNotification('Pilih file foto dulu!', 'error');
    };
    
    const deleteCover = document.getElementById('deleteCoverBtn');
    if (deleteCover) deleteCover.onclick = deleteCoverPhoto;
    
    // Upload dokumentasi button
    const addPhotos = document.getElementById('addPhotosBtn');
    if (addPhotos) {
        addPhotos.onclick = () => {
            const files = document.getElementById('docUpload')?.files;
            if (files && files.length > 0) {
                if (confirm(`Upload ${files.length} foto ke galeri "${selectedGallery}"?`)) {
                    uploadDokumentasi(files);
                }
            } else {
                showNotification('Pilih foto yang akan diupload!', 'error');
            }
        };
    }
    
    // Save buttons
    const saveDesc = document.getElementById('saveDeskripsiBtn');
    if (saveDesc) saveDesc.onclick = saveDeskripsi;
    
    const saveVM = document.getElementById('saveVisimisiBtn');
    if (saveVM) saveVM.onclick = saveVisiMisi;
    
    // Keyboard escape
    document.onkeydown = (e) => { if (e.key === 'Escape') closeLightbox(); };
    
    // Navbar scroll
    window.onscroll = () => {
        const nav = document.querySelector('nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    
    console.log("✅ Website siap! Upload foto akan langsung muncul di dokumentasi");
});