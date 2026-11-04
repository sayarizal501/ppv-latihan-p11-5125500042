// storage.js — satu-satunya modul yang membaca dan menulis localStorage.
const KUNCI = 'catatan-kuliah';

export function muat() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function simpan(catatan) {
  localStorage.setItem(KUNCI, JSON.stringify(catatan));
}
