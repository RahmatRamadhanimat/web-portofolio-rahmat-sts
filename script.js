/**
 * ============================================================================
 * JAVASCRIPT PORTOFOLIO — RAHMAT RAMADHANI (SMK KRIAN 1 SIDOARJO)
 * ============================================================================
 * Kode ini dibuat sesederhana mungkin (Vanilla JS) agar mudah dipelajari
 * dan mudah dijelaskan kepada guru atau penguji.
 *
 * Daftar Fungsi:
 * 1. Menu Navigasi Mobile (Hamburger Menu)
 * 2. Garis Indikator Scroll & Header Efek
 * 3. Filter Kategori Proyek (Semua, UI/UX, Farm, Python, IoT, Web, AI)
 * 4. Modal Popup Detail Proyek & Sertifikat (Deskripsi Rinci & Link)
 * 5. Salin Alamat Email ke Clipboard
 * 6. Formulir Kontak (Mailto)
 * 7. Tombol Kembali ke Atas (Back to Top) & Notifikasi Toast
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. MENU NAVIGASI MOBILE (HAMBURGER MENU)
     Membuka dan menutup menu ketika layar HP ditekan.
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    // Tombol hamburger diklik -> buka / tutup menu
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Jika salah satu tautan menu diklik -> tutup menu otomatis
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. INDIKATOR SCROLL & SHADOW HEADER
     Mengupdate panjang garis di atas halaman saat pengguna scroll.
     -------------------------------------------------------------------------- */
  const scrollBar = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / totalHeight) * 100;

    // 1. Update lebar garis progress bar di bagian atas
    if (scrollBar) {
      scrollBar.style.width = scrollPercent + '%';
    }

    // 2. Tambah bayangan pada header jika di-scroll lebih dari 30px
    if (header) {
      if (scrollTop > 30) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    // 3. Tampilkan tombol "Kembali ke Atas" jika scroll lebih dari 300px
    if (backToTopBtn) {
      if (scrollTop > 300) backToTopBtn.classList.add('visible');
      else backToTopBtn.classList.remove('visible');
    }
  });

  // Klik tombol kembali ke atas -> scroll halus ke posisi paling atas
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     3. FILTER KATEGORI PROYEK (ALL, UI/UX, FARM, PYTHON, IOT, WEB, AI)
     Menyaring kartu proyek sesuai tombol yang diklik.
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-tab');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Ubah tombol aktif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      // 2. Tampilkan atau sembunyikan proyek
      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. MODAL POPUP DETAIL (PROYEK & SERTIFIKAT)
     Menampilkan jendela popup dengan deskripsi rinci dan tautan resmi.
     -------------------------------------------------------------------------- */
  const modalEl = document.getElementById('detail-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');

  // Database Data Detail Proyek & Sertifikat
  const modalData = {
    'project-1': {
      type: 'project',
      badge: 'UI/UX Design',
      subBadge: 'Lomba 17 Agustus Web Design',
      title: 'Mobile App Design',
      img: 'assets/projects/project-1.jpg',
      info: [
        { label: 'Kategori', value: 'UI/UX Design' },
        { label: 'Acara / Event', value: 'Lomba 17 Agustus Web Design' },
        { label: 'Tools Utama', value: 'Figma' }
      ],
      description: 'Projek Hasil Dari Lomba 17 agustus Web Design. Merupakan perancangan prototipe aplikasi mobile responsif berbasis User-Centered Design (UCD) yang menitikberatkan pada kemudahan interaksi pengguna, arsitektur informasi yang intuitif, serta keselarasan estetika visual modern.',
      highlightsTitle: 'Fitur & Sorotan Proyek',
      highlights: [
        'Karya kompetisi Web & App Design bertema kemerdekaan 17 Agustus.',
        'Perancangan alur interaksi pengguna (User Journey & Wireframing).',
        'Penerapan Design System dengan komponen reusable dan palet warna tematik.',
        'Prototipe interaktif clickable dengan transisi dan micro-interactions di Figma.'
      ],
      tags: ['Figma', 'UI/UX Design', 'Interactive Prototype', 'Mobile Design', 'User-Centered Design'],
      links: [
        {
          label: 'Buka Demo Interaktif Figma ↗',
          url: 'https://embed.figma.com/proto/Skd7WYRCNgcux2502m3PG9/RAHMAT-RAMADHANI-X-RPL-1?node-id=1-57&starting-point-node-id=1%3A3&embed-host=share',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Resolusi Penuh ↗',
          url: 'assets/projects/project-1.jpg',
          isPrimary: false
        }
      ]
    },
    'project-2': {
      type: 'project',
      badge: 'Farm',
      subBadge: 'Ketahanan Pangan PPLG',
      title: 'Menananam Kangkung: Tugas Ketahanan Pangan Mapel PPLG',
      img: 'assets/projects/project-2.jpg',
      info: [
        { label: 'Mata Pelajaran', value: 'PPLG SMK Krian 1 Sidoarjo' },
        { label: 'Kategori', value: 'Farm & Agrikultur Praktis' },
        { label: 'Peran', value: 'Dokumentator & Tim Agrikultur' }
      ],
      description: 'Proyek ketahanan pangan mata pelajaran Pengembangan Perangkat Lunak dan Gim (PPLG) berupa kegiatan budidaya tanaman kangkung, yang menggabungkan proses pembelajaran agrikultur praktis untuk mendukung kemandirian pangan.',
      highlightsTitle: 'Sorotan & Capaian Proyek',
      highlights: [
        'Praktik agrikultur penanaman kangkung darat secara mandiri.',
        'Pencatatan data berkala siklus pertumbuhan dari benih, pemupukan organik, hingga panen.',
        'Penerapan kedisiplinan dan kerja sama tim antarsiswa jurusan PPLG.',
        'Mendukung program sekolah hijau dan ketahanan pangan mandiri.'
      ],
      tags: ['PPLG', 'Farm', 'Agrikultur Praktis', 'Ketahanan Pangan', 'Dokumentasi Siklus'],
      links: [
        {
          label: 'Lihat Dokumentasi Lengkap ↗',
          url: 'assets/projects/project-2.jpg',
          isPrimary: true
        },
        {
          label: 'Diskusi & Info Proyek ✉',
          url: '#contact',
          isPrimary: false,
          isScroll: true
        }
      ]
    },
    'project-3': {
      type: 'project',
      badge: 'Farm',
      subBadge: 'Kesehatan Mandiri & Lingkungan',
      title: 'Menanam 10 Jenis TOGA: Projek Kesehatan Mandiri dan Lingkungan',
      img: 'assets/projects/project-3.jpg',
      info: [
        { label: 'Konsentrasi', value: 'PPLG & Edukasi Lingkungan' },
        { label: 'Jumlah Varietas', value: '10 Jenis Tanaman Obat' },
        { label: 'Peran', value: 'Kataloger Digital & Tim Budidaya' }
      ],
      description: 'Proyek ketahanan pangan dan pemanfaatan lahan sekolah melalui budidaya 10 jenis Tanaman Obat Keluarga (TOGA) pilihan, yang memadukan kegiatan agrikultur praktis dengan penerapan teknologi digital untuk mendukung kesehatan mandiri dan edukasi lingkungan.',
      highlightsTitle: 'Sorotan & Capaian Proyek',
      highlights: [
        'Budidaya 10 varietas TOGA seperti jahe, kunyit, temulawak, serai, dan lidah buaya.',
        'Katalogisasi digital manfaat farmakologi dan khasiat herbal tanaman.',
        'Edukasi pemanfaatan tanaman obat tradisional untuk kesehatan mandiri.',
        'Mendukung pelestarian keanekaragaman hayati dan lingkungan sekolah Adiwiyata.'
      ],
      tags: ['Farm', 'TOGA', 'Kesehatan Mandiri', 'Edukasi Lingkungan', 'Digital Catalog'],
      links: [
        {
          label: 'Lihat Dokumentasi Lengkap ↗',
          url: 'assets/projects/project-3.jpg',
          isPrimary: true
        },
        {
          label: 'Diskusi & Info Proyek ✉',
          url: '#contact',
          isPrimary: false,
          isScroll: true
        }
      ]
    },
    'project-4': {
      type: 'project',
      badge: 'Python',
      subBadge: 'Extrakurikuler AI Study Club',
      title: 'Extrakurikuler : AI Study Club',
      img: 'assets/projects/project-4.jpg',
      info: [
        { label: 'Kegiatan', value: 'Extrakurikuler AI Study Club' },
        { label: 'Bahasa', value: 'Python' },
        { label: 'Format', value: 'Jupyter Notebook' }
      ],
      description: 'NoteBook Extrakurikuler AI Study Club yang memuat eksplorasi kode pemrograman Python, manipulasi data array, serta pengenalan algoritma pembelajaran mesin (Machine Learning). Proyek ini disusun sebagai dokumentasi belajar terstruktur dalam mendalami kecerdasan buatan.',
      highlightsTitle: 'Materi & Eksplorasi Notebook',
      highlights: [
        'Eksplorasi sintaksis dan struktur data Python untuk pemrosesan dataset.',
        'Implementasi konsep dasar Machine Learning dan pengolahan data numerik.',
        'Dokumentasi rapi berbasis Jupyter Notebook dengan visualisasi hasil eksekusi.',
        'Aktivitas rutin pembelajaran dan bedah algoritma di AI Study Club.'
      ],
      tags: ['Python', 'AI Study Club', 'Notebook', 'Machine Learning', 'Data Processing'],
      links: [
        {
          label: 'Lihat Dokumentasi Notebook ↗',
          url: 'assets/projects/project-4.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'project-5': {
      type: 'project',
      badge: 'IoT',
      subBadge: 'Extrakurikuler Skarisa Robotic',
      title: 'Extrakurikuler : Skarisa Robotic',
      img: 'assets/projects/project-5.jpg',
      info: [
        { label: 'Kegiatan', value: 'Extrakurikuler Skarisa Robotic' },
        { label: 'Hardware', value: 'Arduino & ESP32' },
        { label: 'Bidang', value: 'Internet of Things (IoT)' }
      ],
      description: 'Project Extrakurikuler Skarisa Robotic di SMK Krian 1 Sidoarjo yang berfokus pada perancangan sistem mikrokontroler, pemrograman sensor, dan komunikasi perangkat berbasis Arduino serta mikrokontroler ESP32 dengan konektivitas nirkabel Wi-Fi/Bluetooth.',
      highlightsTitle: 'Komponen & Fitur Project',
      highlights: [
        'Pemrograman mikrokontroler Arduino dan modul ESP32.',
        'Integrasi sensor digital/analog untuk membaca data lingkungan secara real-time.',
        'Pengujian logika kendali aktuator, motor driver, dan sistem robotika.',
        'Penerapan komunikasi IoT nirkabel untuk monitoring jarak jauh.'
      ],
      tags: ['Arduino', 'ESP32', 'IoT', 'Robotics', 'Skarisa Robotic', 'Hardware'],
      links: [
        {
          label: 'Lihat Project Robotic ↗',
          url: 'assets/projects/project-5.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'project-6': {
      type: 'project',
      badge: 'Web',
      subBadge: 'Web Blogger TJK',
      title: 'Blogger : TJK Rahmat Ramadhani',
      img: 'assets/projects/project-6.jpg',
      info: [
        { label: 'Platform', value: 'Web Blogger' },
        { label: 'Topik', value: 'Teknik Jaringan Komputer & IT' },
        { label: 'Penulis', value: 'Rahmat Ramadhani' }
      ],
      description: 'Web Blogger edukatif yang memuat artikel, tutorial, dan dokumentasi pembelajaran seputar dunia Teknik Komputer dan Jaringan (TJK) serta teknologi perangkat lunak. Dirancang untuk berbagi wawasan teknis kepada sesama siswa dan penggiat IT.',
      highlightsTitle: 'Konten & Fitur Blog',
      highlights: [
        'Publikasi artikel teknis seputar konfigurasi jaringan dan dasar komputasi.',
        'Dokumentasi praktikum sekolah dan tutorial langkah demi langkah.',
        'Desain blog yang rapi, responsif, dan mudah dibaca pembaca.',
        'Media literasi digital dan berbagi pengetahuan seputar TJK.'
      ],
      tags: ['TJK', 'Web Blogger', 'Web', 'Teknologi Informasi', 'Edukasi'],
      links: [
        {
          label: 'Lihat Web Blogger ↗',
          url: 'assets/projects/project-6.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'project-7': {
      type: 'project',
      badge: 'AI',
      subBadge: 'Teachable Machine & TFJS',
      title: 'AI Model Rock Paper Scissors : With TeachableMachine',
      img: 'assets/projects/project-7.jpg',
      info: [
        { label: 'Platform', value: 'Web AI (Browser Real-Time)' },
        { label: 'Teknologi', value: 'TensorFlow.js & Teachable Machine' },
        { label: 'Input', value: 'Kamera / Webcam Gesture' }
      ],
      description: 'Game Batu Gunting Kertas berbasis AI yang menggunakan kamera untuk mengenali gesture tangan secara real-time. Project ini dibangun dengan Teachable Machine, TensorFlow.js, HTML, CSS, dan JavaScript serta dapat dijalankan langsung melalui browser.',
      highlightsTitle: 'Fitur & Keunggulan Project',
      highlights: [
        'Pengenalan gesture tangan (Batu, Gunting, Kertas) melalui kamera secara real-time.',
        'Pelatihan model klasifikasi visual menggunakan Google Teachable Machine.',
        'Integrasi model pembelajaran mesin ke browser dengan TensorFlow.js.',
        'Aplikasi berbasis web murni (HTML, CSS, JavaScript) tanpa instalasi tambahan.'
      ],
      tags: ['TensorFlow.js', 'Teachable Machine', 'AI', 'Web AI', 'Computer Vision', 'JavaScript'],
      links: [
        {
          label: 'Lihat Tampilan Project ↗',
          url: 'assets/projects/project-7.jpg',
          isPrimary: true
        },
        {
          label: 'GitHub Profil ↗',
          url: 'https://github.com/ramadhanirahmat47-rgb',
          isPrimary: false
        }
      ]
    },
    'cert-1': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Dicoding Academy • 2026',
      title: 'Belajar Dasar AI (Artificial Intelligence)',
      img: 'assets/certificates/cert-1.jfif',
      certId: 'NVP7WY21RZR0',
      verifyUrl: 'https://www.dicoding.com/certificates/NVP7WY21RZR0',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Dicoding Academy' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: 'NVP7WY21RZR0', isCopyable: true }
      ],
      description: 'Sertifikasi resmi dari Dicoding Academy yang memvalidasi penguasaan konsep fundamental kecerdasan buatan. Materi kursus meliputi pemahaman komprehensif mengenai Machine Learning (Supervised, Unsupervised, & Reinforcement Learning), Deep Learning, Natural Language Processing (NLP), Computer Vision, serta prinsip etika dan tanggung jawab moral dalam pemanfaatan teknologi AI masa kini.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Memahami konsep dasar AI & alur kerja Machine Learning (Supervised & Unsupervised)',
        'Mengenal pemanfaatan Generative AI, Large Language Models (LLM), dan Prompt Engineering',
        'Analisis studi kasus etika, privasi data pengguna, dan mitigasi bias algoritma AI',
        'Lulus evaluasi ujian kompetensi resmi berstandar industri dari Dicoding Academy'
      ],
      tags: ['Artificial Intelligence', 'Machine Learning', 'Prompt Engineering', 'AI Ethics', 'Dicoding'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/NVP7WY21RZR0',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-1.jfif',
          isPrimary: false
        }
      ]
    },
    'cert-2': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Dicoding Academy • 2026',
      title: 'Memulai Pemrograman Dengan Python',
      img: 'assets/certificates/cert-2.jfif',
      certId: '07Z6QR412ZQR',
      verifyUrl: 'https://www.dicoding.com/certificates/07Z6QR412ZQR',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Dicoding Academy' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: '07Z6QR412ZQR', isCopyable: true }
      ],
      description: 'Sertifikasi kompetensi pemrograman Python dari Dicoding Academy yang dirancang untuk membangun fondasi penulisan kode berstandar industri. Meliputi sintaksis dasar Python, tipe data terstruktur, alur kendali logika program, pembuatan fungsi modular, hingga pengelolaan berkas dan penanganan eksepsi.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Penguasaan sintaksis inti Python: tipe data primitif, list, tuple, set, dan dictionary',
        'Penerapan struktur kontrol alur logika: percabangan IF-ELIF-ELSE dan perulangan FOR/WHILE',
        'Modularitas fungsi, passing arguments, scope variabel, dan Clean Code',
        'Penanganan error secara aman dengan mekanisme try-except blocks'
      ],
      tags: ['Python', 'Programming Logic', 'Data Structures', 'Clean Code', 'Dicoding'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/07Z6QR412ZQR',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-2.jfif',
          isPrimary: false
        }
      ]
    },
    'cert-3': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'DBS Foundation × Dicoding • 2026',
      title: 'Introduction To Financial Literacy',
      img: 'assets/certificates/cert-3.jfif',
      certId: 'ERZR79RWMZYV',
      verifyUrl: 'https://www.dicoding.com/certificates/ERZR79RWMZYV',
      info: [
        { label: 'Penerbit Sertifikat', value: 'DBS Foundation × Dicoding' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: 'ERZR79RWMZYV', isCopyable: true }
      ],
      description: 'Program sertifikasi kerja sama antara DBS Foundation dan Dicoding Indonesia dalam Coding Camp 2026. Kursus ini memberikan wawasan strategis mengenai literasi keuangan digital, pengelolaan arus kas (cash flow), budgeting cerdas, pemahaman investasi, manajemen risiko, serta peran teknologi finansial (FinTech) dalam perekonomian modern.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Pemahaman mendalam tentang konsep cash flow, budgeting, dan perencanaan keuangan strategis',
        'Pengenalan instrumen investasi cerdas, suku bunga, dan mitigasi risiko finansial',
        'Wawasan tentang ekosistem FinTech, keamanan transaksi perbankan digital, dan anti-fraud',
        'Sertifikat resmi terakreditasi DBS Foundation Coding Camp & Dicoding'
      ],
      tags: ['Financial Literacy', 'FinTech', 'DBS Foundation', 'Digital Economy', 'Dicoding'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/ERZR79RWMZYV',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-3.jfif',
          isPrimary: false
        }
      ]
    },
    'cert-4': {
      type: 'certificate',
      badge: 'Sertifikasi Resmi',
      subBadge: 'Dicoding Academy • 2026',
      title: 'Belajar Strategi Pengembangan Diri',
      img: 'assets/certificates/cert-4.jfif',
      certId: 'JLX1KL1KJP72',
      verifyUrl: 'https://www.dicoding.com/certificates/JLX1KL1KJP72',
      info: [
        { label: 'Penerbit Sertifikat', value: 'Dicoding Academy' },
        { label: 'Tahun Kelulusan', value: '2026' },
        { label: 'ID Kredensial', value: 'JLX1KL1KJP72', isCopyable: true }
      ],
      description: 'Sertifikasi soft skills dan pengembangan profesional dari Dicoding Academy. Memfokuskan pada pembentukan pola pikir bertumbuh (Growth Mindset), disiplin manajemen waktu (Time Management), penetapan target berbasis metode SMART, komunikasi profesional yang efektif, serta ketahanan mental dalam menghadapi tantangan di industri rekayasa perangkat lunak.',
      highlightsTitle: 'Kompetensi & Materi Yang Dikuasai',
      highlights: [
        'Membangun Growth Mindset untuk akselerasi belajar dan adaptasi teknologi baru',
        'Penerapan teknik manajemen waktu produktif (Pomodoro, Eisenhower Matrix, Prioritization)',
        'Metode penentuan target terukur menggunakan pendekatan SMART Goals',
        'Komunikasi interpersonal, kolaborasi tim profesional, dan problem solving mindset'
      ],
      tags: ['Growth Mindset', 'Time Management', 'SMART Goals', 'Soft Skills', 'Professional Ethics'],
      links: [
        {
          label: 'Verifikasi Sertifikat Resmi (Dicoding) ↗',
          url: 'https://www.dicoding.com/certificates/JLX1KL1KJP72',
          isPrimary: true
        },
        {
          label: 'Lihat Gambar Sertifikat ↗',
          url: 'assets/certificates/cert-4.jfif',
          isPrimary: false
        }
      ]
    }
  };

  // Render HTML isi modal berdasarkan data
  function renderModalContent(data) {
    if (!modalBody) return;

    const infoCardsHtml = (data.info || []).map(item => {
      if (item.isCopyable) {
        return `
          <div class="modal-info-col">
            <small>${item.label}</small>
            <div class="modal-copy-id-row">
              <code class="modal-code">${item.value}</code>
              <button type="button" class="btn-copy-id" data-copy="${item.value}" title="Salin ID">Salin</button>
            </div>
          </div>
        `;
      }
      return `
        <div class="modal-info-col">
          <small>${item.label}</small>
          <strong>${item.value}</strong>
        </div>
      `;
    }).join('');

    const highlightsHtml = (data.highlights || []).map(hl => {
      const icon = data.type === 'project' 
        ? '<span class="accent-star">✦</span>' 
        : '<span class="check-mark">✓</span>';
      return `<li>${icon}<span>${hl}</span></li>`;
    }).join('');

    const tagsHtml = (data.tags && data.tags.length > 0) ? `
      <div class="modal-section">
        <h4 class="modal-section-title">Teknologi &amp; Topik</h4>
        <div class="item-tags">
          ${data.tags.map(tag => `<span class="chip-tag">${tag}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const linksHtml = (data.links || []).map(link => {
      const cls = link.isPrimary ? 'btn btn-primary' : 'btn btn-outline';
      if (link.isScroll) {
        return `<a href="${link.url}" class="${cls}" data-close-modal="true"><span>${link.label}</span></a>`;
      }
      return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${cls}"><span>${link.label}</span></a>`;
    }).join('');

    modalBody.innerHTML = `
      <div class="modal-header-meta">
        <span class="sec-badge" style="margin-bottom: 0;">${data.badge || ''}</span>
        ${data.subBadge ? `<span class="modal-sub-badge">${data.subBadge}</span>` : ''}
      </div>
      <h3 id="modal-title" class="modal-title">${data.title}</h3>

      ${data.img ? `
        <div class="modal-media-box">
          <img src="${data.img}" alt="${data.title}" class="modal-media-img" loading="eager">
          <a href="${data.img}" target="_blank" rel="noopener noreferrer" class="modal-media-zoom" title="Buka gambar ukuran penuh">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
            <span>Ukuran Penuh</span>
          </a>
        </div>
      ` : ''}

      ${infoCardsHtml ? `<div class="modal-info-card">${infoCardsHtml}</div>` : ''}

      <div class="modal-section">
        <h4 class="modal-section-title">Deskripsi Lengkap</h4>
        <p class="modal-desc">${data.description}</p>
      </div>

      ${highlightsHtml ? `
        <div class="modal-section">
          <h4 class="modal-section-title">${data.highlightsTitle || 'Sorotan Utama'}</h4>
          <ul class="modal-highlight-list">
            ${highlightsHtml}
          </ul>
        </div>
      ` : ''}

      ${tagsHtml}

      <div class="modal-footer-btns">
        ${linksHtml}
        <button type="button" class="btn btn-ghost" data-close-modal="true"><span>Tutup</span></button>
      </div>
    `;

    // Pasang listener tombol salin ID di dalam modal
    const copyIdBtns = modalBody.querySelectorAll('.btn-copy-id');
    copyIdBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const copyVal = btn.getAttribute('data-copy');
        if (copyVal) {
          navigator.clipboard.writeText(copyVal).then(() => {
            btn.textContent = 'Disalin!';
            showToast(`ID ${copyVal} berhasil disalin!`);
            setTimeout(() => { btn.textContent = 'Salin'; }, 2000);
          }).catch(() => {
            showToast(`ID: ${copyVal}`);
          });
        }
      });
    });

    // Pasang listener tombol tutup di dalam modal
    const closeBtns = modalBody.querySelectorAll('[data-close-modal="true"]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeDetailModal();
      });
    });
  }

  // Buka modal berdasarkan ID dengan data fallback jika ID baru
  function openModalById(id, fallbackEl = null) {
    let data = modalData[id];

    if (!data && fallbackEl) {
      const title = fallbackEl.querySelector('.item-title, .cert-h3')?.textContent || 'Detail';
      const desc = fallbackEl.querySelector('.item-desc, .cert-text')?.textContent || '';
      const img = fallbackEl.querySelector('img')?.getAttribute('src') || '';
      const badge = fallbackEl.querySelector('.cat-badge, .cert-badge-iss')?.textContent || 'Detail';
      const year = fallbackEl.querySelector('.cert-badge-yr')?.textContent || '';
      const tags = Array.from(fallbackEl.querySelectorAll('.chip-tag')).map(el => el.textContent);
      const actionLink = fallbackEl.querySelector('a')?.getAttribute('href') || img;

      data = {
        type: 'general',
        badge: badge,
        subBadge: year,
        title: title,
        img: img,
        info: [
          { label: 'Kategori', value: badge },
          { label: 'Status', value: 'Tersedia' }
        ],
        description: desc,
        highlightsTitle: 'Informasi',
        highlights: [desc],
        tags: tags,
        links: [
          { label: 'Buka Tautan ↗', url: actionLink, isPrimary: true },
          { label: 'Lihat Gambar ↗', url: img, isPrimary: false }
        ]
      };
    }

    if (!data) return;

    renderModalContent(data);

    if (modalEl) {
      modalEl.classList.add('active');
      modalEl.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');

      const modalBodyEl = modalEl.querySelector('.modal-body');
      if (modalBodyEl) {
        modalBodyEl.scrollTop = 0;
      }

      setTimeout(() => {
        try {
          modalCloseBtn?.focus({ preventScroll: true });
        } catch (err) {
          // Fallback if browser doesn't support preventScroll option
        }
      }, 50);
    }
  }

  // Tutup modal
  function closeDetailModal() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  // 1. Klik pada kartu proyek atau tombol detail proyek
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Jika pengguna mengklik langsung link eksternal (seperti Demo Figma), jangan cegah
      if (e.target.closest('a') && !e.target.closest('.btn-open-modal')) {
        return;
      }
      e.preventDefault();
      const modalId = item.getAttribute('data-modal-id');
      if (modalId) {
        openModalById(modalId, item);
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === item) {
          e.preventDefault();
          const modalId = item.getAttribute('data-modal-id');
          if (modalId) openModalById(modalId, item);
        }
      }
    });
  });

  // Tombol "Lihat Detail" di proyek
  document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modalId = btn.getAttribute('data-modal-id');
      const parentCard = btn.closest('.project-item, .cert-item');
      if (modalId) {
        openModalById(modalId, parentCard);
      }
    });
  });

  // 2. Klik pada kartu sertifikat
  document.querySelectorAll('.cert-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = item.getAttribute('data-modal-id');
      if (modalId) {
        openModalById(modalId, item);
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === item) {
          e.preventDefault();
          const modalId = item.getAttribute('data-modal-id');
          if (modalId) openModalById(modalId, item);
        }
      }
    });
  });

  // 3. Tombol tutup modal X
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeDetailModal);
  }

  // 4. Klik di luar modal dialog (backdrop klik)
  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        closeDetailModal();
      }
    });
  }

  // 5. Tombol Escape keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && modalEl.classList.contains('active')) {
      closeDetailModal();
    }
  });

  /* --------------------------------------------------------------------------
     5. SALIN ALAMAT EMAIL KE CLIPBOARD
     Menyalin email saat tombol "Salin" diklik.
     -------------------------------------------------------------------------- */
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = 'ramadhanirahmat47@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText).then(() => {
        showToast('Alamat email berhasil disalin!');
      }).catch(() => {
        showToast('Email: ' + emailText);
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. FORMULIR KONTAK (MAILTO)
     Membuka aplikasi email client dengan subjek dan isi yang sudah terisi.
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Mencegah reload halaman

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Silakan lengkapi semua kolom formulir.');
        return;
      }

      // Format tautan mailto
      const mailtoUrl = `mailto:${emailText}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Halo Rahmat,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;

      // Buka aplikasi email pengguna
      window.location.href = mailtoUrl;
      showToast('Membuka aplikasi email...');
      contactForm.reset();
    });
  }

  /* --------------------------------------------------------------------------
     7. FUNGSI BANTUAN: NOTIFIKASI TOAST SEDERHANA
     -------------------------------------------------------------------------- */
  function showToast(pesan) {
    const toastBox = document.getElementById('toast-container');
    if (!toastBox) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = pesan;

    toastBox.appendChild(toast);

    // Hapus notifikasi setelah 2.5 detik
    setTimeout(() => {
      toast.remove();
    }, 2500);
  }

});

