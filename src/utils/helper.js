export const getFileExtension = (name) => {
  const fileNameSegments = name.split('.');

  // If the file has an extension (at least one dot in the name)
  const fileExtension = fileNameSegments.length > 1 ? fileNameSegments.pop() : null;

  return fileExtension;
};

export const getHTML = (text) => text.replace(/(\n)/g, '<br />');

export function getFileName(filePathOrUrl) {
  // Split the string by '/' to get the parts
  const parts = filePathOrUrl?.split('/');

  // Get the last part (which may include query parameters)
  const lastPart = parts?.[parts?.length - 1];

  // Use a regular expression to extract the file name
  const match = lastPart?.match(/([^?#]+)/);

  if (match) {
    // Return the extracted file name
    return match?.[1];
  }

  // If no match is found, return the last part as is
  return lastPart;
}
