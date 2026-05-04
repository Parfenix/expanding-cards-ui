const panels = document.querySelectorAll('.panel');
const body = document.body;

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('active');

    const bg = panel.getAttribute('data-bg');
    setBackground(bg);
  })
})

const removeActiveClasses = () => {
  panels.forEach((panel) => {
    panel.classList.remove('active');
  })
};

document.addEventListener('keydown', (e) => {
  const activeIndex = [...panels].findIndex(p => p.classList.contains('active'));

  if (e.key === 'ArrowRight') {
    const next = (activeIndex + 1) % panels.length;
    switchPanel(next);
  }

  if (e.key === 'ArrowLeft') {
    const prev = (activeIndex - 1 + panels.length) % panels.length;
    switchPanel(prev);
  }
});

function switchPanel(index) {
  removeActiveClasses();
  panels[index].classList.add('active');

  const bg = panels[index].getAttribute('data-bg');
  setBackground(bg);
}

function setBackground(bg) {
  const overlay = document.createElement('div');

  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = bg;
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.6s ease';

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });

  setTimeout(() => {
    document.body.style.background = bg;
    overlay.remove();
  }, 600);
}