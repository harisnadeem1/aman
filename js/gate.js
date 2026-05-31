(function () {

  // ✏️ SET YOUR PASSWORD HERE
  const PASSWORD = 'phullu';

  const overlay   = document.getElementById('gateOverlay');
  const input     = document.getElementById('gateInput');
  const inputWrap = document.getElementById('gateInputWrap');
  const submitBtn = document.getElementById('gateSubmit');
  const errorMsg  = document.getElementById('gateError');
  const toggleBtn = document.getElementById('gateToggleBtn');
  const eyeShow   = document.querySelector('.eye-show');
  const eyeHide   = document.querySelector('.eye-hide');

  // Hide site content until unlocked
  document.body.style.overflow = 'hidden';

  function unlock() {
    errorMsg.textContent = '';
    overlay.classList.add('is-unlocking');
    document.body.style.overflow = '';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 600);
  }

  function tryPassword() {
    const val = input.value.trim();
    if (val === PASSWORD) {
      unlock();
    } else {
      errorMsg.textContent = 'Wrong password. Try again.';
      inputWrap.classList.add('is-error');
      input.value = '';
      setTimeout(() => inputWrap.classList.remove('is-error'), 500);
    }
  }

  submitBtn.addEventListener('click', tryPassword);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryPassword();
    if (inputWrap.classList.contains('is-error')) {
      inputWrap.classList.remove('is-error');
      errorMsg.textContent = '';
    }
  });

  // Show / hide password toggle
  toggleBtn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    eyeShow.style.display = isPassword ? 'none' : 'block';
    eyeHide.style.display = isPassword ? 'block' : 'none';
  });

  // Auto-focus input
  setTimeout(() => input.focus(), 300);

})();