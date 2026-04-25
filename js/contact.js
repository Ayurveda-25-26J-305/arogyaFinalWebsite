// Contact form: build a mailto link from form data
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-template');
  const template = document.getElementById('email-template');

  // ============================================
  // Form submit -> open mail client with prefilled message
  // ============================================
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const topic = form.topic.value;
      const message = form.message.value.trim();

      // Reset previous errors
      form.querySelectorAll('.form-field').forEach(f => f.classList.remove('invalid'));
      form.querySelectorAll('.form-error').forEach(e => e.remove());

      let firstInvalid = null;

      const setError = (field, msg) => {
        const wrap = field.closest('.form-field');
        wrap.classList.add('invalid');
        const err = document.createElement('span');
        err.className = 'form-error';
        err.textContent = msg;
        wrap.appendChild(err);
        if (!firstInvalid) firstInvalid = field;
      };

      if (!name) setError(form.name, 'Please enter your name.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setError(form.email, 'Please enter a valid email.');
      if (!topic) setError(form.topic, 'Please select a topic.');
      if (!message) setError(form.message, 'Please write a message.');

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Map topic value to readable label
      const topicLabels = {
        'general': 'General Inquiry',
        'research': 'Research Collaboration',
        'disease': 'Disease Prediction Module',
        'medicine': 'Medicine Recommendation Module',
        'diet': 'Dietary Planning Module',
        'qa': 'Q&A Module',
        'other': 'Other'
      };

      const subject = `[Arogya] ${topicLabels[topic] || topic} — ${name}`;
      const body = `Hello Arogya Team,\n\n${message}\n\n—\nFrom: ${name}\nEmail: ${email}`;

      const mailto = `mailto:ayurvedaai.team@my.sliit.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }

  // ============================================
  // Copy template button
  // ============================================
  if (copyBtn && template) {
    copyBtn.addEventListener('click', async () => {
      const text = template.textContent;
      try {
        await navigator.clipboard.writeText(text);
        const span = copyBtn.querySelector('span');
        const original = span.textContent;
        copyBtn.classList.add('copied');
        span.textContent = 'Copied ✓';
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          span.textContent = original;
        }, 2000);
      } catch (err) {
        // Fallback: select text manually
        const range = document.createRange();
        range.selectNode(template);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    });
  }
});