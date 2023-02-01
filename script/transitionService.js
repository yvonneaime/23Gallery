/* startImageTransition will start the image transition process. */
function startImageTransition(className) {
  var images = document.getElementsByClassName(className);

  for (var i = 0; i < images.length; ++i) {
    images[i].style.opacity = 1;
  }

  var top = 1;
  var cur = images.length - 1;

  setInterval(changeImage, 4000);

  /* changeImage will select a new image given the index of images. */
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
    cur = nextImage;
  }

  /**
   * Parses a URL's path and returns it.
   * sparam {*} url = String
   */
  function parseURLPath(url){
    // https:// or http://
    let delimiter = "";
    if(url.includes("https")){
      delimiter = "https://"
    } else {
      delimiter = "http://"
    }

    let urlSplitArray = url.split(delimiter)
    if(urlSplitArray.length == 2){
      return urlSplitArray[1].substring(urlSplitArray[1].indexOf('/')+1)
    }
  }

  /* swapView will swap the image using -av (alternate view). */
  function swapView(imageSource) {
    let path = parseURLPath(imageSource);
    if (path.includes("-av."))  {
      return path.replace("-av.", ".");
    } else {
      return path.replace(".", "-av.");
    }
  }

  /* transition will swap the opacity of the image to showcase a 'flash' effect.*/
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
["pradafade", "kikifade"].forEach(className => 
  startImageTransition(className)
);