// ============================================
// KOMBEL PAUD KARAMEN SIMAERUK
// VERSI LOCAL STORAGE (TANPA DATABASE)
// DENGAN LOGIN ADMIN
// ============================================

// ============================================
// KONFIGURASI LOGIN ADMIN
// ============================================
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "paud123";

// Konfigurasi upload
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const COMPRESSION_QUALITY = 0.6;
const MAX_IMAGE_WIDTH = 800;

// ============================================
// DATA DEFAULT - KONTEN LENGKAP DARI PDF
// ============================================
let komunitasData = {
    coverPhoto: "https://placehold.co/600x300/FCE9C4/B47C42?text=Ilustrasi+PAUD+Mentawai",
    
    deskripsi: `<p><strong>Gugus PAUD</strong> adalah wadah koordinasi dan kerja sama antar TK, KB, TPA, SPS di satu Kecamatan. Tujuannya agar guru-guru PAUD bisa saling belajar, berbagi ilmu, dan mengembangkan program-program bersama, seperti "komunitas belajar" bagi guru PAUD bersama kepala sekolahnya, tidak berdiri sendiri-sendiri lagi.</p><br><div style="background: #EFE2CC; border-radius: 28px; padding: 20px;"><i class="fas fa-star-of-life"></i> <strong>Fungsi Utama Gugus PAUD:</strong><ul style="margin-top: 12px; list-style-type: none;"><li>✓ <strong>Wadah Pembinaan:</strong> Tempat untuk meningkatkan kompetensi dan profesionalisme pendidik serta tenaga kependidikan secara terencana.</li><li>✓ <strong>Pusat Koordinasi:</strong> Tempat berbagi informasi, pengalaman, dan sumber daya antar lembaga.</li><li>✓ <strong>Pengembangan Kurikulum:</strong> Membantu menyamakan standar dan mutu layanan pendidikan anak usia dini.</li></ul></div><p>Organisasi ini biasanya dibina oleh dinas pendidikan setempat dan sering kali dinaungi oleh wadah yang lebih besar bernama <strong>Pusat Kegiatan Gugus (PKG) PAUD</strong>.</p>`,
    
    visi: `<div style="background: #F7EAD6; border-radius: 30px; padding: 20px; margin-bottom: 20px;"><p style="font-size:1.2rem; font-weight:600; text-align:center;"><i class="fas fa-quote-left"></i> Visi Utama Gugus PAUD</p><p style="font-style:italic; text-align:center;">"Terwujudnya Gugus PAUD yang unggul, berkarakter, dan berdaya saing untuk membentuk generasi emas Indonesia yang cerdas, kreatif, dan berakhlak mulia"</p><p style="text-align:center;"><strong>Inti Visi:</strong> Anak PAUD menjadi generasi emas yang pintar dan berkarakter Pancasila.</p></div><div class="grid-visi"><div class="visi-item"><i class="fas fa-briefcase"></i> <strong>Profesionalitas Kerja</strong><br>Membangun tata kelola organisasi dan pendidik yang kompeten serta taat asas.</div><div class="visi-item"><i class="fas fa-lightbulb"></i> <strong>Pusat Inovasi</strong><br>Menjadi penggerak metode pembelajaran yang kreatif, adaptif, dan menyenangkan bagi anak.</div><div class="visi-item"><i class="fas fa-globe"></i> <strong>Keunggulan Berbudaya</strong><br>Membentuk karakter pendidik yang cerdas, mandiri, dan berakhlak mulia.</div><div class="visi-item"><i class="fas fa-star"></i> <strong>Layanan Berkualitas</strong><br>Menjamin standar mutu stimulasi perkembangan anak di semua lembaga anggota.</div></div>`,
    
    misi: `<div class="grid-misi"><div class="misi-item"><i class="fas fa-chalkboard-user"></i> <strong>Pengembangan Kompetensi Pendidik</strong><br>Meningkatkan profesionalisme, kreativitas, dan kemampuan manajerial guru serta tenaga kependidikan melalui wadah seperti Kelompok Kerja Guru (KKG) dan Gugus PAUD.</div><div class="misi-item"><i class="fas fa-book-open"></i> <strong>Peningkatan Kualitas Pembelajaran</strong><br>Memfasilitasi pengembangan dan penerapan kurikulum, metode pembelajaran, dan alat penilaian yang inovatif serta sesuai dengan tumbuh kembang anak.</div><div class="misi-item"><i class="fas fa-building"></i> <strong>Pengelolaan Kelembagaan</strong><br>Mengoordinasikan pengelolaan lembaga PAUD (TK, KB, TPA, SPS) agar lebih tertib administrasi, akuntabel, dan berstandar nasional.</div><div class="misi-item"><i class="fas fa-handshake"></i> <strong>Kemitraan dan Komunikasi</strong><br>Membangun komunikasi yang efektif dan kolaborasi antara sekolah, orang tua murid, masyarakat, dan pemerintah setempat.</div><div class="misi-item"><i class="fas fa-heart"></i> <strong>Pembentukan Karakter Anak</strong><br>Menyelenggarakan program yang berorientasi pada pembentukan karakter anak sejak dini, termasuk penanaman budi pekerti yang berbudaya lokal.</div></div><br><div style="background: #EFE2CC; border-radius: 20px; padding: 20px; margin-top: 20px;"><i class="fas fa-tasks"></i> <strong>Capaian Misi Gugus PAUD:</strong><ul style="margin-top: 12px; list-style-type: none;"><li>✓ Meningkatkan mutu pembelajaran PAUD melalui pelatihan guru, KKG Gugus, berbagi media pembelajaran kreatif.</li><li>✓ Mengembangkan karakter anak sesuai nilai Pancasila: menanamkan nilai kejujuran, disiplin, gotong royong, toleransi sejak dini.</li><li>✓ Meningkatkan kerja sama antar lembaga PAUD: membuat lomba bersama, parenting bareng, penilaian bersama supaya adil.</li><li>✓ Meningkatkan peran serta orang tua dan masyarakat: edukasi pola asuh, melibatkan komite/orang tua di program sekolah.</li><li>✓ Mewujudkan PAUD Holistik-Integratif: tidak cuma belajar, tetapi juga memperhatikan gizi, kesehatan, pengasuhan, dan perlindungan anak di lingkungan sekolah.</li></ul></div>`,
    
    galleries: {
        "Kegiatan Belajar": [],
        "Ekstrakurikuler": [],
        "Acara Penting": [],
        "Prestasi": [],
        "Lainnya": []
    },
    lastUpdated: new Date().toISOString()
};

