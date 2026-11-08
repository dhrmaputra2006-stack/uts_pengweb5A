// --- DATABASE 12 PRODUK (6 Ikan Hias & 6 Ikan Predator) ---
const products = [
  // 6 Ikan Hias
  { id: 1, name: "Cupang Halfmoon", category: "hias", price: 75000, image: "images/cupang.jpg" },
  { id: 2, name: "Guppy Tuxedo Mosaic", category: "hias", price: 35000, image: "images/guppy.jpg" },
  { id: 3, name: "Neon Tetra", category: "hias", price: 5000, image: "images/neon tetra.jpg" },
  { id: 4, name: "Discus Red Turquoise", category: "hias", price: 250000, image: "images/discus fish.jpg" },
  { id: 5, name: "Angelfish", category: "hias", price: 45000, image: "images/angel fish.jpg" },
  { id: 6, name: "Mas Koki Oranda Red", category: "hias", price: 90000, image: "images/mas koki.jpg" },
  
  // 6 Ikan Predator
  { id: 7, name: "Arwana Red", category: "predator", price: 350000, image: "images/Arowana fish.jpg" },
  { id: 8, name: "Channa Marulioides", category: "predator", price: 180000, image: "images/channa maruliodes.jpg" },
  { id: 9, name: "Peacock Bass Cichla", category: "predator", price: 220000, image: "images/peacock bass.jpg" },
  { id: 10, name: "Alligator Gar", category: "predator", price: 450000, image: "images/alligator gar.jpg" },
  { id: 11, name: "Tiger Datnoid", category: "predator", price: 300000, image: "images/tiger datnoid.jpg" },
  { id: 12, name: "Red Tail Catfish", category: "predator", price: 150000, image: "images/redtail catfish.jpg" }
];

let currentCategory = 'all';

// Format Mata Uang Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
}

// Render Produk Khusus untuk Halaman Katalog
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  if (!grid) return; // Hentikan jika tidak berada di halaman katalog

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 0;">Maaf, ikan yang Anda cari tidak ditemukan.</p>`;
    return;
  }

  grid.innerHTML = list.map(item => `
    <div class="product-card">
      <img src="${item.image}" alt="${item.name}" class="product-img">
      <div class="product-info">
        <span class="badge badge-${item.category}">${item.category === 'hias' ? 'Ikan Hias' : 'Ikan Predator'}</span>
        <h3 class="product-title">${item.name}</h3>
        <p class="product-price">${formatRupiah(item.price)}</p>
        <a href="order.html?product=${encodeURIComponent(item.name)}" class="btn-order-item">Pesan Sekarang</a>
      </div>
    </div>
  `).join('');
}

// Filter Berdasarkan Kategori
function setCategory(category, event) {
  currentCategory = category;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (event) event.target.classList.add('active');
  filterProducts();
}

// Live Search & Filter Gabungan
function filterProducts() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(item => {
    const matchCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchKeyword = item.name.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });
  renderProducts(filtered);
}

// Form Pemesanan via WhatsApp
function initOrderForm() {
  const orderForm = document.getElementById('orderForm');
  if (!orderForm) return;
}

// Form Pesan / Kontak
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah terkirim ke customer service PuFish.");
    e.target.reset();
  });
}

// Inisialisasi otomatis saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productGrid')) {
    renderProducts(products);
  }
  initOrderForm();
  initContactForm();
});