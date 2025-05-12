document.querySelectorAll('.btn-economic').forEach(button => {
  button.addEventListener('click', (event) => {
    document.querySelectorAll('.btn-economic').forEach(btn => {
      btn.classList.remove('btn-active');
    });
    event.target.classList.add('btn-active');
  });
});

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

    //плавно карточки обратно
    gridContent.classList.remove('hidden');
  }, 500);
}

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

