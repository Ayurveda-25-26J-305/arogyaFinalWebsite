// Milestone dropdown filter
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('milestone-select');
  const milestones = document.querySelectorAll('.milestone');

  if (!select) return;

  select.addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === '0') {
      // Show all
      milestones.forEach(m => {
        m.classList.remove('fade-out');
        m.style.display = 'grid';
      });
      return;
    }

    // Highlight selected, fade others
    milestones.forEach(m => {
      if (m.dataset.id === value) {
        m.classList.remove('fade-out');
        m.style.display = 'grid';
        // Smooth scroll to the selected milestone
        setTimeout(() => {
          m.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        m.classList.add('fade-out');
      }
    });
  });
});