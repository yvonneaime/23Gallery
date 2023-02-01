/**
 * groupImages will group all the images based on their
 * keyword.
 * 
 * Note: Keywords must be added for new photos to be detected.
 */
function groupImages() {
    /**
     * readTextFile is responsible for reading the JSON file
     * from the localhost or server.
     */
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    /**
     * sendImage will send the image to the HTML using 
     * DOM manipulation.
     */
    function sendImage(elementId, imageArray){
        imageArray.forEach(image => {
            const div = document.getElementById(elementId);
            const img = document.createElement("img");
            img.src = `./images/fits/${image}`;
            div.appendChild(img)
            console.log("added", img.src)
        });
    }

    /**
     * startGrouping will start the grouping process for sending the images to their
     * respective div's. (e.g: aoki -> devon_aoki)
     * @param {*} key - Name of the div
     * @param {*} images - Image array from data.JSON
     */
    function startGrouping(key, images) {
        switch (key) {
            case "devon_aoki":
                sendImage(key, images)
                break;
            case "bella_hadid":
                sendImage(key, images)
                break;
            case "blumarine":
                sendImage(key, images)
                break;
            case "unknown_sources":
                sendImage(key, images)
                break;
        }
    }

    /**
     * Read the file in and start the grouping process.
     */
    readTextFile("../script/data.json", function (fitsData) {
        if (fitsData == null || fitsData == undefined) {
            return
        }
        for (let [key, value] of new Map(Object.entries(JSON.parse(fitsData)))) {
            startGrouping(key, shuffle(value));
        }
    });

}

/**
 * Shuffle will shuffle an array.
 * @param {*} array 
 * @returns 
 */
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
document.addEventListener('onload', groupImages())


