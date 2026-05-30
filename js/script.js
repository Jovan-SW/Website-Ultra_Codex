const navbarNav = document.querySelector ('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').
onclick = () => {
    navbarNav.classList.toggle('active');
};
// klik diluar sidebar untuk menghilangkan hamburger menu
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

//Ultraman kaiju info 
//Modal
const cards = document.querySelectorAll('.card-list');
const details = document.querySelectorAll('.detail');

// Buat overlay
const overlay = document.createElement('div');
overlay.className = 'modal-overlay';
document.body.appendChild(overlay);

// Buat modal container
const modal = document.createElement('div');
modal.className = 'modal-container';
document.body.appendChild(modal);

// Buat tombol X
const btnClose = document.createElement('button');
btnClose.className = 'btn-close-detail';
btnClose.innerHTML = '✕';
modal.appendChild(btnClose);

// Buat modal content wrapper
const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modal.appendChild(modalContent);

function openModal(detail) {
  if (!detail) return;
  modalContent.innerHTML = detail.innerHTML;

  // Reset iframe supaya video load ulang dengan benar
  const iframe = modalContent.querySelector('iframe');
  if (iframe) {
    const src = iframe.getAttribute('src');
    iframe.setAttribute('src', '');
    iframe.setAttribute('src', src);
  }

  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  // Stop video saat modal ditutup
  const iframe = modalContent.querySelector('iframe');
  if (iframe) iframe.setAttribute('src', '');

  modal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  cards.forEach(c => c.classList.remove('active'));
}

// Klik card
cards.forEach(card => {
  card.addEventListener('click', () => {
    const target = card.getAttribute('data-target');
    const detail = document.getElementById(target);

    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    openModal(detail);
  });
});

// Klik X
btnClose.addEventListener('click', closeModal);

// Klik overlay = tutup
overlay.addEventListener('click', closeModal);

// Tekan ESC = tutup
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Search bar
document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambil elemen input dan semua kartu
  const searchInput = document.querySelector('.search-wrapper input');
  const cards = document.querySelectorAll('.card-list'); // Pastikan kartu kamu punya class "card"

  // 2.(langsung jalan saat ngetik)
  searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase(); // Ambil teks & ubah ke huruf kecil

      cards.forEach(card => {

          const itemName = card.querySelector('.card-title').textContent.toLowerCase();

          //Filter: Cek apakah nama mengandung kata yang diketik
          if (itemName.includes(searchTerm)) {
              card.style.display = ""; // Munculkan jika cocok
          } else {
              card.style.display = "none";  // Sembunyikan jika tidak cocok
          }
      });
  });
});
