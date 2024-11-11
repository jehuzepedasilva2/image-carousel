const frame = document.querySelector('.images');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotContainer = document.querySelector('.dots');

function images() {
  const images = ['./imgs/beach-01.jpg', './imgs/beach-02.jpg', './imgs/beach-03.jpeg', './imgs/beach-04.jpg'];
  const currentImage = document.querySelector('.current-image')
  
  function getImages() {
    return images;
  }

  function updateImages(imageURL) {
    images.push(imageURL);
  }

  function getLength() {
    return images.length;
  }

  function getCurrentImage() {
    return currentImage;
  }

  function setCurrentImage(src, i) {
    const previousIndex = currentImage.classList[1];
    currentImage.src = src;
    currentImage.classList.remove(previousIndex)
    currentImage.classList.add(`${i}`);
  }

  function getCurrentImageIndex() {
    return currentImage.classList[1];

  }

  return {
    getImages,
    updateImages,
    getLength,
    getCurrentImage,
    setCurrentImage,
    getCurrentImageIndex
  }
}

function addDots() {
  for (let i = 0; i < images().getLength(); i++) {
    const dot = document.createElement('div');
    if (i == 0) {
      dot.classList.add("active");
    }
    dot.classList.add('dot', `dot-${i}`);
    dotContainer.appendChild(dot);
  }
}

function removeDotActiveClass(i) {
  const dot = document.querySelector(`.dot-${i}`);
  dot.classList.remove("active");
}

function updateDots(imageIndex) {
  const dot = document.querySelector(`.dot-${imageIndex}`);
  removeDotActiveClass(images().getCurrentImageIndex());
  dot.classList.add("active");
}

function renderImage (i) {
  const imagesURL = images().getImages();
  i = i % (imagesURL.length);
  updateDots(i);
  images().setCurrentImage(imagesURL[i], i);
}

function handleNextPrev () {
  let curr = 0;

  nextBtn.addEventListener('click', () => {
    renderImage(++curr);
  })

  prevBtn.addEventListener('click', () => {
    renderImage(--curr);
  })

}

function start () {
  handleNextPrev();
  addDots(images().getLength());
}

start();

