// komponen.js: komponen tampilan yang menerima data lewat parameter.
// Teks dari pengguna selalu ditulis lewat textContent, bukan innerHTML.
export function KartuCatatan(catatan) {
  const kartu = document.createElement('article');
  kartu.className = 'kartu';

  const mk = document.createElement('small');
  mk.textContent = catatan.mk;

  const judul = document.createElement('h3');
  judul.textContent = catatan.judul;

  const tanggal = document.createElement('small');
  tanggal.textContent = new Date(catatan.dibuat).toLocaleDateString('id-ID');

  const aksi = document.createElement('div');
  aksi.className = 'aksi';

  const semat = document.createElement('button');
  semat.type = 'button';
  semat.dataset.aksi = 'semat';
  semat.dataset.id = catatan.id;
  semat.textContent = catatan.disematkan ? 'Lepas' : 'Sematkan';

  const hapus = document.createElement('button');
  hapus.type = 'button';
  hapus.dataset.aksi = 'hapus';
  hapus.dataset.id = catatan.id;
  hapus.textContent = 'Hapus';

  aksi.append(semat, hapus);
  kartu.append(mk, judul, tanggal, aksi);
  return kartu;
}

export function PesanKosong(teks) {
  const pesan = document.createElement('p');
  pesan.className = 'kosong';
  pesan.textContent = teks;
  return pesan;
}
