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