let selectedGallery = "Kegiatan Belajar";
let isAdmin = false;

// ============================================
// LOAD & SAVE DATA (LOCAL STORAGE)
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
            console.error('Error loading data:', e);
        }
    }
    
    // Pastikan semua kategori galeri ada
    const defaultGalleries = ["Kegiatan Belajar", "Ekstrakurikuler", "Acara Penting", "Prestasi", "Lainnya"];
    defaultGalleries.forEach(gallery => {
        if (!komunitasData.galleries[gallery]) {
            komunitasData.galleries[gallery] = [];
        }
    });
    
    renderAll();
}

function saveData() {
    localStorage.setItem('komunitasPAUD', JSON.stringify(komunitasData));
    console.log("Data tersimpan ke LocalStorage");
}

// ============================================
// LOGIN ADMIN
// ============================================
function showLoginModal() {
    const oldModal = document.getElementById('adminLoginModal');
    if (oldModal) oldModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'adminLoginModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 20000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 20px; width: 350px; max-width: 90%; position:relative;">
            <button id="closeLoginXBtn" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:20px; cursor:pointer;">&times;</button>
            <h2 style="text-align:center; color:#4A3520; margin-bottom:20px;">
                <i class="fas fa-user-shield"></i> Login Admin
            </h2>
            <div style="margin-bottom: 15px;">
                <label style="display:block; margin-bottom:5px; color:#4A3520;">Username</label>
                <input type="text" id="loginUsername" placeholder="Username" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display:block; margin-bottom:5px; color:#4A3520;">Password</label>
                <input type="password" id="loginPassword" placeholder="Password" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
            </div>
            <button id="loginBtn" style="width:100%; padding:12px; background:#B47C42; color:white; border:none; border-radius:10px; cursor:pointer; font-weight:bold;">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
            <button id="closeLoginBtn" style="width:100%; margin-top:10px; padding:10px; background:#ccc; color:#333; border:none; border-radius:10px; cursor:pointer;">
                Batal
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.getElementById('closeLoginBtn');
    const closeXBtn = document.getElementById('closeLoginXBtn');
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    
    loginBtn.onclick = () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            isAdmin = true;
            sessionStorage.setItem('adminLoggedIn', 'true');
            modal.remove();
            showAdminUI(true);
            renderAll();
            showNotification('Login berhasil! Selamat datang Admin.', 'success');
        } else {
            showNotification('Username atau password salah!', 'error');
            usernameInput.value = '';
            passwordInput.value = '';
            usernameInput.focus();
        }
    };
    
    const closeModal = () => modal.remove();
    closeBtn.onclick = closeModal;
    closeXBtn.onclick = closeModal;
    
    passwordInput.onkeypress = (e) => { if (e.key === 'Enter') loginBtn.click(); };
    usernameInput.onkeypress = (e) => { if (e.key === 'Enter') passwordInput.focus(); };
    
    usernameInput.focus();
}

