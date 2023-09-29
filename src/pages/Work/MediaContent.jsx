import { UploadIcon } from '../../components/Icons/UploadIcon';

export function MediaContent({ handleFileEvent, mediaRef }) {
  return (
    <>
      <div className="text-area-input max-w-[722px]">
        Please upload media only related to work. You can add combination of images and videos.You
        can upload up to 15 media.
      </div>
      <div className="mt-4">
        <div
          className="py-[16px] w-[240px] border-dashed border border-blueprimary rounded-lg cursor-pointer text-center"
          onClick={() => mediaRef.current.click()}
          label="Attach Document"
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">
              <UploadIcon />
            </span>
            <span className="upload-btn">Upload jpg/pdf</span>
          </div>
          <input
            className="hidden"
            id="attach-document"
            multiple
            ref={mediaRef}
            type="file"
            onChange={handleFileEvent}
          />
        </div>
      </div>
    </>
  );
}
