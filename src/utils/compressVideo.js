import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

const compressVideo = async (videoFile) => {
  await ffmpeg.load();

  // Write the file to memory
  ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(videoFile));

  // Run the FFmpeg command (this is just an example, adapt for your needs)
  await ffmpeg.run('-i', 'test.mp4', 'output.avi');

  // Read the result
  const data = ffmpeg.FS('readFile', 'output.avi');

  // Convert it to a Blob and return
  return new Blob([data.buffer], { type: 'video/avi' });
};

export default compressVideo;