function logoutAdmin() {
    if (confirm('Yakin ingin logout dari mode admin?')) {
        sessionStorage.removeItem('adminLoggedIn');
        isAdmin = false;
        showAdminUI(false);
        renderAll();
        showNotification('Anda telah logout dari mode admin.', 'info');
    }
}

function checkAdminStatus() {
    const savedAdmin = sessionStorage.getItem('adminLoggedIn');
    
    if (savedAdmin === 'true') {
        isAdmin = true;
        showAdminUI(true);
        showNotification('Mode Admin Aktif!', 'success');
    } else {
        isAdmin = false;
        showAdminUI(false);
    }
}

function showAdminUI(isAdminMode) {
    const adminToggle = document.getElementById('adminToggleBtn');
    const adminPanel = document.getElementById('adminPanel');
    
    if (adminToggle) {
        adminToggle.style.display = 'flex';
        if (isAdminMode) {
            adminToggle.classList.add('admin-active');
        } else {
            adminToggle.classList.remove('admin-active');
        }
    }
    
    if (adminPanel && !isAdminMode) {
        adminPanel.classList.remove('open');
    }
    
    updateAdminIndicator(isAdminMode);
    renderGalleryManager();
}

function updateAdminIndicator(isAdminMode) {
    let indicator = document.getElementById('adminIndicator');
    if (!indicator) return;
    
    if (isAdminMode) {
        indicator.className = 'admin-indicator admin-mode';
        indicator.innerHTML = '<i class="fas fa-user-shield"></i> Mode Admin <i class="fas fa-chevron-right"></i>';
    } else {
        indicator.className = 'admin-indicator user-mode';
        indicator.innerHTML = '<i class="fas fa-user"></i> Mode User <i class="fas fa-chevron-right"></i>';
    }
    
    indicator.onclick = () => {
        if (isAdminMode) {
            logoutAdmin();
        } else {
            showLoginModal();
        }
    };
}

// ============================================
// KOMPRESI GAMBAR
// ============================================
function compressImage(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            let width = img.width;
            let height = img.height;
            
            if (width > MAX_IMAGE_WIDTH) {
                height = (height * MAX_IMAGE_WIDTH) / width;
                width = MAX_IMAGE_WIDTH;
            }
            
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
            callback(compressedDataUrl);
        };
    };
}

// ============================================
// UPLOAD FUNCTIONS
// ============================================
async function uploadDokumentasi(files) {
    if (!isAdmin) {
        showNotification('Login sebagai admin untuk upload foto!', 'warning');
        return;
    }
    
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
        
        if (file.size > 10 * 1024 * 1024) {
            showNotification(`File ${file.name} terlalu besar! Maksimal 10MB.`, 'error');
            processed++;
            checkComplete(processed, total, successCount);
            continue;
        }
        
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
            renderGallery();
            renderGalleryManager();
            
            checkComplete(processed, total, successCount);
        });
    }
}

function checkComplete(processed, total, successCount) {
    if (processed === total && successCount > 0) {
        showNotification(`${successCount} foto berhasil ditambahkan!`, 'success');
        const docUpload = document.getElementById('docUpload');
        if (docUpload) docUpload.value = '';
    }
}

