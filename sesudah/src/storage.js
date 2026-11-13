// storage.js — satu-satunya modul yang membaca dan menulis localStorage.
export const KUNCI = 'catatan-kuliah:v1';
const KUNCI_LAMA = 'catatan-kuliah';
const PESAN_BLOKIR = 'Penyimpanan browser tidak tersedia; perubahan hanya tersimpan di memori.';

let cadangan = [];
let pesan = '';

export function statusPenyimpanan() {
  return pesan;
}

const sah = (c) =>
  c !== null && typeof c === 'object' &&
  typeof c.id === 'number' &&
  typeof c.judul === 'string' && c.judul.trim() !== '' &&
  typeof c.mk === 'string' &&
  typeof c.dibuat === 'string' && !Number.isNaN(Date.parse(c.dibuat)) &&
  typeof c.disematkan === 'boolean';

function bersihkan(data) {
  return Array.isArray(data) ? data.filter(sah) : [];
}

export function muat() {
  let isi;
  try {
    isi = localStorage.getItem(KUNCI);
  } catch {
    pesan = PESAN_BLOKIR;
    return cadangan;
  }

  if (isi === null) {
    // Migrasi sekali jalan dari kunci monolit P11 bila ada.
    try {
      const lama = localStorage.getItem(KUNCI_LAMA);
      if (lama !== null) {
        const data = bersihkan(JSON.parse(lama));
        simpan(data);
        localStorage.removeItem(KUNCI_LAMA);
        return data;
      }
    } catch { /* kunci lama tidak terbaca: anggap belum ada data */ }
    return cadangan;
  }

  try {
    const mentah = JSON.parse(isi);
    const data = bersihkan(mentah);
    cadangan = data;
    pesan = Array.isArray(mentah) && data.length === mentah.length
      ? '' : 'Sebagian data tersimpan rusak dan diabaikan.';
    return data;
  } catch {
    pesan = 'Data tersimpan rusak dan diabaikan.';
    return [];
  }
}

export function simpan(data) {
  cadangan = bersihkan(data);
  try {
    localStorage.setItem(KUNCI, JSON.stringify(cadangan));
    pesan = '';
    return true;
  } catch {
    pesan = PESAN_BLOKIR;
    return false;
  }
}
