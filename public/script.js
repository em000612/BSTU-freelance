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
  if (width <= 320) return 1;
  if (width <= 768) return 4;
  return 6;
}

function shuffleArray(arr) {
  //для случайного перемешивания массива
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
  }
}

function rotateCards(direction = 'left') {
  if (isAnimating) return;
  isAnimating = true;

  const visibleCount = getVisibleCount();
  const service = document.querySelector('.btn-active').dataset.service;
  const data = cardData[service];

  // обновляетсяя индекс по направлению
  if (direction === 'left') {
    currentIndex = (currentIndex + visibleCount) % data.length;
  } else {
    currentIndex = (currentIndex - visibleCount + data.length) % data.length;
  }

  const gridContent = document.querySelector('.grid-content');
  const cards = document.querySelectorAll('.card-item');

  gridContent.classList.add('hidden');

  setTimeout(() => {
    for (let i = 0; i < cards.length; i++) {
      const dataIndex = (currentIndex + i) % data.length;
      cards[i].querySelector('.card-text').textContent = data[dataIndex].text;
      cards[i].querySelector('.card-image').src = data[dataIndex].img;
    }

    gridContent.classList.remove('hidden');
    isAnimating = false;
  }, 500);
}


document.querySelector('.arrow-container-left').addEventListener('click', () => {
  rotateCards('right');
});

document.querySelector('.arrow-container-right').addEventListener('click', () => {
  rotateCards('left');
});

document.querySelectorAll('.btn-economic').forEach(button => {
  button.addEventListener('click', (event) => {
    document.querySelectorAll('.btn-economic').forEach(btn => {
      btn.classList.remove('btn-active');
    });
    event.target.classList.add('btn-active');
  });
});

document.querySelector('.container').addEventListener('click', (event) => {
  if (event.target.classList.contains('btn')) {
    const service = event.target.dataset.service;

    //активный стиль кнопки
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-active'));
    event.target.classList.add('btn-active');

    //смена карточек с плавным перелистыванием
    updateCards(service);
  }
});

function updateCards(service) {
  const cards = document.querySelectorAll('.card-item');
  const newData = cardData[service];
  const gridContent = document.querySelector('.grid-content');

  //плавное исчезновение карточек
  gridContent.classList.add('hidden');

  //после 500мс сменить контент и показать снова
  setTimeout(() => {
    cards.forEach((card, i) => {
      const textEl = card.querySelector('.card-text');
      const imgEl = card.querySelector('.card-image');
      textEl.textContent = newData[i].text;
      imgEl.src = newData[i].img;
    });

    //плавно отображаются карточки обратно
    gridContent.classList.remove('hidden');
  }, 500);
}