function uploadCoverPhoto(file) {
    if (!isAdmin) {
        showNotification('Login sebagai admin untuk mengganti cover!', 'warning');
        return;
    }
    
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
    
    compressImage(file, function(compressedUrl) {
        komunitasData.coverPhoto = compressedUrl;
        saveData();
        renderCoverPhoto();
        showNotification('Foto cover berhasil diupdate!', 'success');
        const coverUpload = document.getElementById('coverUpload');
        if (coverUpload) coverUpload.value = '';
    });
}

function deleteCoverPhoto() {
    if (!isAdmin) {
        showNotification('Login sebagai admin untuk menghapus cover!', 'warning');
        return;
    }
    
    if (confirm('Hapus foto cover? Foto akan kembali ke default.')) {
        komunitasData.coverPhoto = "https://placehold.co/600x300/FCE9C4/B47C42?text=Ilustrasi+PAUD+Mentawai";
        saveData();
        renderCoverPhoto();
        showNotification('Foto cover berhasil dihapus!', 'success');
    }
}

function clearAllPhotos() {
    if (!isAdmin) {
        showNotification('Login sebagai admin untuk menghapus semua foto!', 'warning');
        return;
    }
    
    if (confirm('⚠️ HAPUS SEMUA FOTO? Tindakan ini tidak bisa dibatalkan!')) {
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
// RENDER FUNCTIONS
// ============================================
function renderGallery() {
    let container = document.getElementById('galleryContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Selector Galeri
    const selectorDiv = document.createElement('div');
    selectorDiv.className = 'gallery-selector';
    
    const galleryNames = Object.keys(komunitasData.galleries);
    
    galleryNames.forEach(name => {
        const btn = document.createElement('button');
        const fotoCount = komunitasData.galleries[name].length;
        btn.textContent = `${name} (${fotoCount})`;
        if (selectedGallery === name) btn.classList.add('active');
        btn.onclick = () => {
            selectedGallery = name;
            renderGallery();
            if (isAdmin) renderGalleryManager();
        };
        selectorDiv.appendChild(btn);
    });
    
    container.appendChild(selectorDiv);
    
    // Grid Foto
    const galleryGrid = document.createElement('div');
    galleryGrid.className = 'gallery-grid';
    
    const currentPhotos = komunitasData.galleries[selectedGallery] || [];
    
    if (currentPhotos.length === 0) {
        galleryGrid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:60px; background:#F9F5EE; border-radius:20px;">
                <i class="fas fa-images" style="font-size:48px; color:#B47C42; margin-bottom:15px; display:block;"></i>
                <h3>Belum ada foto di "${selectedGallery}"</h3>
                <p>${isAdmin ? 'Silakan upload foto melalui panel admin' : 'Belum ada dokumentasi untuk kategori ini'}</p>
            </div>
        `;
    } else {
        currentPhotos.forEach((foto) => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.onclick = () => openLightbox(foto.url);
            card.innerHTML = `
                <img src="${foto.url}" alt="${foto.caption}">
                <div class="caption">
                    <i class="fas fa-camera"></i> ${escapeHtml(foto.caption)}
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }
    
    container.appendChild(galleryGrid);
}

function renderGalleryManager() {
    const manager = document.getElementById('galleryManager');
    if (!manager) return;
    
    if (!isAdmin) {
        manager.innerHTML = `
            <div style="padding:30px; text-align:center; background:#F9F5EE; border-radius:20px;">
                <i class="fas fa-lock" style="font-size:48px; color:#999; margin-bottom:15px; display:block;"></i>
                <h3 style="color:#999;">Mode User</h3>
                <p>Anda hanya bisa melihat dokumentasi.</p>
                <p>Login sebagai admin untuk mengelola foto.</p>
                <button onclick="showLoginModal()" style="margin-top:15px; padding:10px 24px; background:#B47C42; color:white; border:none; border-radius:30px; cursor:pointer;">
                    <i class="fas fa-user-shield"></i> Login Admin
                </button>
            </div>
        `;
        return;
    }
    
    manager.innerHTML = '';
    
    // Selector galeri untuk admin
    const adminSelector = document.createElement('div');
    adminSelector.style.cssText = `display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap;`;
    
    const galleryNames = Object.keys(komunitasData.galleries);
    
    galleryNames.forEach(name => {
        const btn = document.createElement('button');
        btn.textContent = `${name} (${komunitasData.galleries[name].length})`;
        btn.style.cssText = `padding:6px 18px; border:none; border-radius:30px; cursor:pointer; font-weight:bold; background:${selectedGallery === name ? '#B47C42' : 'white'}; color:${selectedGallery === name ? 'white' : '#4A3520'};`;
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
    clearAllBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Hapus Semua Foto';
    clearAllBtn.style.cssText = `background:#e74c3c; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer; margin-bottom:20px; width:100%; font-weight:bold;`;
    clearAllBtn.onclick = clearAllPhotos;
    manager.appendChild(clearAllBtn);
    
    // Info upload
    const uploadInfo = document.createElement('div');
    uploadInfo.style.cssText = `background:#E8F5E9; padding:12px; border-radius:12px; margin-bottom:20px; text-align:center; font-size:14px;`;
    uploadInfo.innerHTML = `<i class="fas fa-cloud-upload-alt"></i> <strong>Upload ke: ${selectedGallery}</strong><br><small>Foto akan dikompres otomatis (max 800px)</small>`;
    manager.appendChild(uploadInfo);
    
    const currentPhotos = komunitasData.galleries[selectedGallery] || [];
    
    if (currentPhotos.length === 0) {
        manager.innerHTML += `<p style="text-align:center; padding:30px; color:#999;">Belum ada foto di galeri "${selectedGallery}"</p>`;
        return;
    }
    
    currentPhotos.forEach((foto) => {
        const item = document.createElement('div');
        item.className = 'gallery-manager-item';
        item.innerHTML = `
            <img src="${foto.url}" style="width:60px; height:60px; object-fit:cover; border-radius:10px;">
            <input type="text" class="caption-input" data-id="${foto.id}" data-gallery="${selectedGallery}" value="${escapeHtml(foto.caption)}" style="flex:2; padding:8px; border-radius:8px; border:1px solid #ddd; font-size:12px;">
            <button class="delete-photo-btn" data-id="${foto.id}" data-gallery="${selectedGallery}"><i class="fas fa-trash"></i> Hapus</button>
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
            
            if (confirm(`Hapus foto ini?`)) {
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
    if (ta && isAdmin) {
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
    
    if (isAdmin) {
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
}

function renderAll() {
    renderCoverPhoto();
    renderDeskripsi();
    renderVisiMisi();
    renderGallery();
    renderGalleryManager();
}

// ============================================
// EDIT FUNCTIONS (ADMIN ONLY)
// ============================================
function saveDeskripsi() {
    if (!isAdmin) {
        showNotification('Login sebagai admin untuk mengedit deskripsi!', 'warning');
        return;
    }
    
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
    if (!isAdmin) {
        showNotification('Login sebagai admin untuk mengedit visi & misi!', 'warning');
        return;
    }
    
    const visiText = document.getElementById('visiText').value;
    const misiText = document.getElementById('misiText').value;
    
    if (!visiText.trim()) {
        showNotification('Visi tidak boleh kosong!', 'error');
        return;
    }
    
    komunitasData.visi = `<div style="background: #F7EAD6; border-radius: 30px; padding: 20px; margin-bottom: 20px;"><p style="font-size:1.2rem; font-weight:600; text-align:center;"><i class="fas fa-quote-left"></i> Visi Utama Gugus PAUD</p><p style="font-style:italic; text-align:center;">"${escapeHtml(visiText)}"</p><p style="text-align:center;"><strong>Inti Visi:</strong> Anak PAUD menjadi generasi emas yang pintar dan berkarakter Pancasila.</p></div><div class="grid-visi"><div class="visi-item"><i class="fas fa-briefcase"></i> <strong>Profesionalitas Kerja</strong><br>Membangun tata kelola organisasi dan pendidik yang kompeten serta taat asas.</div><div class="visi-item"><i class="fas fa-lightbulb"></i> <strong>Pusat Inovasi</strong><br>Menjadi penggerak metode pembelajaran yang kreatif, adaptif, dan menyenangkan bagi anak.</div><div class="visi-item"><i class="fas fa-globe"></i> <strong>Keunggulan Berbudaya</strong><br>Membentuk karakter pendidik yang cerdas, mandiri, dan berakhlak mulia.</div><div class="visi-item"><i class="fas fa-star"></i> <strong>Layanan Berkualitas</strong><br>Menjamin standar mutu stimulasi perkembangan anak di semua lembaga anggota.</div></div>`;
    
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
        misiHtml += '</div><br><div style="background: #EFE2CC; border-radius: 20px; padding: 20px; margin-top: 20px;"><i class="fas fa-tasks"></i> <strong>Capaian Misi Gugus PAUD:</strong><ul style="margin-top: 12px; list-style-type: none;"><li>✓ Meningkatkan mutu pembelajaran PAUD melalui pelatihan guru, KKG Gugus, berbagi media pembelajaran kreatif.</li><li>✓ Mengembangkan karakter anak sesuai nilai Pancasila: menanamkan nilai kejujuran, disiplin, gotong royong, toleransi sejak dini.</li><li>✓ Meningkatkan kerja sama antar lembaga PAUD: membuat lomba bersama, parenting bareng, penilaian bersama supaya adil.</li><li>✓ Meningkatkan peran serta orang tua dan masyarakat: edukasi pola asuh, melibatkan komite/orang tua di program sekolah.</li><li>✓ Mewujudkan PAUD Holistik-Integratif: tidak cuma belajar, tetapi juga memperhatikan gizi, kesehatan, pengasuhan, dan perlindungan anak di lingkungan sekolah.</li></ul></div>';
        komunitasData.misi = misiHtml;
    }
    
    saveData();
    renderVisiMisi();
    showNotification('Visi & Misi berhasil disimpan!', 'success');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
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
    if (type === 'warning') bgColor = '#f39c12';
    
    notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        z-index: 2000;
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
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
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
    checkAdminStatus();
    loadData();
    
    // Navigasi
    const navBtns = document.querySelectorAll('.nav-btn');
    for (let btn of navBtns) {
        btn.onclick = () => showPage(btn.getAttribute('data-page'));
    }
    
    const toDesk = document.getElementById('toDeskBtn');
    if (toDesk) toDesk.onclick = () => showPage('deskripsi');
    
    const toGal = document.getElementById('toGalBtn');
    if (toGal) toGal.onclick = () => showPage('dokumentasi');
    
    // Admin Panel Toggle
    const adminToggle = document.getElementById('adminToggleBtn');
    const adminPanel = document.getElementById('adminPanel');
    const closeAdminBtn = document.getElementById('closeAdminBtn');
    
    if (adminToggle) {
        adminToggle.onclick = () => {
            if (!isAdmin) {
                showLoginModal();
            } else {
                adminPanel.classList.toggle('open');
            }
        };
    }
    
    if (closeAdminBtn) {
        closeAdminBtn.onclick = () => adminPanel.classList.remove('open');
    }
    
    // Tutup panel jika klik di luar
    document.addEventListener('click', function(event) {
        if (adminPanel && adminPanel.classList.contains('open')) {
            if (!adminPanel.contains(event.target) && !adminToggle.contains(event.target)) {
                adminPanel.classList.remove('open');
            }
        }
    });
    
    // Admin Tabs
    const tabs = document.querySelectorAll('.admin-tab');
    for (let tab of tabs) {
        tab.onclick = function() {
            for (let t of tabs) t.classList.remove('active');
            this.classList.add('active');
            const contents = document.querySelectorAll('.admin-tab-content');
            for (let c of contents) c.classList.remove('active');
            const target = document.getElementById(`tab-${this.getAttribute('data-tab')}`);
            if (target) target.classList.add('active');
            if (this.getAttribute('data-tab') === 'dokumentasi') renderGalleryManager();
        };
    }
    
    // Cover buttons
    const saveCover = document.getElementById('saveCoverBtn');
    if (saveCover) {
        saveCover.onclick = () => {
            const file = document.getElementById('coverUpload')?.files[0];
            file ? uploadCoverPhoto(file) : showNotification('Pilih file foto dulu!', 'error');
        };
    }
    
    const deleteCover = document.getElementById('deleteCoverBtn');
    if (deleteCover) deleteCover.onclick = deleteCoverPhoto;
    
    // Dokumentasi upload
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
    
    // Lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.onclick = closeLightbox;
    
    document.onkeydown = (e) => { if (e.key === 'Escape') closeLightbox(); };
    
    window.onscroll = () => {
        const nav = document.querySelector('nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    
    addDecorations();
    
    console.log(`✅ Website siap! Mode: ${isAdmin ? 'ADMIN' : 'USER'}`);
    console.log(`Data tersimpan di LocalStorage`);
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

// Export fungsi untuk global
window.showLoginModal = showLoginModal;