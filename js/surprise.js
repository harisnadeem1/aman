// Open modal on button click
const openBtn = document.getElementById('surprise-button');
const overlay = document.getElementById('promiseOverlay');
const closeBtn = document.getElementById('promiseClose');
const imageBtn = document.getElementById('promiseImageBtn');
const step1   = document.getElementById('promiseStep1');
const step2   = document.getElementById('promiseStep2');

function openModal() {
  overlay.removeAttribute('aria-hidden');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => {
    step1.classList.remove('promise-step-hidden');
    step2.classList.add('promise-step-hidden');
  }, 420);
}

if (openBtn)  openBtn.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Show image on second button click
if (imageBtn) {
  imageBtn.addEventListener('click', () => {
    step1.classList.add('promise-step-hidden');
    step2.classList.remove('promise-step-hidden');
    document.getElementById('promiseModal').scrollTop = 0;
  });
}

// Floating hearts on surprise section canvas
(function () {
  const canvas = document.getElementById('surpriseHeartsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let hearts = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createHeart() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 12 + 5,
      speed: Math.random() * 0.6 + 0.25,
      opacity: Math.random() * 0.45 + 0.45,
      drift: (Math.random() - 0.5) * 0.45,
    };
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    const grad = ctx.createRadialGradient(x, y - size * 0.3, size * 0.1, x, y - size * 0.3, size * 1.1);
    grad.addColorStop(0, 'rgba(244, 183, 217, 0.95)');
    grad.addColorStop(0.5, 'rgba(192, 132, 252, 0.9)');
    grad.addColorStop(1, 'rgba(139, 92, 246, 0.7)');
    ctx.fillStyle = grad;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 0.5;
    ctx.shadowColor = 'rgba(192,132,252,0.55)';
    ctx.shadowBlur = 8;
    ctx.translate(x, y);
    ctx.scale(size * 0.062, size * 0.062);
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.bezierCurveTo(-1, -10, -12, -10, -12, -1);
    ctx.bezierCurveTo(-12, 5, -6, 10, 0, 16);
    ctx.bezierCurveTo(6, 10, 12, 5, 12, -1);
    ctx.bezierCurveTo(12, -10, 1, -10, 0, -4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts = hearts.filter(h => h.y > -30);
    if (Math.random() < 0.04) hearts.push(createHeart());
    hearts.forEach(h => {
      h.y -= h.speed;
      h.x += h.drift;
      drawHeart(h.x, h.y, h.size, h.opacity);
    });
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  loop();
})();