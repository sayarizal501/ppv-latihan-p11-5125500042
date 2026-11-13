# Latihan P11 dan P12: Catatan Kuliah

Latihan Tugas P11 dan P12 Praktikum Pemrograman Visual (TB033109), Iqgam
Afrizal (5125500042). Isi repositori:

- `sebelum/`: monolit asli dari lampiran P11 (index.html + app.js), tidak diubah.
- `sesudah/`: hasil pecahan menjadi ES Modules di `src/`, lalu dilengkapi
  komponen dan penyimpanan aman pada P12.
- `sesudah/uji/`: pemeriksa otomatis dari lampiran, disalin persis tanpa
  perubahan (P11 dan P12).
- `CHANGELOG.md`: riwayat versi latihan (v1.0.0, v1.1.0, v1.2.0).

## Menjalankan

```bash
cd sesudah
python -m http.server 5500
```

- Aplikasi: <http://127.0.0.1:5500/>
- Pemeriksa P11: <http://127.0.0.1:5500/uji/uji-modul.html>
- Pemeriksa P12: <http://127.0.0.1:5500/uji/uji-tangguh.html>

Monolit `sebelum/` bisa dibuka langsung dengan klik dua kali. Versi `sesudah/`
wajib lewat server lokal karena memakai ES Modules.

## Tag versi

| Tag | Isi |
|---|---|
| `v1.0.0` | Monolit asli P11 sebagai pembanding |
| `v1.1.0` | Pecahan ES Modules hasil P11 |
| `v1.2.0` | Komponen `KartuCatatan` + penyimpanan aman + pemeriksa P12 |

## Inventaris tanggung jawab `sebelum/app.js`

| Baris | Blok | Kelompok | Tanggung jawab |
|---|---|---|---|
| 1-3 | Komentar kepala berkas | - | Keterangan tugas |
| 5-6 | `var catatan`, `var kataCari` | state | Data catatan dan kata pencarian yang bisa diubah dari mana saja |
| 8-19 | Awal `render()` | tampilan + state | Ambil elemen, kosongkan wadah, saring catatan dengan `kataCari` |
| 20-36 | Badan `render()` | tampilan | Hitung sematan, susun HTML kartu dua kali, pasang `onclick` |
| 37-39 | Akhir `render()` | tampilan | Pesan kosong dan teks `#info` |
| 40 | `localStorage.setItem` | penyimpanan | Menulis seluruh catatan setiap kali render |
| 43-48 | `sematkan()` | state | Membalik status sematan lalu render (menyimpan lewat render) |
| 50-58 | `hapus()` | state + tampilan | Konfirmasi, saring catatan yang dihapus, render |
| 60-68 | Submit form | event + state | Ambil judul, tambah catatan, kosongkan input, render |
| 70-73 | Input cari | event + state | Simpan kata kunci, render |
| 75 | `render()` terakhir | tampilan | Gambar awal saat halaman dimuat |

Temuan tanda kode:

- T1: `render()` mengerjakan penyaringan, penghitungan, pembuatan HTML, dan
  penyimpanan sekaligus.
- T2: `catatan` dan `kataCari` dibuat global.
- T3: tombol memakai `onclick` yang memanggil fungsi global.
- T4: `localStorage` dan `innerHTML` bercampur di satu fungsi.

## Peta modul `sesudah/src/`

```
main.js -> state.js -> storage.js
main.js -> ui.js -> state.js
ui.js -> komponen.js
```

| Modul | Tanggung jawab |
|---|---|
| `storage.js` | Satu-satunya modul yang membaca dan menulis `localStorage`. KUNCI `catatan-kuliah:v1`, menyaring data rusak, dan punya cadangan memori. |
| `state.js` | Menyimpan data catatan dan aturan tambah, semat, hapus, cari; bebas DOM. |
| `ui.js` | Menggambar kedua daftar memakai `KartuCatatan` dan menampilkan status penyimpanan. |
| `komponen.js` | Komponen tampilan reusable: `KartuCatatan(catatan)` dan `PesanKosong(teks)`; semua teks pengguna lewat `textContent`. |
| `main.js` | Titik masuk: memasang event form, pencarian, dan delegasi klik tombol. |

## Kontrak komponen dan penyimpanan (P12)

- `KartuCatatan(catatan) -> HTMLElement`; `catatan` berisi `{ id, judul, mk,
  dibuat, disematkan }`. Kartu menampilkan mata kuliah, judul, tanggal, tombol
  Sematkan/Lepas, dan Hapus. Teks pengguna tidak pernah masuk `innerHTML`.
- `PesanKosong(teks) -> HTMLElement` untuk keadaan daftar kosong.
- `storage.js` mengekspor `KUNCI = 'catatan-kuliah:v1'`, `muat() -> array`
  catatan sah (tidak pernah melempar), `simpan(data)` yang tidak melempar, dan
  `statusPenyimpanan()` berisi pesan bila penyimpanan bermasalah.
- Migrasi Level 2: bila `catatan-kuliah:v1` belum ada tetapi kunci lama
  `catatan-kuliah` berisi data, data dipindahkan sekali jalan lalu kunci lama
  dihapus.

## Uji regresi P11

| No | Skenario | Hasil |
|---|---|---|
| R1 | Tambah "Kuis P11" (Pemrograman Visual) | LOLOS |
| R2 | Simpan dengan judul kosong | LOLOS |
| R3 | Cari "kuis" | LOLOS |
| R4 | Klik Sematkan | LOLOS |
| R5 | Klik Lepas | LOLOS |
| R6 | Hapus lalu Batal, lalu OK | LOLOS |
| R7 | Muat ulang halaman (F5) | LOLOS |

Pemeriksa modul P11: 15 dari 15 butir LOLOS.

## Uji ketangguhan P12

Pemeriksa `uji/uji-tangguh.html` dijalankan lewat server lokal. Hasil:

- 16 dari 16 butir wajib **LOLOS**.
- Butir opsional Level 2 (migrasi kunci lama) juga **LOLOS**.
- Uji manual S5: KUNCI diisi `[null, 5, {"judul": 7}, catatan sah]`; hanya
  catatan sah yang tampil dan catatan baru tetap bisa ditambahkan.

## Bantuan AI

AI digunakan untuk membantu menyusun kode P12: komponen `KartuCatatan` dan
`PesanKosong`, penyimpanan aman berkunci versi, dan penyesuaian berkas
pemeriksa ketangguhan.
