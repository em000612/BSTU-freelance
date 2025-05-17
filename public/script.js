let isAnimating = false;
let currentIndex = 0;

const cardData = {
  economic: [
    { text: 'Website development', img: './assets/png/grid/1.png' },
    { text: 'Logo Design', img: './assets/png/grid/2.png' },
    { text: 'SEO', img: './assets/png/grid/3.png' },
    { text: 'Architecture & Interior Design', img: './assets/png/grid/4.png' },
    { text: 'Voice Over', img: './assets/png/grid/5.png' },
    { text: 'UGC Videos', img: './assets/png/grid/6.png' }
  ],
  it: [
    { text: 'UGC Videos', img: './assets/png/grid/6.png' },
    { text: 'Voice Over', img: './assets/png/grid/5.png' },
    { text: 'Architecture & Interior Design', img: './assets/png/grid/4.png' },
    { text: 'SEO', img: './assets/png/grid/3.png' },
    { text: 'Logo Design', img: './assets/png/grid/2.png' },
    { text: 'Website development', img: './assets/png/grid/1.png' }
  ]
};

function getVisibleCount() {
  const width = window.innerWidth;
  
  return 6; 
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateCardHTML(card) {
  return `
    <div class="card-item">
      <p class="card-text">${card.text}</p>
      <img class="card-image" src="${card.img}" alt="">
    </div>
  `;
}

function animateSlide(direction = 'left') {
  if (isAnimating) return;
  isAnimating = true;

  const visibleCount = getVisibleCount(); // 1, 4, or 6
  const service = document.querySelector('.btn-active').dataset.service;
  const data = cardData[service];
  let newData = [];

  if (visibleCount === 6) {

    newData = shuffleArray(data);
  } else if (visibleCount === 4) {
  
    const shuffled = shuffleArray(data);
    newData = shuffled.slice(0, 4);
  } else {
 
    if (direction === 'left') {
      currentIndex = (currentIndex + 1) % data.length;
    } else {
      currentIndex = (currentIndex - 1 + data.length) % data.length;
    }
    newData = [data[currentIndex]];
  }

  const gridContainer = document.querySelector('.grid-container');
  const original = document.querySelector('.grid-content');
  const clone = original.cloneNode(false);

  clone.classList.add('grid-content');
  clone.style.position = 'absolute';
  clone.style.top = '0';
  clone.style.left = '0';
  clone.style.width = '100%';
  clone.style.display = 'grid';
  clone.style.gridTemplateColumns = getComputedStyle(original).gridTemplateColumns;
  clone.style.transition = 'transform 0.5s ease-in-out';
  clone.style.transform = direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)';

 
  newData.forEach(card => clone.insertAdjacentHTML('beforeend', generateCardHTML(card)));
  gridContainer.appendChild(clone);

  requestAnimationFrame(() => {
    original.style.transition = 'transform 0.5s ease-in-out';
    original.style.transform = direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
    clone.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    original.remove();
    clone.removeAttribute('style');
    clone.classList.add('grid-content');
    isAnimating = false;
  }, 500);
}


document.querySelector('.arrow-container-left').addEventListener('click', () => {
  animateSlide('right');
});
document.querySelector('.arrow-container-right').addEventListener('click', () => {
  animateSlide('left');
});
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (event) => {
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('btn-active'));
    event.target.classList.add('btn-active');
    currentIndex = 0; 
    animateSlide();
  });
});


window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.btn-economic').classList.add('btn-active');
  animateSlide();
});


window.addEventListener('resize', () => {
  animateSlide(); 
});
