const imageContentBlock = {
  image: "assets/banner.jpg",
  heading: "Heading 123",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  button: "Click Me 123",
  imageRight: true,
};

function initialise() {
  populateImageContentBlock();
}

function populateImageContentBlock() {
  if (imageContentBlock.imageRight) {
    document.getElementById('image-content-block').classList.add('image-content-block-right');
  }

  populateElementSrc('image-content-block-image', imageContentBlock.image);
  populateElementInnerText('image-content-block-content-heading', imageContentBlock.heading);
  populateElementInnerText('image-content-block-content-text', imageContentBlock.text);
  populateElementInnerText('image-content-block-content-button', imageContentBlock.button);
}

function populateElementInnerText(elementId, content) { 
  populateElementAttribute(elementId, 'innerText', content); 
}

function populateElementSrc(elementId, content) { 
  populateElementAttribute(elementId, 'src', content); 
}

function populateElementAttribute(elementId, attribute, content) {
  var element = document.getElementById(elementId);

  if (!element) {
    throw new Error("Element not found: " + elementId);
  }

  if (!content || content === '') {
    element.remove();
    return;
  }

  element[attribute] = content;
}

window.onload = initialise;