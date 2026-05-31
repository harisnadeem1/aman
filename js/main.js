const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  if (!item.classList.contains('visible')) observer.observe(item);
});


(function () {
  const canvas = document.getElementById('letterHeartsCanvas');
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
      size: Math.random() * 10 + 5,
      speed: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.45 + 0.45,
      drift: (Math.random() - 0.5) * 0.5,
    };
  }

  function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;

  // Soft pink-purple gradient fill
  const grad = ctx.createRadialGradient(x, y - size * 0.3, size * 0.1, x, y - size * 0.3, size * 1.1);
  grad.addColorStop(0, 'rgba(244, 183, 217, 0.95)');
  grad.addColorStop(0.5, 'rgba(192, 132, 252, 0.9)');
  grad.addColorStop(1, 'rgba(139, 92, 246, 0.7)');

  ctx.fillStyle = grad;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 0.5;

  // Clean smooth heart using scale + standard path
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

    // Remove hearts that left the top
    hearts = hearts.filter(h => h.y > -30);

    // Always spawn — no limit, just control density with probability
    if (Math.random() < 0.02) {
  hearts.push(createHeart());
}

    // Move and draw all hearts
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