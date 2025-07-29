document.addEventListener("DOMContentLoaded", function () {
  // 1. Inisialisasi peta
  var map = L.map('map-garum').setView([-8.08234, 112.21642], 15);

  // 2. Basemap modern
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap & CartoDB'
  }).addTo(map);

  // 3. Definisikan icon marker warna per kategori
  const iconBlue = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', // kantor
    shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41],
    popupAnchor: [1, -34], shadowSize: [41, 41]
  });
  const iconOrange = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png', // umkm
    shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41],
    popupAnchor: [1, -34], shadowSize: [41, 41]
  });
  const iconYellow = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png', // pendidikan
    shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41],
    popupAnchor: [1, -34], shadowSize: [41, 41]
  });
  const iconGreen = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', // faskum
    shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41],
    popupAnchor: [1, -34], shadowSize: [41, 41]
  });
  const iconRed = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // kesehatan
    shadowUrl: 'https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41],
    popupAnchor: [1, -34], shadowSize: [41, 41]
  });

  // 4. Map kategori ke icon
  const iconKategori = {
    kantor: iconBlue,
    umkm: iconOrange,
    pendidikan: iconYellow,
    faskum: iconGreen,
    kesehatan: iconRed
  };

  // 5. Siapkan LayerGroup untuk setiap kategori
  const kategoriLayer = {
    kantor: L.layerGroup(),
    umkm: L.layerGroup(),
    pendidikan: L.layerGroup(),
    faskum: L.layerGroup(),
    kesehatan: L.layerGroup()
  };

  // 6. Data marker sebagai array of object dengan gambar dan link gmaps
  const lokasiTempat = [
    {
      nama: "Kantor Kelurahan Garum",
      kategori: "kantor",
      latlng: [-8.08234, 112.21642],
      gambar: "20240715_104844 2 1.webp",
      link: "https://maps.app.goo.gl/b13UQ8RYaWdEAZMJ6",
      deskripsi: "Garum, Kab. Blitar"
    },
    {
      nama: "KPU Kabupaten Blitar",
      kategori: "kantor",
      latlng: [-8.072539031702696, 112.22276516567668],
      gambar: "kpu-garum.jpg",
      link: "https://maps.app.goo.gl/mT9gdUouTQ5QjBkY9",
      deskripsi: "Kantor Pemerintahan"
    },
    {
      nama: "Tahu Bulat & Sotong Gemilang Group",
      kategori: "umkm",
      latlng: [-8.079154969082998, 112.2181937651181],
      gambar: "tahu-bulat (1).jpeg",
      link: "https://maps.app.goo.gl/Ae5FX2rHFGG4wcJq9",
      deskripsi: "UMKM Makanan - Garum"
    },
    {
      nama: "Ayam Geprek Munthu",
      kategori: "umkm",
      latlng: [-8.074322499766751, 112.22205292659521],
      gambar: "munthu-1.jpg",
      link: "https://maps.app.goo.gl/cJkY63oh6BrgrE3c7",
      deskripsi: "Warung Makan Ayam Geprek dan Minuman"
    },
    {
      nama: "Warung Wader",
      kategori: "umkm",
      latlng: [-8.086293854874288, 112.21542250591637],
      gambar: "wader-1.jpg",
      link: "https://maps.app.goo.gl/59LPrKf32FLGmmiz9",
      deskripsi: "Warung Makan Wader"
    },
    {
      nama: "SDN Garum 1",
      kategori: "pendidikan",
      latlng: [-8.072616654147819, 112.22362112605926],
      gambar: "sd1.jpg",
      link: "https://maps.app.goo.gl/mh74wJT6aD1dhRKu9",
      deskripsi: "Sekolah Dasar"
    },
    {
      nama: "SDN Garum 3",
      kategori: "pendidikan",
      latlng: [-8.085240780389205, 112.21403084404552],
      gambar: "sd3.jpg", // pppp
      link: "https://maps.app.goo.gl/ViL8biUSAVvGP7NS9",
      deskripsi: "Sekolah Dasar"
    },
    {
      nama: "Seminari Menengah St. Vincentius a Paulo Keuskupan Surabaya",
      kategori: "pendidikan",
      latlng: [-8.07324612649719, 112.22657948593071],
      gambar: "seminari.jpg",
      link: "https://maps.app.goo.gl/xZWNrrzQfvw5UZEE9",
      deskripsi: "Pendidikan Agama Katolik"
    },
    {
      nama: "Pelatihan Bahasa Jepang Berdikari",
      kategori: "pendidikan",
      latlng: [-8.07597568069372, 112.22348682542798],
      gambar: "lpk.jpg",
      link: "https://maps.app.goo.gl/UKidHZkhjPxoXcdG6",
      deskripsi: "Lembaga Kursus"
    },
    {
      nama: "Lapangan Garum",
      kategori: "faskum",
      latlng: [-8.07955660558394, 112.22026904335047],
      gambar: "lapangan.jpg",
      link: "https://maps.app.goo.gl/Yi7Xg3zfJxyzpy1e7",
      deskripsi: "Fasilitas Umum Garum"
    },
    {
      nama: "Phawoun Cell",
      kategori: "umkm",
      latlng: [-8.077033633484147, 112.21872934086672],
      gambar: "phawoun-1.jpg",
      link: "https://maps.app.goo.gl/cBHg5oKwPQ8H6yM8A",
      deskripsi: "Toko Service Handphone dan laptop"
    },
    {
      nama: "drg. Yosua Nugroho",
      kategori: "kesehatan",
      latlng: [-8.073102492192245, 112.22066827408398],
      gambar: "drg.jpg",
      link: "https://maps.app.goo.gl/ZWGYGNErjQDdpSZB6",
      deskripsi: "Praktek Dokter Gigi"
    },
    {
      nama: "Rujak Bu Wiwik",
      kategori: "umkm",
      latlng: [-8.077416039933778, 112.21830018743285],
      gambar: "rujak.jpg",
      link: "https://maps.app.goo.gl/A7uTT8sL5mAXkF5P9",
      deskripsi: "Warung Rujak dan Tahu Telur"
    },
  ];

  // 7. Tambahkan semua marker ke LayerGroup sesuai kategori & icon
  lokasiTempat.forEach((tempat) => {
    const icon = iconKategori[tempat.kategori] || iconBlue; // fallback biru
    // HTML popup: gambar, nama (link), deskripsi
    const popupContent = `
      <div style="text-align:center;min-width:170px;max-width:200px">
        <img src="assets/images/${tempat.gambar}" alt="${tempat.nama}" style="width:88px;height:65px;object-fit:cover;border-radius:8px;margin-bottom:7px;box-shadow:0 2px 8px rgba(34,139,230,0.13)">
        <div style="margin:0.3em 0 0.1em 0;">
          <a href="${tempat.link}" target="_blank" style="color:#088395;font-weight:600;text-decoration:none;font-size:1.03rem">
            ${tempat.nama}
          </a>
        </div>
        <div style="color:#0c4a6e;font-size:0.96rem;">
          ${tempat.deskripsi || ""}
        </div>
      </div>
    `;
    const marker = L.marker(tempat.latlng, {icon: icon}).bindPopup(popupContent);
    if (kategoriLayer[tempat.kategori]) {
      kategoriLayer[tempat.kategori].addLayer(marker);
    }
  });

  // 8. Tambahkan LayerGroup ke map (default semua tampil)
  Object.values(kategoriLayer).forEach(layer => layer.addTo(map));

  // 9. FILTER show/hide marker per kategori (checkbox)
  document.querySelectorAll('#map-legend input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', function() {
      const kategori = this.dataset.kategori;
      if(this.checked) {
        kategoriLayer[kategori].addTo(map);
      } else {
        kategoriLayer[kategori].remove();
      }
    });
  });

  // 10. FITUR Temukan Lokasi Saya
  const lokasiBtn = document.getElementById('lokasi-saya-btn');
  if (lokasiBtn) {
    lokasiBtn.onclick = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(pos) {
            const userLatLng = [pos.coords.latitude, pos.coords.longitude];
            const userMarker = L.marker(userLatLng, {
              icon: L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32]
              })
            }).addTo(map)
            .bindPopup('Anda di sini!').openPopup();
            map.setView(userLatLng, 17);
          },
          function() { alert('Gagal menemukan lokasi. Aktifkan GPS!'); }
        );
      } else {
        alert('Browser tidak mendukung geolokasi!');
      }
    };
  }
});
