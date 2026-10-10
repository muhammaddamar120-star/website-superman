// =========================================
// 1. NAVBAR HAMBURGER
// =========================================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

if (hamburger && menu) {
    hamburger.addEventListener("click", function() {
        menu.classList.toggle("active");
        hamburger.classList.toggle("berubah");
    });

    const semuaLinkMenu = document.querySelectorAll(".menu a");
    semuaLinkMenu.forEach(function(link) {
        link.addEventListener("click", function() {
            menu.classList.remove("active");
            hamburger.classList.remove("berubah");
        });
    });

    window.addEventListener("resize", function() {
        if (window.innerWidth > 768) {
            menu.classList.remove("active");
            hamburger.classList.remove("berubah");
        }
    });
}

// =========================================
// 2. TAHUN OTOMATIS DI FOOTER
// =========================================
const elemenTahun = document.getElementById("tahun");
if (elemenTahun) {
    elemenTahun.innerText = new Date().getFullYear();
}

// =========================================
// 3. HIGHLIGHT MENU SAAT SCROLL
// =========================================
const semuaSection = document.querySelectorAll("section[id]");
const semuaMenuLink = document.querySelectorAll(".menu a");

if (semuaSection.length > 0) {
    window.addEventListener("scroll", function() {
        let posisiSekarang = "";
        semuaSection.forEach(function(section) {
            const tinggiSection = section.offsetTop - 100;
            if (window.scrollY >= tinggiSection) {
                posisiSekarang = section.getAttribute("id");
            }
        });
        semuaMenuLink.forEach(function(link) {
            link.classList.remove("nav-aktif");
            if (posisiSekarang !== "" && link.getAttribute("href") === "#" + posisiSekarang) {
                link.classList.add("nav-aktif");
            }
        });
    });
}

// =========================================
// 4. TOMBOL BACK TO TOP
// =========================================
const tombolAtas = document.getElementById("backToTop");
if (tombolAtas) {
    window.addEventListener("scroll", function() {
        tombolAtas.style.display = window.scrollY > 300 ? "block" : "none";
    });
    tombolAtas.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// =========================================
// 5. FORM KONTAK (Kirim ke Formspree)
// =========================================
const formKontak = document.getElementById("formKontak");

if (formKontak) {
    formKontak.addEventListener("submit", function(event) {
        // JANGAN preventDefault, biar form beneran dikirim ke Formspree
        
        // Kita pakai fetch API biar halaman nggak reload
        event.preventDefault();
        
        const data = new FormData(formKontak);
        const pesanSukses = document.getElementById("pesanSukses");
        const nama = document.getElementById("nama").value;

        fetch(formKontak.action, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response) {
            if (response.ok) {
                // Sukses!
                pesanSukses.style.display = "block";
                pesanSukses.innerHTML = "✅ Halo <b>" + nama + "</b>, pesanmu sudah terkirim ke markas! Kami akan segera membalas.";
                formKontak.reset();
                
                setTimeout(function() {
                    pesanSukses.style.display = "none";
                }, 5000);
            } else {
                alert("Waduh, ada masalah. Coba lagi ya!");
            }
        }).catch(function(error) {
            alert("Koneksi bermasalah. Cek internetmu ya!");
        });
    });
}
// =========================================
// 6. MESIN CETAK BERITA (Dynamic Rendering)
// =========================================

// 1. Ini dia "Buku Catatan" datanya. Kamu bisa nambah atau ngurangi di sini.
const dataBerita = [
    {
        gambar: "latihan.png",
        tanggal: "27 September 2026",
        judul: "Pelatihan Superhero Dimulai!",
        cuplikan: "Latihan intensif untuk para calon pahlawan telah resmi dibuka minggu ini."
    },
    {
        gambar: "turnamen.png",
        tanggal: "25 September 2026",
        judul: "Turnamen Kekuatan Super",
        cuplikan: "Kompetisi antar kelas untuk menentukan pahlawan terkuat tahun ini."
    },
    {
        gambar: "kunjungan.png",
        tanggal: "20 September 2026",
        judul: "Kunjungan dari Markas Avengers",
        cuplikan: "Beberapa pahlawan terkenal datang untuk memberi motivasi kepada siswa."
    },
     {
        gambar: "pahlawan.png",
        tanggal: "1 OKtober 2026",
        judul: "2 pahlawah dan satu kendara goib!",
        cuplikan: "para pahlawan sawit bertarung demi mempertahankan lahan sawit mereka dari serangan monster."
    },
    {
        gambar: "pahlawan.png",
        tanggal: "2 OKtober 2026",
        judul: "para moster anti sawit berkeliaran",
        cuplikan: "para pahlawan sawit bertarung demi mempertahankan lahan sawit mereka dari serangan monster anti sawit."
    },
];

// 2. Cari wadah kosongnya di HTML
const wadahBerita = document.getElementById("daftarBerita");

// 3. Kalau wadahnya ketemu, jalankan mesin cetaknya!
if (wadahBerita) {
    let htmlKartu = ""; // Siapkan kertas kosong

    // 4. Looping (ulangi) setiap data yang ada di buku catatan
    dataBerita.forEach(function(berita, index) {
        // 5. Cetak kertas HTML-nya
        htmlKartu += `
            <div class="kartu-berita" data-aos="fade-up" data-aos-delay="${index * 150}">
                <img src="${berita.gambar}" alt="${berita.judul}">
                <div class="info-berita">
                    <span class="tanggal">${berita.tanggal}</span>
                    <h3>${berita.judul}</h3>
                    <p>${berita.cuplikan}</p>
                    <a href="#" class="baca-selengkapnya">Baca Selengkapnya →</a>
                </div>
            </div>
        `;
    });

    // 6. Tempel hasil cetakannya ke wadah di HTML
    wadahBerita.innerHTML = htmlKartu;
}
