// Fungsi untuk menampilkan gambar pop-up
function showImage(src, alt) {
    $("#imgPopUp").show();
    $("#srcImgPopUp").attr('src', src);
    $("#captionImgPopUp").html(alt);
}

// Fungsi untuk menutup gambar pop-up
function closeImage() {
    $("#imgPopUp").hide();
}

// Fungsi untuk mengarahkan ke URL lain
function redirectTo(url) {
    window.location.href = url;
}

// Variabel dan Fungsi untuk Fitur Aksesibilitas (FAB)
let fabMenuOpen = false;
let currentFontSize = 16; // Ukuran font dasar
let currentLetterSpacing = 0; // Jarak antar huruf dasar
let isInverted = false;
let isGrayscale = false;
let isUnderlined = false;
let isBigCursor = false;
let isReadingGuide = false;

// Fungsi untuk membuka/menutup menu FAB
function toggleFabMenu() {
    const fabMenu = document.getElementById('fabMenu');
    const fabMain = document.getElementById('fabMain');

    fabMenuOpen = !fabMenuOpen;

    if (fabMenuOpen) {
        fabMenu.classList.add('active');
        fabMain.classList.add('active');
    } else {
        fabMenu.classList.remove('active');
        fabMain.classList.remove('active');
    }
}

// Fungsi untuk mengubah ukuran font
function changeFontSize(action) {
    const mainContent = document.getElementById('main-content-wrapper'); // Target ke main-content-wrapper
    if (!mainContent) return;

    // Ambil ukuran font saat ini dari computed style jika belum diatur melalui JS
    if (mainContent.style.fontSize === '') {
        currentFontSize = parseFloat(window.getComputedStyle(mainContent).fontSize);
    }
    
    if (action === 'increase' && currentFontSize < 24) {
        currentFontSize += 2;
    } else if (action === 'decrease' && currentFontSize > 12) {
        currentFontSize -= 2;
    }
    
    mainContent.style.fontSize = currentFontSize + 'px';
    updateButtonState();
}

// Fungsi untuk mengubah jarak antar huruf
function changeLetterSpacing(action) {
    const mainContent = document.getElementById('main-content-wrapper'); // Target ke main-content-wrapper
    if (!mainContent) return;

    if (mainContent.style.letterSpacing === '') {
        currentLetterSpacing = parseFloat(window.getComputedStyle(mainContent).letterSpacing || '0');
    }

    if (action === 'increase' && currentLetterSpacing < 5) {
        currentLetterSpacing += 0.5;
    } else if (action === 'decrease' && currentLetterSpacing > -1) {
        currentLetterSpacing -= 0.5;
    }
    
    mainContent.style.letterSpacing = currentLetterSpacing + 'px';
    updateButtonState();
}

// Fungsi untuk membalik warna
function toggleInvertColors() {
    const targetElement = document.getElementById('main-content-wrapper'); // Target ke main-content-wrapper
    const btn = document.getElementById('invertBtn');
    
    if (!targetElement) return; // Pastikan elemen ada

    isInverted = !isInverted;
    
    if (isInverted) {
        targetElement.classList.add('invert-colors');
        btn.classList.add('active');
        // Reset grayscale jika aktif
        if (isGrayscale) {
            toggleGrayscale(); // Ini akan menghapus kelas dari targetElement
        }
    } else {
        targetElement.classList.remove('invert-colors');
        btn.classList.remove('active');
    }
}

// Fungsi untuk mode abu-abu
function toggleGrayscale() {
    const targetElement = document.getElementById('main-content-wrapper'); // Target ke main-content-wrapper
    const btn = document.getElementById('grayscaleBtn');

    if (!targetElement) return; // Pastikan elemen ada
    
    isGrayscale = !isGrayscale;
    
    if (isGrayscale) {
        targetElement.classList.add('grayscale');
        btn.classList.add('active');
        // Reset invert jika aktif
        if (isInverted) {
            toggleInvertColors(); // Ini akan menghapus kelas dari targetElement
        }
    } else {
        targetElement.classList.remove('grayscale');
        btn.classList.remove('active');
    }
}

// Fungsi untuk menggarisbawahi teks
function toggleUnderlineText() {
    const body = document.body; // Tetap di body, karena underline berlaku global
    const btn = document.getElementById('underlineBtn');
    
    isUnderlined = !isUnderlined;
    
    if (isUnderlined) {
        body.classList.add('underline-text');
        btn.classList.add('active');
    } else {
        body.classList.remove('underline-text');
        btn.classList.remove('active');
    }
}

