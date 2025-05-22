let cardData = {
    economic: [
        { text: 'Website development', img: './assets/png/grid/1.png' },
        { text: 'Logo Design', img: './assets/png/grid/2.png' },
        { text: 'SEO', img: './assets/png/grid/3.png' },
        { text: 'Architecture & Interior Design', img: './assets/png/grid/4.png' },
        { text: 'Voice Over', img: './assets/png/grid/5.png' },
        { text: 'UGC Videos', img: './assets/png/grid/6.png' },

        { text: 'Logo Design', img: './assets/png/grid/2.png' },
        { text: 'Website development', img: './assets/png/grid/1.png' },
        { text: 'Voice Over', img: './assets/png/grid/5.png' },
        { text: 'SEO', img: './assets/png/grid/3.png' },
        { text: 'UGC Videos', img: './assets/png/grid/6.png' },
        { text: 'Architecture & Interior Design', img: './assets/png/grid/4.png' },
    ],
    it: [
        { text: 'UGC Videos', img: './assets/png/grid/6.png' },
        { text: 'Voice Over', img: './assets/png/grid/5.png' },
        { text: 'Architecture & Interior Design', img: './assets/png/grid/4.png' },
        { text: 'SEO', img: './assets/png/grid/3.png' },
        { text: 'Logo Design', img: './assets/png/grid/2.png' },
        { text: 'Website development', img: './assets/png/grid/1.png' },

        { text: 'Voice Over', img: './assets/png/grid/5.png' },
        { text: 'Website development', img: './assets/png/grid/1.png' },
        { text: 'UGC Videos', img: './assets/png/grid/6.png' },
        { text: 'Logo Design', img: './assets/png/grid/2.png' },
        { text: 'SEO', img: './assets/png/grid/3.png' },
        { text: 'Architecture & Interior Design', img: './assets/png/grid/4.png' },
    ]
};


const buttonsParent = document.getElementById("photo__buttons");
buttonsParent.children[0].classList.add('button_color');

const groups = ['economic', 'it'];
let selectedGroup = 'economic';

// меняет нажатость на кнопки над слайдером
function changeFocus(selected) {
    unclickOtherButtons();
    selected.classList.add('button_color');

    const selectedItemIndex = Array.from(buttonsParent.children).indexOf(selected);
    selectedGroup = groups[selectedItemIndex];
    redrawCard(centerSliderContainer);
}

function unclickOtherButtons() {
    Array.from(buttonsParent.children).forEach((_, index) => {
        buttonsParent.children[index].classList.remove('button_color');
    });
}

const selectedCards = cardData[selectedGroup];

// slider core
initalState();
function initalState() {

    const sliderLeftContainer = document.getElementById('slider-left-container');
    const sliderCenterContainer = document.getElementById('slider-center-container');
    const sliderRightContainer = document.getElementById('slider-right-container');

    const imagesPerContainer = window.innerWidth > 768 ? 6 : window.innerWidth > 320 ? 4 : 1;

    // левая страница слайдера
    const endOfArray = Array.from(cardData[selectedGroup].slice(imagesPerContainer));
    endOfArray.forEach((_, index) => {
        sliderLeftContainer.appendChild(
            createSliderImage(endOfArray[index])
        );
    });

    // центральная страница
    const startOfArray = Array.from(cardData[selectedGroup].slice(0, imagesPerContainer));
    startOfArray.forEach((_, index) => {
        sliderCenterContainer.appendChild(
            createSliderImage(startOfArray[index])
        );
    });

    // правая страница
    endOfArray.forEach((_, index) => {
        sliderRightContainer.appendChild(
            createSliderImage(endOfArray[index])
        );
    });

    const sliderWrapper = document.getElementById('photo__slider');
    // 260 - высота карточки, 64 - gap между карточками, 48 - 24 отступ сверху + 24 отступ снизу
    sliderWrapper.style.height = window.innerWidth > 320 ? 260 + 64 + 260 + 48 + 'px' : 260 + 48 + 'px';
}

window.addEventListener('resize', (_) => {
    const sliderWrapper = document.getElementById('photo__slider');
    sliderWrapper.style.height = window.innerWidth > 320 ? 260 + 64 + 260 + 48 + 'px' : 260 + 48 + 'px';
});

const leftSliderContainer = Array.from(document.getElementById('slider-left-container').children);
const centerSliderContainer = Array.from(document.getElementById('slider-center-container').children);
const rightSliderContainer = Array.from(document.getElementById('slider-right-container').children);

function redrawCard(array) {
    array.forEach((item, index) => {
        item.children[1].src = cardData[selectedGroup][index].img;
        item.children[0].innerText = cardData[selectedGroup][index].text;
    });
}

function createSliderImage(imageObj) {
    const card = document.createElement("div");
    card.className = 'card-item';

    const cardText = document.createElement("p");
    cardText.className = 'card-text';
    cardText.textContent = imageObj.text;

    const image = document.createElement("img");
    image.className = 'card-image';
    image.src = imageObj.img;

    card.appendChild(cardText);
    card.appendChild(image);

    return card;
}



// slider controls
const sliderLeftControls = document.getElementById('slider-controls-left');
const sliderRightControls = document.getElementById('slider-controls-right');

sliderLeftControls.addEventListener('click', slideLeft);
sliderRightControls.addEventListener('click', slideRight);

const slider = document.getElementById('photo__content');
slider.addEventListener('animationend', () => {
    redrawCard(centerSliderContainer);

    slider.classList.remove('slide-container-left');
    slider.classList.remove('slide-container-right');

    sliderLeftControls.addEventListener('click', slideLeft);
    sliderRightControls.addEventListener('click', slideRight);
});


function slideLeft() {
    sliderLeftControls.removeEventListener('click', slideLeft);
    sliderRightControls.removeEventListener('click', slideRight);

    slider.classList.add('slide-container-left');

    changeImagesWhenLeft();

    redrawCard(leftSliderContainer);
}

function slideRight() {
    sliderLeftControls.removeEventListener('click', slideLeft);
    sliderRightControls.removeEventListener('click', slideRight);

    slider.classList.add('slide-container-right');

    changeImagesWhenRight();

    redrawCard(rightSliderContainer);
}

function changeImagesWhenLeft() {
    const imagesPerContainer = window.innerWidth > 768 ? 6 : window.innerWidth > 320 ? 4 : 1;

    const startOfArray = cardData[selectedGroup].slice(0, imagesPerContainer);
    const endOfArray = cardData[selectedGroup].slice(imagesPerContainer);

    cardData[selectedGroup] = endOfArray.concat(startOfArray);
}

function changeImagesWhenRight() {
    const imagesPerContainer = window.innerWidth > 768 ? 6 : window.innerWidth > 320 ? 4 : 1;

    const startOfArray = cardData[selectedGroup].slice(0, -imagesPerContainer);
    const endOfArray = cardData[selectedGroup].slice(-imagesPerContainer);

    cardData[selectedGroup] = endOfArray.concat(startOfArray);
}