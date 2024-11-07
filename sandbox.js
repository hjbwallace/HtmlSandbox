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
}

function initialiseSliders() {
  const sliders = document.querySelectorAll('.banner-slider');
  sliders.forEach(slider => initialiseSlider(slider));
}

function initialiseSlider(sliderElement) {
  const slides = sliderElement.querySelectorAll('.banner-slide');

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
    slides[previousSlideIndex].classList.remove('previous');
    slides[nextSlideIndex].classList.remove('next');

    clearInterval(slideTimer);
    slideTimer = setInterval(() => transitionSlide(1), 5000);

    if (direction !== 0) {
      var outClass = direction === -1 ? 'out-previous' : 'out-next';
      currentSlide.classList.add(outClass);  
      setTimeout(() => currentSlide.classList.remove(outClass), 500);
    }
    
    // Calculate the index of the slides after the transition
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
    previousSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    nextSlideIndex = (currentSlideIndex + 1 + slides.length) % slides.length;

    // Set classes for the new relative slides
    slides[currentSlideIndex].classList.add('active');
    slides[previousSlideIndex].classList.add('previous');
    slides[nextSlideIndex].classList.add('next');
  }

  // Add event listeners to navigate slides
  sliderElement.querySelector('.previous-button').addEventListener('click', () => transitionSlide(-1));
  sliderElement.querySelector('.next-button').addEventListener('click', () => transitionSlide(1));
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

window.onload = initialise;