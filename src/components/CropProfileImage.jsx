import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import Cropper from "react-easy-crop";
import cropStyle from "../styles/CropImage.module.css";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

export const CropProfileImage = ({ urlImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageConfirmation, setImageConfirmation] = useState(false);
  const navigate = useNavigate();
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (croppedImage !== null) {
      setImageConfirmation(true)
      let file = new File([croppedImage], "profile.jpg", {
        type: "image/jpeg",
      });

      const uploadImage = async (image) => {
        const files = image;
        const dataFile = new FormData();
        dataFile.append("file", files);
        dataFile.append("upload_preset", "EasyOrder_BD");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dypjcpbis/image/upload",
          {
            method: "POST",
            body: dataFile,
          }
        );

        const url = await res.json();

        localStorage.setItem('profileImage', url.secure_url)
        navigate("/CreateProfile")
      };

      uploadImage(file);
    }
  }, [croppedImage]);

  
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(urlImage, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  /**
   * Returns the new bounding area of a rotated rectangle.
   */
  function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  }

  /**
   * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
   */
  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  }

 return( 
    urlImage&&!imageConfirmation ? (
      <div className={cropStyle.globalContainerCrop}>
        <div className={cropStyle.containerCrop}>
          <Cropper
            image={urlImage}
            crop={crop}
            aspect={3 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                position: "relative",
                width: "80%",
                height: "100%",
                "background-color": "rgb(247, 247, 247)",
                "margin-top": "10%",
              },
            }}
          />
        </div>
        <p>Por favor arrastra la imagen hasta tener en el cuadrante la fracción que desee ver en su foto de perfil</p>

        <button onClick={showCroppedImage} className={cropStyle.aceptButton}>
          Aceptar
        </button>

      </div>
    ) : (
      <div className="containerSpin">
        <div className="spinner"></div>
      </div>
    )  
 )
};
