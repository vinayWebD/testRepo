import { useState } from 'react';
import { Button } from '../../components/common/Button';
import { UploadIcon } from '../../components/Icons/UploadIcon';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';

export function CertificateContent({ mediaRef, handleFileEvent }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <InputBox label="Title" placeholder="Enter Title" />
        <InputBox label="Institution" placeholder="Enter Institution" />
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <InputBox
              type="number"
              placeholder="Select Year"
              min="1900"
              max="2099"
              step="1"
              label="Year"
            />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2 pb-6">
        <div>
          <label style={{ color: '#333' }}>Upload Media</label>
          <div
            className="py-[16px] col-span-1 border-dashed border border-customGray rounded-lg cursor-pointer"
            onClick={() => mediaRef.current.click()}
            label="Attach Document"
          >
            <div className="flex items-center justify-center">
              <span className="mr-2">
                <UploadIcon fill="#A1A0A0" />
              </span>
              <span className="upload-btn-gray bg-customGray">Upload jpg/pdf</span>
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
      </div>
      <Modal
        isTitle={true}
        title="Edit Education"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
      >
        <>
          <div className="px-6">
            <div className="pb-6">
              <InputBox label="Title" placeholder="Enter Title" />
            </div>
            <div className="pb-6">
              <InputBox label="Institution" placeholder="Enter Institution" />
            </div>
            <div className="pb-6">
              <InputBox
                type="number"
                placeholder="Select Year"
                min="1900"
                max="2099"
                step="1"
                label="Year"
              />
            </div>
            <div className="grid gap-4 pb-4">
              <div>
                <label style={{ color: '#333' }}>Upload Media</label>
                <div
                  className="py-[16px] col-span-1 border-dashed border border-customGray rounded-lg cursor-pointer"
                  onClick={() => mediaRef.current.click()}
                  label="Attach Document"
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">
                      <UploadIcon fill="#A1A0A0" />
                    </span>
                    <span className="upload-btn-gray bg-customGray">Upload jpg/pdf</span>
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
            </div>
          </div>
          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end pt-6 pb-5 px-6">
            <Button label="Save" showArrowIcon={false} />
          </div>
        </>
      </Modal>
    </>
  );
}
