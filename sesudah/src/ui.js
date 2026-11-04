// ui.js — menggambar kartu catatan dan teks info ke DOM; tidak menyimpan data.
import { cari } from './state.js';

const kartu = (c, labelSemat) =>
  '<div class="kartu"><small>' + c.mk + '</small><h3>' + c.judul + '</h3>' +
  '<small>' + new Date(c.dibuat).toLocaleDateString('id-ID') + '</small>' +
  '<div class="aksi"><button type="button" data-aksi="semat" data-id="' + c.id + '">' + labelSemat + '</button>' +
  '<button type="button" data-aksi="hapus" data-id="' + c.id + '">Hapus</button></div></div>';

export function render(kataCari) {
  const hasil = cari(kataCari);
  const sematan = document.getElementById('sematan');
  const semuaEl = document.getElementById('semua');
  const info = document.getElementById('info');
  const disematkan = hasil.filter((c) => c.disematkan);

  sematan.innerHTML = disematkan.map((c) => kartu(c, 'Lepas')).join('') ||
    '<p class="kosong">Belum ada catatan yang disematkan.</p>';
  semuaEl.innerHTML = hasil.map((c) => kartu(c, c.disematkan ? 'Lepas' : 'Sematkan')).join('') ||
    '<p class="kosong">Tidak ada catatan.</p>';
  info.textContent = hasil.length + ' catatan, ' + disematkan.length + ' disematkan';
}
