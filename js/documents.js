// Documents filter
document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.doc-card');

  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;

      // Update active pill
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('fade-out');
          card.style.display = 'grid';
        } else {
          card.classList.add('fade-out');
          // Hide after fade animation
          setTimeout(() => {
            if (card.classList.contains('fade-out')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
});