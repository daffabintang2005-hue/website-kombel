// ============================================
// KOMBEL PAUD KARAMEN SIMAERUK
// FIXED: HANDLE UPLOAD DI HP + DATA TIDAK HILANG
// ============================================

// Data default
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

// KONFIGURASI - DIKECILKAN UNTUK HP
const MAX_FILE_SIZE_MB = 2; // MAX 2MB (bukan 500MB!)
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const COMPRESSION_QUALITY = 0.6; // Kompresi 60%
const MAX_IMAGE_WIDTH = 800; // Resize maksimal lebar 800px

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
            console.error('Error loading:', e);
            // Jika data corrupt, reset
            localStorage.removeItem('komunitasPAUD');
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
    try {
        localStorage.setItem('komunitasPAUD', JSON.stringify(komunitasData));
        console.log("Data tersimpan, ukuran:", JSON.stringify(komunitasData).length, "bytes");
    } catch(e) {
        if (e.name === 'QuotaExceededError') {
            showNotification('Peringatan: Penyimpanan penuh! Hapus beberapa foto lama.', 'error');
            console.error("LocalStorage penuh!");
        }
    }
}

// ============================================
// KOMPRESI GAMBAR SEBELUM DISIMPAN
// ============================================
function compressImage(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            // Hitung dimensi baru
            let width = img.width;
            let height = img.height;
            
            if (width > MAX_IMAGE_WIDTH) {
                height = (height * MAX_IMAGE_WIDTH) / width;
                width = MAX_IMAGE_WIDTH;
            }
            
            // Buat canvas untuk kompresi
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // Kompres ke JPEG dengan kualitas tertentu
            const compressedDataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
            
            // Hitung ukuran setelah kompresi
            const compressedSize = Math.round((compressedDataUrl.length * 0.75) / 1024);
            console.log(`Ukuran asli: ${Math.round(file.size/1024)}KB, Setelah kompresi: ${compressedSize}KB`);
            
            callback(compressedDataUrl);
        };
    };
}

// ============================================
// UPLOAD DOKUMENTASI DENGAN KOMPRESI
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
        
        // Cek ukuran asli
        if (file.size > 10 * 1024 * 1024) {
            showNotification(`File ${file.name} terlalu besar (${(file.size/1024/1024).toFixed(1)}MB)! Maksimal 10MB sebelum kompresi.`, 'error');
            processed++;
            checkComplete(processed, total, successCount);
            continue;
        }
        
        showNotification(`Mengompresi ${file.name}...`, 'info');
        
        compressImage(file, function(compressedUrl) {
            const newId = Date.now() + Math.floor(Math.random() * 100000) + processed;
            const caption = prompt(`Caption untuk foto:`, `Kegiatan ${selectedGallery}`);
            
            if (!komunitasData.galleries[selectedGallery]) {
                komunitasData.galleries[selectedGallery] = [];
            }
            
            komunitasData.galleries[selectedGallery].push({
                id: newId,
                url: compressedUrl,
                caption: caption || `Kegiatan ${selectedGallery}`,
                uploadedAt: new Date().toISOString()
            });
            
            processed++;
            successCount++;
            
            saveData();
            
            // RENDER ULANG
            renderGallery();
            renderGalleryManager();
            
            checkComplete(processed, total, successCount);
        });
    }
}

function checkComplete(processed, total, successCount) {
    if (processed === total) {
        if (successCount > 0) {
            showNotification(`${successCount} foto berhasil ditambahkan ke "${selectedGallery}"!`, 'success');
        }
        const docUpload = document.getElementById('docUpload');
        if (docUpload) docUpload.value = '';
    }
}

// ============================================
// FUNGSI CEK DAN HAPUS DATA BERAT
// ============================================
function checkStorageSize() {
    let totalSize = 0;
    for (let gallery in komunitasData.galleries) {
        for (let foto of komunitasData.galleries[gallery]) {
            if (foto.url && foto.url.startsWith('data:image')) {
                totalSize += foto.url.length * 0.75;
            }
        }
    }
    const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
    showNotification(`Total penyimpanan: ${totalMB} MB / ~10 MB`, totalMB > 8 ? 'error' : 'success');
    return totalSize;
}

