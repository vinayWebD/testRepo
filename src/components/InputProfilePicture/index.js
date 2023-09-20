import React, { useState } from 'react';
// import { Avatar } from '@mui/material';
// import { IMAGE_FILE } from '../../constants/constants';
import { useRef } from 'react';
import ImageCropper from '../ImageCropper/index';
import heic2any from 'heic2any';
import Modal from '../Modal';
import { CameraIcon } from '../Icons/CameraIcon';
import { UserIcon } from '../Icons/UserIcon';

const InputProfilePicture = ({ value, profilePic, setCropImageFile, inView = true }) => {
  const [imageFile, setImageFile] = useState(false);
  const [open, setOpen] = useState(false);
  const [cropedImage, setCropedImage] = useState('');
  const inputRef = useRef();
  // const { IMAGE_ACCEPT, IMAGE_TYPE } = IMAGE_FILE;
  // const { errorToast: { TST_INVALID_IMAGE = '' } = {} } = toastMessages;

  const handleChange = (e) => {
    const { files: [file] = [] } = e.target || value;

    if (file && file.type) {
      const ext = file.type.split('/')[1];
      // if (!IMAGE_TYPE.includes(ext)) {
      //   return ToastNotifyError(TST_INVALID_IMAGE);
      // }
      if (ext !== '') {
        const reader = new FileReader();
        if (ext === 'heic') {
          reader.onload = async (e) => {
            try {
              const arrayBuffer = e.target.result;
              const convertedImage = await heic2any({
                blob: new Blob([new Uint8Array(arrayBuffer)]),
                toType: 'image/jpeg', // Convert HEIC to JPEG
              });

              setOpen(true);
              setImageFile(URL.createObjectURL(convertedImage));
            } catch (error) {
              console.error('Error converting HEIC file:', error);
            }
          };
          reader.readAsArrayBuffer(file);
        } else {
          reader.onloadend = function () {
            setImageFile(reader.result);
          };
          reader.readAsDataURL(e.target.files[0]);
          setOpen(true);
          setImageFile(e.target.files[0]);
        }
      }
    }
  };

  const renderProfile = () => {
    if (cropedImage) {
      return <img src={cropedImage} alt="" className="image_preview" />;
    } else if (profilePic) {
      return <img src={profilePic} alt="" className="image_preview" />;
    }
    return (
      <div className="flex items-center justify-center image_preview">
        <UserIcon />
      </div>
    );
  };

  const handleImageClick = () => {
    inputRef.current.value = '';
  };

  return (
    <>
      <div className="profile-image">
        {renderProfile()}
        {inView && (
          <div className="absolute right-[2px] bottom-[2px]">
            <label htmlFor="upload-button" onClick={handleImageClick} className="cursor-pointer ">
              <CameraIcon />
            </label>
            <input
              type="file"
              id="upload-button"
              style={{ display: 'none' }}
              onChange={handleChange}
              accept={'.jpg,.jpeg,.png ,.heic,.webp'}
              ref={inputRef}
            />
          </div>
        )}
      </div>
      <Modal isOpen={open} title="Profile Image">
        <ImageCropper
          getImage={imageFile}
          setCropedImage={setCropedImage}
          setModal={setOpen}
          setCropImageFile={setCropImageFile}
        />
      </Modal>
    </>
  );
};

export default InputProfilePicture;
