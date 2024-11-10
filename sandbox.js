const data = {
  banner: "assets/banner.png",
  image: "assets/image.jpg",
  icon: "assets/icon.png",
  heading: "Heading",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  button: "Click Me",
  imageRight: true,
};

function initialise() {
  populateImageContentBlock();
  initialiseSliders();
  initialiseCarousels();
}

function initialiseSliders() {
  const sliders = document.querySelectorAll('.banner-slider');
  sliders.forEach(slider => initialiseSlider(slider));
}

function initialiseSlider(sliderElement) {
  const slides = sliderElement.querySelectorAll('.banner-slide');
  const canSelectPrevious = slides.length > 2;

  if (slides.length < 1) {
    return;
  }
  
  if (slides.length === 1) {
    // hide the previous and next button
    sliderElement.querySelector('.previous-button').remove();
    sliderElement.querySelector('.next-button').remove();
    slides[0].classList.add('active');
    return;
  }
  
  if (!canSelectPrevious) {
    sliderElement.querySelector('.previous-button').remove();
  } 

  // Set automatic transition to next slide every 5 seconds
  let slideTimer; 

  let currentSlideIndex = 0;
  let previousSlideIndex = 0;
  let nextSlideIndex = 0;

  // Initialize the first slide as active
  transitionSlide(0);

  function transitionSlide(direction) {
    // Remove classes from current relative slides
    var currentSlide = slides[currentSlideIndex];
    currentSlide.classList.remove('active');
    slides[previousSlideIndex].classList.remove('previous', 'out-previous', 'out-next');
    slides[nextSlideIndex].classList.remove('next', 'out-previous', 'out-next');

    clearInterval(slideTimer);
    slideTimer = setInterval(() => transitionSlide(1), 5000);

    if (direction !== 0) {
      var outClass = direction === -1 && canSelectPrevious ? 'out-previous' : 'out-next';
      currentSlide.classList.add(outClass);  
      setTimeout(() => currentSlide.classList.remove(outClass), 500);
    }
    
    // Calculate the index of the slides after the transition
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
    previousSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    nextSlideIndex = (currentSlideIndex + 1 + slides.length) % slides.length;

    // Set classes for the new relative slides
    slides[currentSlideIndex].classList.add('active');
    slides[nextSlideIndex].classList.add('next');
    
    if (canSelectPrevious) {
      slides[previousSlideIndex].classList.add('previous');
    }
  }

  // Add event listeners to navigate slides
  sliderElement.querySelector('.previous-button')?.addEventListener('click', () => transitionSlide(-1));
  sliderElement.querySelector('.next-button')?.addEventListener('click', () => transitionSlide(1));
}

function populateImageContentBlock() {
  if (data.imageRight) {
    document.getElementById('image-content-block').classList.add('image-content-block-right');
  }

  populateElementsInnerText('data-heading', data.heading);
  populateElementsInnerText('data-text', data.text);
  populateElementsInnerText('data-button', data.button);
  populateElementsSrc('data-image', data.image);
  populateElementsSrc('data-banner', data.banner);
  populateElementsSrc('data-icon', data.icon);
  populateElementsBackgroundImage('data-banner-background', data.banner);
}

function populateElementsInnerText(elementId, content) { 
  populateElementsAttribute(elementId, 'innerText', content); 
}

function populateElementsSrc(elementId, content) { 
  populateElementsAttribute(elementId, 'src', content); 
}

function populateElementsBackgroundImage(elementId, content) { 
  populateElementsAttribute(elementId, 'background-image', "url(" + content + ")", true); 
}

function populateElementsAttribute(className, attribute, content, isStyle = false) {
  var elements = document.getElementsByClassName(className);

  var updateFunc = !content || content === ''
    ? element => element.remove()
    : element => isStyle ? element.style[attribute] = content : element[attribute] = content;

  Array.prototype.forEach.call(elements, updateFunc);
}

function initialiseCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(initialiseCarousel);
}

function initialiseCarousel(carousel) {
  function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
      result += mod;
    }
    return result;
  }

  function handleNext() {
    var index = modulo(currentSlide + 1, numSlides);
    changeSlide(index);
  }

  function handlePrevious() {
    var index = modulo(currentSlide - 1, numSlides);
    changeSlide(index);
  }

  function changeSlide(index) {
    indicators[currentSlide].classList.remove('active');

    currentSlide = index;
    carousel.style.setProperty('--current-slide', index);

    clearInterval(slideTimer);
    slideTimer = setInterval(handleNext, 5000);
    indicators[index].classList.add('active');
  }

  function createIndicator(indicatorsElement, index) {
    const indicator = document.createElement('button');
    indicatorsElement.appendChild(indicator);

    indicator.classList.add('carousel-indicator');
    indicator.addEventListener('click', () => changeSlide(index));
    return indicator;
  }

  // get elements
  const buttonPrevious = carousel.querySelector('.carousel-button-previous');
  const buttonNext = carousel.querySelector('.carousel-button-next');
  const slidesElement = carousel.querySelector('.carousel-slides');
  const indicatorsElement = carousel.querySelector('.carousel-indicators');

  // carousel state
  let currentSlide = 0;
  let slideTimer; 
  const numSlides = slidesElement.children.length;

  // set up events
  buttonPrevious.addEventListener('click', handlePrevious);
  buttonNext.addEventListener('click', handleNext);

  // set up indicators
  for (let i = 0; i < numSlides; i++) {
    createIndicator(indicatorsElement, i);
  }
  const indicators = indicatorsElement.querySelectorAll('.carousel-indicator');

  changeSlide(0);
}

window.onload = initialise;