function clearAllPhotos() {
    if (confirm('HAPUS SEMUA FOTO? Tindakan ini tidak bisa dibatalkan!')) {
        komunitasData.galleries = {
            "Kegiatan Belajar": [],
            "Ekstrakurikuler": [],
            "Acara Penting": [],
            "Prestasi": [],
            "Lainnya": []
        };
        saveData();
        renderGallery();
        renderGalleryManager();
        showNotification('Semua foto telah dihapus!', 'success');
    }
}

// ============================================
// RENDER GALERI (SAMA SEPERTI SEBELUMNYA)
// ============================================
function renderGallery() {
    let container = document.getElementById('galleryContainer');
    if (!container) container = document.getElementById('galleryGrid');
    if (!container) container = document.querySelector('.gallery-grid');
    if (!container) {
        console.error("Container galeri tidak ditemukan!");
        return;
    }
    
    container.innerHTML = '';
    
    // Selector Galeri
    const selectorDiv = document.createElement('div');
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
                <small style="display:block; margin-top:10px; color:#999;">Max 2MB per foto (otomatis dikompres)</small>
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
                transition: transform 0.3s;
            `;
            card.onclick = () => openLightbox(foto.url);
            card.innerHTML = `
                <img src="${foto.url}" style="width:100%; height:200px; object-fit:cover;">
                <div style="padding: 12px;">
                    <p style="margin:0; color:#4A3520;"><i class="fas fa-camera"></i> ${escapeHtml(foto.caption)}</p>
                    <small style="color:#999;">${foto.uploadedAt ? new Date(foto.uploadedAt).toLocaleDateString() : ''}</small>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }
    
    container.appendChild(galleryGrid);
}

