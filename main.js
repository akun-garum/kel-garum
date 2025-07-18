function showImage(src, alt){
    $("#imgPopUp").show();
    $("#srcImgPopUp").attr('src', src);
    $("#captionImgPopUp").html(alt);
}

function closeImage() {
    $("#imgPopUp").hide();
}

// Fungsi untuk memuat navbar dari file terpisah
document.addEventListener('DOMContentLoaded', function() {
    fetch('/navbar.html') // Sesuaikan path jika navbar.html berada di folder lain
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById('navbar-placeholder');
            if (navbarContainer) {
                navbarContainer.innerHTML = data;

                // Setelah navbar dimuat, atur kelas 'active' berdasarkan halaman saat ini
                const currentPath = window.location.pathname;
                const navLinks = navbarContainer.querySelectorAll('.nav-link, .dropdown-item');
                navLinks.forEach(link => {
                    // Cek jika href link cocok dengan bagian akhir dari currentPath
                    // atau jika itu adalah index.html dan path-nya adalah root
                    if (link.href && (currentPath.endsWith(link.getAttribute('href')) || 
                                     (link.getAttribute('href') === 'index.html' && (currentPath === '/' || currentPath.endsWith('/index.html'))))) {
                        link.classList.add('active');
                        // Untuk dropdown, tambahkan 'active' ke toggle-nya juga
                        if (link.classList.contains('dropdown-item')) {
                            let parentDropdownToggle = link.closest('.dropdown-menu').previousElementSibling;
                            if (parentDropdownToggle && parentDropdownToggle.classList.contains('dropdown-toggle')) {
                                parentDropdownToggle.classList.add('active');
                            }
                        }
                    } else {
                        link.classList.remove('active'); // Pastikan menghapus jika tidak aktif
                    }
                });

                 // Inisialisasi kembali dropdown Bootstrap setelah navbar dimuat
                $('.dropdown-toggle').dropdown();
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
});


// Variabel dan Fungsi untuk Fitur Aksesibilitas (FAB)
let fabMenuOpen = false;
let currentFontSize = 16;
let currentLetterSpacing = 0;
let isInverted = false;
let isGrayscale = false;
let isUnderlined = false;
let isBigCursor = false;
let isReadingGuide = false;

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

function changeFontSize(action) {
    const body = document.body;
    
    if (action === 'increase' && currentFontSize < 24) {
        currentFontSize += 2;
    } else if (action === 'decrease' && currentFontSize > 12) {
        currentFontSize -= 2;
    }
    
    body.style.fontSize = currentFontSize + 'px';
    updateButtonState();
}

function changeLetterSpacing(action) {
    const body = document.body;
    
    if (action === 'increase' && currentLetterSpacing < 5) {
        currentLetterSpacing += 0.5;
    } else if (action === 'decrease' && currentLetterSpacing > -1) {
        currentLetterSpacing -= 0.5;
    }
    
    body.style.letterSpacing = currentLetterSpacing + 'px';
    updateButtonState();
}

function toggleInvertColors() {
    const body = document.body;
    const btn = document.getElementById('invertBtn');
    const fabContainer = document.querySelector('.fab-container');
    
    isInverted = !isInverted;
    
    if (isInverted) {
        body.classList.add('invert-colors');
        btn.classList.add('active');
        if (isGrayscale) {
            toggleGrayscale();
        }
    } else {
        body.classList.remove('invert-colors');
        btn.classList.remove('active');
    }
    
    // Debugging: Log posisi FAB
    console.log('FAB Position:', fabContainer.getBoundingClientRect());
}

function toggleGrayscale() {
    const body = document.body;
    const btn = document.getElementById('grayscaleBtn');
    const fabContainer = document.querySelector('.fab-container');
    
    isGrayscale = !isGrayscale;
    
    if (isGrayscale) {
        body.classList.add('grayscale');
        btn.classList.add('active');
        if (isInverted) {
            toggleInvertColors();
        }
    } else {
        body.classList.remove('grayscale');
        btn.classList.remove('active');
    }
    
    // Debugging: Log posisi FAB
    console.log('FAB Position:', fabContainer.getBoundingClientRect());
}

function toggleUnderlineText() {
    const body = document.body;
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

function toggleBigCursor() {
    const body = document.body;
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
    // guide.style.width = window.innerWidth + 'px'; // Lebar selalu 100%
    guide.style.top = e.clientY + 'px';
    // Latar belakang gradien tidak perlu diubah-ubah di sini jika width tetap 100%
    // guide.style.background = `linear-gradient(90deg, #3498db ${scrollPercent}%, #2ecc71 100%)`; // Hapus jika tidak diperlukan
}

function updateButtonState() {
    // Visual feedback untuk perubahan yang sudah dilakukan
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

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    const fabContainer = document.querySelector('.fab-container');
    
    // Pastikan menu terbuka dan klik bukan di dalam kontainer FAB
    if (fabMenuOpen && fabContainer && !fabContainer.contains(e.target)) {
        toggleFabMenu();
    }
});

// Keyboard navigation
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

// Load FAB HTML (Tambahkan ini di dalam DOMContentLoaded event listener)
document.addEventListener('DOMContentLoaded', function() {
    fetch('/fab_accessibility.html')
    .then(response => response.text())
    .then(data => {
        const fabPlaceholder = document.getElementById('fab-placeholder');
        if (fabPlaceholder) {
            fabPlaceholder.innerHTML = data;
            const fabContainer = document.querySelector('.fab-container');
            if (fabContainer) {
                // Pastikan FAB langsung di bawah body
                if (fabContainer.parentElement !== document.body) {
                    document.body.appendChild(fabContainer);
                }
            }
            const readingGuideHtml = '<div class="reading-guide" id="readingGuide"></div>';
            document.body.insertAdjacentHTML('afterbegin', readingGuideHtml);
        }
    })
    .catch(error => console.error('Error loading FAB:', error));
});


// Fungsi showImage dan closeImage yang sudah ada
function showImage(src, alt){
    $("#imgPopUp").show();
    $("#srcImgPopUp").attr('src', src);
    $("#captionImgPopUp").html(alt);
}

function closeImage() {
    $("#imgPopUp").hide();
}

// Fungsi redirectTo yang sudah ada (jika belum ada di main.js, pindahkan dari inline script)
function redirectTo(url) {
  window.location.href = url;
}