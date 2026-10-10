// =========================================
// HERO HALAMAN UTAMA: SCENERY SCROLL (GSAP + ScrollTrigger)
// Satu timeline untuk semuanya: gunung, matahari, judul, panel Join.
// Urutan di HTML: gsap.min.js -> ScrollTrigger.min.js -> scenery.js
// =========================================
(function () {
    const pin = document.querySelector(".scenery-pin");
    if (!pin) return;

    // Kalau CDN GSAP gagal dimuat (offline), semua teks tetap tampil tanpa animasi
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        document.documentElement.classList.remove("js");
        console.warn("GSAP/ScrollTrigger belum termuat, scenery animation dilewati.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. BINTANG (dibuat acak lewat JS biar kodenya nggak panjang)
    const bintang = document.getElementById("bintang");
    const NS = "http://www.w3.org/2000/svg";
    for (let i = 0; i < 80; i++) {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", Math.random() * 750);
        c.setAttribute("cy", Math.random() * 300);
        c.setAttribute("r", Math.random() * 1.2 + 0.4);
        c.setAttribute("fill", "#ffffff");
        c.setAttribute("opacity", Math.random() * 0.6 + 0.4);
        bintang.appendChild(c);
    }

    // 2. ELEMEN DARI HERO LAMA: judul per-huruf + panel teks
    const judul = document.getElementById("sceneJudul");
    const judulBesar = document.getElementById("sceneJudulBesar");
    const kicker = judul.querySelector(".scenery-kicker");
    const panel = document.getElementById("sceneCopy");

    const teksJudul = judulBesar.textContent.trim();
    judulBesar.textContent = "";
    const huruf = teksJudul.split("").map(function (h) {
        const span = document.createElement("span");
        span.textContent = h;
        judulBesar.appendChild(span);
        return span;
    });

    // 3. POSISI AWAL
    gsap.set("#matahari", { x: 375, y: 360, scale: 0.8 });
    gsap.set(huruf, { opacity: 0, y: 20 });
    gsap.set(kicker, { opacity: 0 });
    gsap.set(judul, { autoAlpha: 1 });                 // CSS (class .js) menyembunyikannya dulu
    gsap.set(panel, { yPercent: 100, autoAlpha: 1 });  // turun di luar layar, siap naik

    // 4. BURUNG: kepak sayap terus-menerus (bukan bagian scroll)
    gsap.to("#burungGrup use", {
        scaleY: 0.55, transformOrigin: "50% 50%",
        duration: 0.3, repeat: -1, yoyo: true, stagger: 0.07
    });

    // 5. TIMELINE YANG DIGERAKKAN SCROLL (durasi total 10 satuan)
    const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: pin,
            start: "top 80px",   // 80px = tinggi navbar
            end: "+=300%",       // makin besar = scroll makin panjang
            pin: true,
            scrub: 1             // 1 = halus, ikut scroll dengan sedikit delay
        }
    });

    tl
        // SIANG -> SENJA (animasi gunung)
        .to("#matahari", { y: 230, scale: 2.6, duration: 4 }, 0)
        .to("#awan", { x: -120, duration: 10 }, 0)
        .to("#burungGrup", { x: 520, y: -70, duration: 7 }, 0)
        .to("#gunungBelakang", { y: -18, duration: 10 }, 0)
        .to("#pinusBelakang", { y: -12, duration: 10 }, 0)
        .to("#gunungTengah", { y: -8, duration: 10 }, 0)
        .to("#pinusDepan", { scale: 1.12, svgOrigin: "375 500", duration: 10 }, 0)
        .to("#sceneHint", { opacity: 0, duration: 1 }, 0)

        // JUDUL: "MARKAS" lalu huruf SUPERMAN muncul satu-satu (scroll 0% - 45%)
        .to(kicker, { opacity: 1, duration: 1 }, 0.3)
        .to(huruf, { opacity: 1, y: 0, duration: 1.2, stagger: 0.4 }, 0.5)

        // SENJA -> MALAM
        .to("#matahari", { y: -140, duration: 3 }, 5)
        .to("#langitMalam", { opacity: 1, duration: 3 }, 5)
        .to("#awan", { opacity: 0, duration: 2 }, 5)
        .to("#bintang", { opacity: 1, duration: 3 }, 6)
        .to("#gunungBelakang", { fill: "#2a1d4d", duration: 3 }, 5)
        .to("#pinusBelakang", { fill: "#1f1840", duration: 3 }, 5)
        .to("#gunungTengah", { fill: "#1a1440", duration: 3 }, 5)
        .to("#gunungDepan", { fill: "#0f0b2a", duration: 3 }, 5)
        .to("#pinusDepan", { fill: "#07051a", duration: 3 }, 5)

        // PANEL TEKS + TOMBOL JOIN naik dari bawah (scroll 55% - 95%)
        .to(panel, { yPercent: 0, duration: 4 }, 5.5)
        .to("#sceneHintAkhir", { opacity: 1, duration: 1 }, 9);

    // 6. Refresh setelah semua gambar/font selesai (biar posisi pin akurat),
    //    lalu kasih tahu AOS supaya animasi kartu di bawahnya kepicu di posisi yang benar
    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
        if (window.AOS) AOS.refresh();
    });
})();
