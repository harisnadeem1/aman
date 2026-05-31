const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

if (musicToggle && backgroundMusic) {
  let isPlaying = false;

  musicToggle.addEventListener('click', async () => {
    try {
      if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('is-playing');
        musicToggle.setAttribute('aria-label', 'Play music');
        musicToggle.setAttribute('aria-pressed', 'false');
      } else {
        await backgroundMusic.play();
        musicToggle.classList.add('is-playing');
        musicToggle.setAttribute('aria-label', 'Pause music');
        musicToggle.setAttribute('aria-pressed', 'true');
      }

      isPlaying = !isPlaying;
    } catch (error) {
      console.error('Music playback failed:', error);
    }
  });

  backgroundMusic.addEventListener('ended', () => {
    isPlaying = false;
    musicToggle.classList.remove('is-playing');
    musicToggle.setAttribute('aria-label', 'Play music');
    musicToggle.setAttribute('aria-pressed', 'false');
  });
}