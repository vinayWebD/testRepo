import compressor from 'compressorjs';

/**
 * Compress image to reduce the file size and dimension
 * @param {*} param0
 * @returns a compressed file
 */
const compressImage = ({ file, quality = 0.8 }) => {
  return new Promise((resolve) => {
    try {
      new compressor(file, {
        quality: quality,
        maxWidth: 4096,
        maxHeight: 1280,

        success(compressedFile) {
          if (compressedFile instanceof File) {
            return resolve(compressedFile);
          } else {
            const compressedFileFromBlob = new File([compressedFile], file.name, {
              type: compressedFile.type,
            });
            return resolve(compressedFileFromBlob);
          }
        },
        error(err) {
          console.log(err.message);
        },
      });
    } catch (error) {
      console.log(error.message);
      resolve();
    }
  });
};

export default compressImage;
