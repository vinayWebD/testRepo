import React, { useState } from 'react';
import InputProfilePicture from './InputProfilePicture';

const EditProfile = (props) => {
  const [cropImageFile, setCropImageFile] = useState(null);

  return (
    <form onSubmit={() => {}} className="flex w-full p-[18px] justify-center">
      <InputProfilePicture
        setCropImageFile={setCropImageFile}
        cropImageFile={cropImageFile}
        profilePic={props?.profilePictureUrl}
        width="!w-[100px]"
        height="!h-[100px]"
      />
    </form>
  );
};

export default EditProfile;
