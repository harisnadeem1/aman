const loveStartDate = new Date('2025-11-17T00:00:00');
const daysCount = document.getElementById('days-count');
const counterStartDate = document.getElementById('counter-start-date');

function updateCounter() {
  if (!daysCount || !counterStartDate) return;

  const now = new Date();
  const diff = now - loveStartDate;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

  daysCount.textContent = days.toString().padStart(3, '0');
  counterStartDate.textContent = loveStartDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

updateCounter();
setInterval(updateCounter, 60000);