// ============================================
// RENDER GALLERY MANAGER (ADMIN PANEL)
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
    
    // Tombol hapus semua
    const clearAllBtn = document.createElement('button');
    clearAllBtn.textContent = '🗑️ Hapus Semua Foto';
    clearAllBtn.style.cssText = `
        background: #e74c3c;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 30px;
        cursor: pointer;
        margin-bottom: 20px;
        width: 100%;
        font-weight: bold;
    `;
    clearAllBtn.onclick = clearAllPhotos;
    manager.appendChild(clearAllBtn);
    
    // Info upload
    const uploadInfo = document.createElement('div');
    uploadInfo.style.cssText = `
        background: #E8F5E9;
        padding: 12px;
        border-radius: 12px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
    `;
    uploadInfo.innerHTML = `
        <i class="fas fa-info-circle"></i> 
        Upload ke: <strong>${selectedGallery}</strong><br>
        <small>Foto akan dikompres otomatis (max 800px, kualitas 60%)</small>
    `;
    manager.appendChild(uploadInfo);
    
    const currentPhotos = komunitasData.galleries[selectedGallery] || [];
    
    if (currentPhotos.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.style.cssText = 'text-align:center; padding:30px; color:#999;';
        emptyMsg.innerHTML = `Belum ada foto di galeri "${selectedGallery}"`;
        manager.appendChild(emptyMsg);
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
            <img src="${foto.url}" style="width:60px; height:60px; object-fit:cover; border-radius:10px;">
            <input type="text" class="caption-input" data-id="${foto.id}" data-gallery="${selectedGallery}" value="${escapeHtml(foto.caption)}" style="flex:2; padding:8px; border-radius:8px; border:1px solid #ddd; font-size:12px;">
            <button class="delete-photo-btn" data-id="${foto.id}" data-gallery="${selectedGallery}" style="background:#e74c3c; color:white; border:none; padding:6px 12px; border-radius:8px; cursor:pointer;">
                <i class="fas fa-trash"></i>
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
            
            if (confirm(`Hapus foto?`)) {
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
// UPLOAD COVER (DENGAN KOMPRESI)
// ============================================
function uploadCoverPhoto(file) {
    if (!file) {
        showNotification('Pilih file terlebih dahulu!', 'error');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showNotification('Harap pilih file gambar!', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showNotification(`Ukuran file terlalu besar! Maksimal 5MB.`, 'error');
        return;
    }
    
    showNotification('Mengompresi cover...', 'info');
    
    compressImage(file, function(compressedUrl) {
        komunitasData.coverPhoto = compressedUrl;
        saveData();
        renderCoverPhoto();
        showNotification('Foto cover berhasil diupdate!', 'success');
        const coverUpload = document.getElementById('coverUpload');
        if (coverUpload) coverUpload.value = '';
    });
}

// ============================================
// FUNGSI RENDER LAIN (SEDERHANA)
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

function deleteCoverPhoto() {
    if (confirm('Hapus foto cover?')) {
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
    let bgColor = '#27ae60';
    if (type === 'error') bgColor = '#e74c3c';
    if (type === 'info') bgColor = '#3498db';
    notif.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        z-index: 1003;
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        font-size: 14px;
        max-width: 80%;
    `;
    notif.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i> ${message}`;
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
        lightbox.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:9999; display:flex; justify-content:center; align-items:center; cursor:pointer;`;
        lightbox.innerHTML = '<img id="lightboxImg" style="max-width:90%; max-height:90%; object-fit:contain;">';
        lightbox.onclick = closeLightbox;
        document.body.appendChild(lightbox);
    }
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) lightboxImg.src = src;
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
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.onclick = () => showPage(btn.getAttribute('data-page'));
    });
    
    const toDesk = document.getElementById('toDeskBtn');
    if (toDesk) toDesk.onclick = () => showPage('deskripsi');
    const toGal = document.getElementById('toGalBtn');
    if (toGal) toGal.onclick = () => showPage('dokumentasi');
    
    const toggle = document.getElementById('adminToggleBtn');
    const panel = document.getElementById('adminPanel');
    const close = document.getElementById('closeAdminBtn');
    if (toggle) toggle.onclick = () => panel.classList.toggle('open');
    if (close) close.onclick = () => panel.classList.remove('open');
    
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
    
    const saveCover = document.getElementById('saveCoverBtn');
    if (saveCover) saveCover.onclick = () => {
        const file = document.getElementById('coverUpload')?.files[0];
        file ? uploadCoverPhoto(file) : showNotification('Pilih file foto dulu!', 'error');
    };
    const deleteCover = document.getElementById('deleteCoverBtn');
    if (deleteCover) deleteCover.onclick = deleteCoverPhoto;
    
    const addPhotos = document.getElementById('addPhotosBtn');
    if (addPhotos) {
        addPhotos.onclick = () => {
            const files = document.getElementById('docUpload')?.files;
            if (files && files.length > 0) {
                if (confirm(`Upload ${files.length} foto ke galeri "${selectedGallery}"?\n\nFoto akan dikompres otomatis.`)) {
                    uploadDokumentasi(files);
                }
            } else {
                showNotification('Pilih foto yang akan diupload!', 'error');
            }
        };
    }
    
    const saveDesc = document.getElementById('saveDeskripsiBtn');
    if (saveDesc) saveDesc.onclick = saveDeskripsi;
    const saveVM = document.getElementById('saveVisimisiBtn');
    if (saveVM) saveVM.onclick = saveVisiMisi;
    
    document.onkeydown = (e) => { if (e.key === 'Escape') closeLightbox(); };
    
    window.onscroll = () => {
        const nav = document.querySelector('nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    
    // Tambahkan tombol cek storage
    const storageCheckBtn = document.createElement('button');
    storageCheckBtn.innerHTML = '<i class="fas fa-database"></i> Cek Storage';
    storageCheckBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #4A3520;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 30px;
        cursor: pointer;
        z-index: 999;
        font-size: 12px;
        opacity: 0.7;
    `;
    storageCheckBtn.onclick = checkStorageSize;
    document.body.appendChild(storageCheckBtn);
    
    console.log("✅ Website siap! Foto akan dikompres otomatis agar tidak hilang.");
});