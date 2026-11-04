// main.js — titik masuk: memasang event formulir, pencarian, dan tombol kartu.
import { tambah, alihSemat, hapus } from './state.js';
import { render } from './ui.js';

const form = document.getElementById('form');
const inputJudul = document.getElementById('judul');
const inputMk = document.getElementById('mk');
const inputCari = document.getElementById('cari');
let kataCari = '';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const judul = inputJudul.value.trim();
  if (judul === '') return;
  tambah(judul, inputMk.value);
  inputJudul.value = '';
  render(kataCari);
});

inputCari.addEventListener('input', (e) => {
  kataCari = e.target.value;
  render(kataCari);
});

document.querySelector('main').addEventListener('click', (e) => {
  const tombol = e.target.closest('button[data-aksi]');
  if (!tombol) return;
  const id = Number(tombol.dataset.id);
  if (tombol.dataset.aksi === 'semat') {
    alihSemat(id);
  } else {
    if (!confirm('Hapus catatan ini?')) return;
    hapus(id);
  }
  render(kataCari);
});

render(kataCari);
