document.addEventListener("DOMContentLoaded", () => {
  const tombolMenu = document.getElementById("tombol-menu");
  const navigasiMenu = document.getElementById("navigasi-menu");
  const tautanNavigasi = document.querySelectorAll(".tautan-navigasi");

  if (tombolMenu && navigasiMenu) {
    tombolMenu.addEventListener("click", () => {
      navigasiMenu.classList.toggle("tampil");
      const sedangTerbuka = navigasiMenu.classList.contains("tampil");
      tombolMenu.setAttribute("aria-expanded", sedangTerbuka);
    });

    // Menutup menu otomatis saat tautan navigasi diklik
    tautanNavigasi.forEach((tautan) => {
      tautan.addEventListener("click", () => {
        if (navigasiMenu.classList.contains("tampil")) {
          navigasiMenu.classList.remove("tampil");
          tombolMenu.setAttribute("aria-expanded", false);
        }
      });
    });
  }

  const tombolTema = document.getElementById("tombol-tema");

  if (tombolTema) {
    tombolTema.addEventListener("click", () => {
      document.body.classList.toggle("tema-gelap");
      const modeGelapAktif = document.body.classList.contains("tema-gelap");
      tombolTema.textContent = modeGelapAktif ? "☀️" : "🌙";
    });
  }

  const tombolKeAtas = document.getElementById("tombol-ke-atas");

  if (tombolKeAtas) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        tombolKeAtas.style.display = "flex";
      } else {
        tombolKeAtas.style.display = "none";
      }
    });

    tombolKeAtas.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});