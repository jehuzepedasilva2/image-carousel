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
  console.log(i);
  const imagesURL = images().getImages();
  updateDots(i);
  images().setCurrentImage(imagesURL[i], i);
}

function index () {
  let i = 0;

  function getIndex() {
    return i;
  }

  function setIndex(x) {
    i = x;
  }

  function getAndAdvance(isIncrement=false) {
    if (isIncrement) {
      i = (i + 1) % (images().getLength());
    } else {
      i = (i - 1 + images().getLength()) % images().getLength();
    }
    return i;
  }

  return {
    getIndex, 
    setIndex, 
    getAndAdvance,
  }
}
function handleClickables () {
  const curr = index();

  nextBtn.addEventListener('click', () => {
    renderImage(curr.getAndAdvance(true))
  })

  prevBtn.addEventListener('click', () => {
    renderImage(curr.getAndAdvance())
  })

  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const dotIndex = dot.classList[1].split("-")[1];
      curr.setIndex(parseInt(dotIndex));
      renderImage(parseInt(dotIndex));
    })
  })

}

function start () {
  const pics = images();
  addDots(pics.getLength());
  handleClickables();
}

start();

