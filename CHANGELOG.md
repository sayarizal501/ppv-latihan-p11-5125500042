# Changelog Latihan Catatan Kuliah

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/),
versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [1.2.0] - 2026-11-13

### Added
- `sesudah/src/komponen.js`: komponen `KartuCatatan(catatan)` dan
  `PesanKosong(teks)`. `KartuCatatan` dipakai di daftar Disematkan dan daftar
  Semua catatan, jadi markup kartu hanya ditulis sekali.
- `sesudah/uji/uji-tangguh.html` dan `uji-tangguh.js`: salinan persis pemeriksa
  dari lampiran P12. Hasil: 16 dari 16 butir wajib LOLOS (Level 2 ikut LOLOS).

### Changed
- `sesudah/src/storage.js`: `KUNCI` menjadi `catatan-kuliah:v1`; `muat()`
  membaca localStorage setiap panggilan, menyaring catatan sah, dan tidak
  pernah melempar galat; `simpan()` memakai try/catch dan menyimpan cadangan di
  memori.
- `sesudah/src/ui.js`: render kedua daftar memakai komponen; judul, mata
  kuliah, dan tanggal ditulis lewat `textContent`.
- `sesudah/README` (bagian P12): cara menjalankan pemeriksa dan hasil ujinya.

### Fixed
- Data localStorage rusak (`{rusak`, `"teks"`, objek, item bukan catatan) tidak
  lagi membuat aplikasi kosong atau berhenti.
- Penyimpanan penuh atau diblokir tidak lagi melempar galat; pengguna diberi
  pesan lewat teks `#info`.
- Data lama di kunci monolit `catatan-kuliah` dimigrasikan sekali jalan ke
  `catatan-kuliah:v1` lalu kunci lama dihapus.

## [1.1.0] - 2026-11-07

### Added
- `sesudah/`: hasil pecahan monolit menjadi ES Modules di `src/`.
- `sesudah/uji/uji-modul.html` dan `uji-modul.js`: pemeriksa dari lampiran P11.
- `README.md` dan `.gitignore`.

### Changed
- `sesudah/src/storage.js`, `state.js`, `ui.js`, dan `main.js` memisahkan
  penyimpanan, data, tampilan, dan event.
- `onclick` global diganti delegasi klik di `main.js`.

## [1.0.0] - 2026-11-04

### Added
- `sebelum/index.html` dan `sebelum/app.js`: monolit asli dari lampiran P11,
  tidak diubah, sebagai pembanding.
- `sesudah/uji/`: pemeriksa modul P11.
