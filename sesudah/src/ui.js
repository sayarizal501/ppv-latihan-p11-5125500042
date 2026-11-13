// ui.js: menggambar daftar catatan dan teks info ke DOM; tidak menyimpan data.
import { cari } from './state.js';
import { KartuCatatan, PesanKosong } from './komponen.js';
import { statusPenyimpanan } from './storage.js';

export function render(kataCari) {
  const hasil = cari(kataCari);
  const disematkan = hasil.filter((c) => c.disematkan);

  document.getElementById('sematan').replaceChildren(
    ...(disematkan.length
      ? disematkan.map((c) => KartuCatatan(c))
      : [PesanKosong('Belum ada catatan yang disematkan.')]));

  document.getElementById('semua').replaceChildren(
    ...(hasil.length
      ? hasil.map((c) => KartuCatatan(c))
      : [PesanKosong('Tidak ada catatan.')]));

  const peringatan = statusPenyimpanan();
  document.getElementById('info').textContent =
    `${hasil.length} catatan, ${disematkan.length} disematkan` +
    (peringatan ? ` — ${peringatan}` : '');
}
