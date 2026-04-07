/* ═══════════════════════════════════════════════════════════════
   NACIYE DUYGU — gallery.js
   Lightbox + Filtre
   ═══════════════════════════════════════════════════════════════ */

// ── LİGHTBOX ─────────────────────────────────────────────────────
window.openLightbox = function(src, alt) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (!lb || !img) return;
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('lightbox-close')) return;
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') window.closeLightbox();
});

// ── GALERİ FİLTRE ─────────────────────────────────────────────────
const filterBtns = document.querySelectorAll('#filterBtns .pill');
const galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Aktif butonu güncelle
    filterBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const category = item.dataset.category;
      if (filter === 'all' || category === filter) {
        item.style.display = '';
        // Reveal animasyonu yeniden tetikle
        item.classList.remove('visible');
        setTimeout(() => item.classList.add('visible'), 50);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Sayfa yüklendiğinde tüm görselleri görünür yap
window.addEventListener('load', () => {
  galleryItems.forEach((item, i) => {
    setTimeout(() => item.classList.add('visible'), i * 80);
  });
});
