export const getFileExtension = (name) => {
  const fileNameSegments = name.split('.');

  // If the file has an extension (at least one dot in the name)
  const fileExtension = fileNameSegments.length > 1 ? fileNameSegments.pop() : null;

  return fileExtension;
};
