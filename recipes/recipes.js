window.onload = () => {
  document.querySelectorAll('.ingredients li').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (event.offsetX < 18) {
      element.classList.toggle('clicked');
    }
  });
});
}