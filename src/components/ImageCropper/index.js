import React, { useState } from 'react';
import { useRef } from 'react';
import ReactCrop from 'react-image-crop';
import { LANG } from '../../constants/lang';
import 'react-image-crop/dist/ReactCrop.css';
import './styled.scss';
import { Button } from '../common/Button';

const AddImageCrop = ({ getImage, setCropedImage, setModal, setCropImageFile }) => {
  const imgRef = useRef(null);
  const prevRef = useRef(null);
  const { LANG_UPLOAD, LANG_CROP } = LANG;

  const [crop, setCrop] = useState({
    unit: 'px',
    x: 75,
    y: 75,
    width: 150,
    height: 150,
  });
  const [resultImage, setResultImage] = useState(null);

  async function canvasPreviewData() {
    let image = imgRef.current;
    let canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    ctx.save();

    ctx.restore();

    const base64Image = canvas.toDataURL('image/jpeg');
    setResultImage(base64Image);
  }
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime,
    });
  };

  const handleUpload = async () => {
    setCropedImage(resultImage);
    setCropImageFile(dataURLtoFile(resultImage, 'profile.jpeg'));
    setResultImage(null);
    setModal(false);
  };

  return (
    <div className="croper-wrap">
      <div className="crop-box">
        <div>
          {resultImage ? (
            <div className="result-image">
              <img className="preview-image" ref={prevRef} src={resultImage} />
            </div>
          ) : (
            <div className="image-cropper">
              <ReactCrop
                src={getImage}
                aspect={1}
                ruleOfThirds
                crop={crop}
                onChange={(c) => setCrop(c)}
                style={{
                  maxWidth: '500px',
                  maxHeight: '284px',
                }}
              >
                <img height="284px" ref={imgRef} src={getImage} />
              </ReactCrop>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center px-9 w-full">
        <Button
          showArrowIcon={false}
          onClick={() => (resultImage ? handleUpload() : canvasPreviewData())}
          label={resultImage ? LANG_UPLOAD : LANG_CROP}
        />
      </div>
    </div>
  );
};

export default AddImageCrop;
