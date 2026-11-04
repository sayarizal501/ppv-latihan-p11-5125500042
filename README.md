# Latihan P11 — Catatan Kuliah (ES Modules)

Latihan Tugas P11 Praktikum Pemrograman Visual (TB033109), Iqgam Afrizal
(5125500042). Isi repositori:

- `before/`: monolit asli dari lampiran (index.html + app.js), tidak diubah.
- `sesudah/`: hasil pecahan menjadi ES Modules di `src/`.
- `sesudah/uji/`: pemeriksa otomatis dari lampiran, disalin persis tanpa perubahan.

## Menjalankan

```bash
cd sesudah
python -m http.server 5500
```

- Aplikasi: <http://127.0.0.1:5500/>
- Pemeriksa: <http://127.0.0.1:5500/uji/uji-modul.html>

Monolit `before/` bisa dibuka langsung dengan klik dua kali. Versi `sesudah/`
wajib lewat server lokal karena memakai ES Modules.

## Inventaris tanggung jawab `before/app.js`

| Baris | Blok | Kelompok | Tanggung jawab |
|---|---|---|---|
| 1-3 | Komentar kepala berkas | — | Keterangan tugas |
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

Temuan tanda kode: T1 `render()` mengerjakan penyaringan, penghitungan,
pembuatan HTML, dan penyimpanan sekaligus; T2 `catatan` dan `kataCari` global;
T3 tombol memakai `onclick` yang memanggil fungsi global; T4 `localStorage` dan
`innerHTML` bercampur di satu fungsi.

## Peta modul `sesudah/src/`

```
main.js -> state.js -> storage.js
main.js -> ui.js -> state.js
```

| Modul | Tanggung jawab |
|---|---|
| `storage.js` | Satu-satunya modul yang membaca dan menulis `localStorage`. |
| `state.js` | Menyimpan data catatan dan aturan tambah, semat, hapus, cari; bebas DOM. |
| `ui.js` | Menggambar kartu dan teks info ke DOM berdasarkan hasil `cari()`. |
| `main.js` | Titik masuk: memasang event form, pencarian, dan delegasi klik tombol. |

## Uji regresi sesudah refactor

| No | Skenario | Hasil |
|---|---|---|
| R1 | Tambah "Kuis P11" (Pemrograman Visual) | LOLOS |
| R2 | Simpan dengan judul kosong | LOLOS |
| R3 | Cari "kuis" | LOLOS |
| R4 | Klik Sematkan | LOLOS |
| R5 | Klik Lepas | LOLOS |
| R6 | Hapus lalu Batal, lalu OK | LOLOS |
| R7 | Muat ulang halaman (F5) | LOLOS |

Pemeriksa otomatis: 11 dari 11 butir LOLOS.

## Bantuan AI

Kode modul `sesudah/src/` dan README ini disusun dengan bantuan asisten AI
(OpenCode, model DeepSeek V4.1 Flash), lalu diperiksa dan diuji ulang di
browser memakai `uji/uji-modul.html` serta uji manual R1-R7. Berkas
`before/` dan `sesudah/uji/` berasal dari lampiran tugas dan tidak diubah.
