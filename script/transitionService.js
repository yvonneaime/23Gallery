/**
 *
 * startImageTransition will start the image transition process.
 *
 */
function startImageTransition() {
  var images = document.getElementsByClassName("fade");

  for (var i = 0; i < images.length; ++i) {
    images[i].style.opacity = 1;
  }

  var top = 1;
  var cur = images.length - 1;

  setInterval(changeImage, 1000);

  /**
   *
   * changeImage will select a new image given the index of images.
   *
   */
  async function changeImage() {
    var nextImage = (1 + cur) % images.length;
    images[cur].style.zIndex = top + 1;
    images[nextImage].style.zIndex = top;
    await transition();
    images[cur].style.zIndex = top;
    images[nextImage].style.zIndex = top + 1;
    top = top + 1;
    images[cur].style.opacity = 1;
    images[nextImage].src = swapView(images[cur].src);
  }

  /**
   *
   * swapView will swap the image using -av (alternate view).
   *
   */
  function swapView(imageSource) {
    if (imageSource.includes("-av")) {
      return imageSource.replace("-av", "");
    } else {
      return imageSource.replace(".", "-av.");
    }
  }

  /**
   * transition will swap the opacity of the image to showcase a 'flash' effect.
   *
   */
  function transition() {
    return new Promise(function (resolve, reject) {
      var del = 0.01;

      var id = setInterval(changeOpacity, 10);

      function changeOpacity() {
        images[cur].style.opacity -= del;
        if (images[cur].style.opacity <= 0) {
          clearInterval(id);
          resolve();
        }
      }
    });
  }
}
startImageTransition();
