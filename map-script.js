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

  // 5. Siapkan LayerGroup untuk setiap kategori (tambah kategori jika perlu)
  const kategoriLayer = {
    kantor: L.layerGroup(),
    umkm: L.layerGroup(),
    pendidikan: L.layerGroup(),
    faskum: L.layerGroup(),
    kesehatan: L.layerGroup()
  };

  // 6. Data marker sebagai array of object
  const lokasiTempat = [
    {
      nama: "Kantor Kelurahan Garum",
      kategori: "kantor",
      latlng: [-8.08234, 112.21642],
      popup: "<b>Kantor Kelurahan Garum</b><br>Garum, Kab. Blitar"
    },
    {
      nama: "KPU Kabupaten Blitar",
      kategori: "kantor",
      latlng: [-8.072539031702696, 112.22276516567668],
      popup: "<b>KPU Kabupaten Blitar</b><br>Kantor Pemerintahan"
    },
    {
      nama: "Tahu Bulat & Sotong Gemilang Group",
      kategori: "umkm",
      latlng: [-8.079154969082998, 112.2181937651181],
      popup: "<b>Tahu Bulat & Sotong Gemilang Group</b><br>UMKM Makanan - Garum"
    },
    {
      nama: "UMKM Opak Gambir",
      kategori: "umkm",
      latlng: [-8.083778636288686, 112.21664368321554],
      popup: "<b>UMKM Opak Gambir</b><br>Oleh-oleh Khas Garum"
    },
    {
      nama: "UMKM Batik Gondo Arum",
      kategori: "umkm",
      latlng: [-8.082034, 112.217234],
      popup: "<b>UMKM Batik Gondo Arum</b><br>Batik & Eco Print"
    },
    {
      nama: "SDN Garum 1",
      kategori: "pendidikan",
      latlng: [-8.072616654147819, 112.22362112605926],
      popup: "<b>SDN Garum 1</b><br>Sekolah Dasar"
    },
    {
      nama: "SDN Garum 3",
      kategori: "pendidikan",
      latlng: [-8.085240780389205, 112.21403084404552],
      popup: "<b>SDN Garum 3</b><br>Sekolah Dasar"
    },
    {
      nama: "Seminari Menengah St. Vincentius a Paulo Keuskupan Surabaya",
      kategori: "pendidikan",
      latlng: [-8.07324612649719, 112.22657948593071],
      popup: "<b>Seminari Menengah St. Vincentius a Paulo</b><br>Pendidikan Agama Katolik"
    },
    {
      nama: "Pelatihan Bahasa Jepang Berdikari",
      kategori: "pendidikan",
      latlng: [-8.07597568069372, 112.22348682542798],
      popup: "<b>Pelatihan Bahasa Jepang Berdikari</b><br>Lembaga Kursus"
    },
    {
      nama: "Lapangan Garum",
      kategori: "faskum",
      latlng: [-8.07955660558394, 112.22026904335047],
      popup: "<b>Lapangan Garum</b><br>Fasilitas Umum Garum"
    },
    {
      nama: "Garum Farm",
      kategori: "faskum",
      latlng: [-8.088625382550122, 112.2145223850462],
      popup: "<b>Garum Farm</b><br>Pertanian & Peternakan"
    },
    {
      nama: "drg. Yosua Nugroho",
      kategori: "kesehatan",
      latlng: [-8.073102492192245, 112.22066827408398],
      popup: "<b>Klinik drg. Yosua Nugroho</b><br>Praktek Dokter Gigi"
    }
  ];

  // 7. Tambahkan semua marker ke LayerGroup sesuai kategori & icon
  lokasiTempat.forEach((tempat) => {
    const icon = iconKategori[tempat.kategori] || iconBlue; // fallback biru
    const marker = L.marker(tempat.latlng, {icon: icon}).bindPopup(tempat.popup);
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
