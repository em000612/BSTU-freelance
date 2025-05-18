let currentService = 'economic';

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

const cardItems = document.querySelectorAll('.grid-content .card-item');
const arrowLeft = document.querySelector('.arrow-container-left');
const arrowRight = document.querySelector('.arrow-container-right');

function getDisplayCount() {
  if (window.innerWidth >= 1024) return 6;
  if (window.innerWidth >= 768) return 4;
  return 1;
}

function redrawCards() {
  const count = getDisplayCount();
  const currentData = cardData[currentService].slice(0, count);

  cardItems.forEach((item, index) => {
    if (currentData[index]) {
      item.style.display = 'block';
      item.querySelector('p').textContent = currentData[index].text;
      item.querySelector('img').src = currentData[index].img;
    } else {
      item.style.display = 'none';
    }
  });
}

function shiftCards(direction) {
  const w = getDisplayCount();
  const data = cardData[currentService];

  if (direction === 'left') {
    cardData[currentService] = data.slice(w).concat(data.slice(0, w));
  } else if (direction === 'right') {
    cardData[currentService] = data.slice(-w).concat(data.slice(0, -w));
  }

  redrawCards();
}

function changeService(event) {
  if (!event.target.classList.contains('btn')) return;

  currentService = event.target.dataset.service;

  // Highlight active button
  document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.toggle('btn-active', btn.dataset.service === currentService);
  });

  redrawCards();
}

// Event listeners
document.querySelector('.container').addEventListener('click', changeService);
arrowLeft.addEventListener('click', () => shiftCards('left'));
arrowRight.addEventListener('click', () => shiftCards('right'));

// Initial draw
redrawCards();

// Optional: update on resize
window.addEventListener('resize', redrawCards);
