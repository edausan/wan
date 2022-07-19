import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const useResize = ({ quality = 1 }) => {
  const max_width = 620;
  const max_height = 620;
  const [resized, setResized] = useState(null);

  // useEffect(() => {
  //   console.log({ file });
  //   file?.type && processfile();
  // }, [file]);

  const processfile = (file) => {
    console.log('processfile');
    if (!/image/i.test(file?.type)) {
      alert('File ' + file?.name + ' is not an image.');
      return false;
    }

    // read the files
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function (event) {
      // blob stuff
      var blob = new Blob([event.target.result]); // create blob...
      window.URL = window.URL || window.webkitURL;
      var blobURL = window.URL.createObjectURL(blob); // and get it's URL

      // helper Image object
      var image = new Image();
      image.src = blobURL;
      console.log({ blobURL });
      //preview.appendChild(image); // preview commented out, I am using the canvas instead
      image.onload = function () {
        // have to wait till it's loaded
        var resized = resizeMe(image); // send it to canvas
        console.log({ resized });
        setResized(resized);
      };
    };
  };

  const resizeMe = (img) => {
    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > max_width) {
        //height *= max_width / width;
        height = Math.round((height *= max_width / width));
        width = max_width;
      }
    } else {
      if (height > max_height) {
        //width *= max_height / height;
        width = Math.round((width *= max_height / height));
        height = max_height;
      }
    }

    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL('image/webp', quality); // get the data from canvas as 70% JPG (can be also PNG, etc.)
  };

  return { resized, processfile };
};

useResize.protoTypes = {
  quality: PropTypes.number,
};

export default useResize;