// Fungsi untuk memperbesar kursor
function toggleBigCursor() {
    const body = document.body; // Tetap di body
    const btn = document.getElementById('cursorBtn');
    
    isBigCursor = !isBigCursor;
    
    if (isBigCursor) {
        body.classList.add('big-cursor');
        btn.classList.add('active');
    } else {
        body.classList.remove('big-cursor');
        btn.classList.remove('active');
    }
}

// Fungsi untuk alat bantu baca (reading guide)
function toggleReadingGuide() {
    const guide = document.getElementById('readingGuide');
    const btn = document.getElementById('guideBtn');
    
    isReadingGuide = !isReadingGuide;
    
    if (isReadingGuide) {
        guide.classList.add('active');
        btn.classList.add('active');
        enableReadingGuide();
    } else {
        guide.classList.remove('active');
        btn.classList.remove('active');
        disableReadingGuide();
    }
}

function enableReadingGuide() {
    document.addEventListener('mousemove', updateReadingGuide);
}

function disableReadingGuide() {
    document.removeEventListener('mousemove', updateReadingGuide);
}

function updateReadingGuide(e) {
    const guide = document.getElementById('readingGuide');
    if (guide) { // Pastikan guide ada sebelum mencoba memanipulasinya
        guide.style.top = e.clientY + 'px';
    }
}

// Visual feedback untuk tombol FAB
function updateButtonState() {
    const allButtons = document.querySelectorAll('.fab-item');
    allButtons.forEach(btn => {
        if (!btn.classList.contains('active')) {
            btn.style.opacity = '0.8';
            setTimeout(() => {
                btn.style.opacity = '1';
            }, 200);
        }
    });
}

// Tutup menu FAB saat klik di luar area
document.addEventListener('click', function(e) {
    const fabContainer = document.querySelector('.fab-container');
    const fabMain = document.getElementById('fabMain'); // Ambil referensi fabMain
    
    if (fabMenuOpen && fabContainer && !fabContainer.contains(e.target) && (!fabMain || !fabMain.contains(e.target))) {
        toggleFabMenu();
    }
});

// Navigasi Keyboard
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
        switch(e.key) {
            case '+':
            case '=':
                e.preventDefault();
                changeFontSize('increase');
                break;
            case '-':
                e.preventDefault();
                changeFontSize('decrease');
                break;
            case 'i':
                e.preventDefault();
                toggleInvertColors();
                break;
            case 'g':
                e.preventDefault();
                toggleGrayscale();
                break;
        }
    }
});

// Inisialisasi DOM - Memuat Navbar dan FAB
document.addEventListener('DOMContentLoaded', function() {
    // Muat Navbar
    fetch('/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById('navbar-placeholder');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;

                // Atur kelas 'active' pada navbar
                const currentPath = window.location.pathname;
                const navLinks = navbarContainer.querySelectorAll('.nav-link, .dropdown-item');
                
                navLinks.forEach(link => {
                    // Mendapatkan href dari link, yang sekarang sudah absolut (misal: /index.html, /informasi-publik/infografis.html)
                    const linkHref = new URL(link.href).pathname; // Mengambil hanya pathname dari URL lengkap

                    // Perbandingan path:
                    if (linkHref === currentPath || (linkHref === '/index.html' && (currentPath === '/' || currentPath.endsWith('/index.html')))) {
                        link.classList.add('active');
                        if (link.classList.contains('dropdown-item')) {
                            let parentDropdownToggle = link.closest('.dropdown-menu').previousElementSibling;
                            if (parentDropdownToggle && parentDropdownToggle.classList.contains('dropdown-toggle')) {
                                parentDropdownToggle.classList.add('active');
                            }
                        }
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Inisialisasi kembali dropdown Bootstrap
                $('.dropdown-toggle').dropdown();
            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Muat FAB (Floating Action Button)
    fetch('/fab_accessibility.html')
        .then(response => response.text())
        .then(data => {
            const fabPlaceholder = document.getElementById('fab-placeholder');
            if (fabPlaceholder) {
                fabPlaceholder.innerHTML = data;
                // Reading Guide juga perlu ditempatkan langsung di body karena posisinya fixed
                const readingGuideHtml = '<div class="reading-guide" id="readingGuide"></div>';
                document.body.insertAdjacentHTML('afterbegin', readingGuideHtml);
            }
        })
        .catch(error => console.error('Error loading FAB:', error));
});