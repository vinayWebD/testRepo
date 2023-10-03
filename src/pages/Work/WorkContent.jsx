import { useRef, useState } from 'react';
import Accordion from '../../components/Accordion';
import BlueDivider from '../../components/common/BlueDivider';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { BookIcon } from '../../components/Icons/BookIcon';
import { CertificateIcon } from '../../components/Icons/CertificateIcon';
import { ExperienceIcon } from '../../components/Icons/ExperienceIcon';
import { MediaIcon } from '../../components/Icons/MediaIcon';
import InputBox from '../../components/InputBox';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import { CertificateContent } from './CertificateContent';
import { EducationContent } from './EducationContent';
import { ExperienceContent } from './ExperienceContent';
import { MediaContent } from './MediaContent';

export function WorkContent() {
  const ref = useRef();
  const [career, setCareer] = useState('');
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  return (
    <div className="py-[36px] px-[70px] bg-bluebg">
      <div className="tab-content-title">So far so good. Let’s talk about your work</div>
      <div className="tab-content-subtitle">We use this info for better reach.</div>

      <div className="flex items-center mt-8 mb-5">
        <div className="w-[170px] form-title">About work</div>
        <div className="grow">
          <TextArea height="h-[160px]" placeholder="Enter Description" />
        </div>
      </div>
      <div className="mb-8 flex justify-between">
        <div className="step-title">
          Career
          <BlueDivider />
        </div>
        <OutlinedButton
          disabled={career}
          label="Add Career"
          Icon={<AddBlueIcon />}
          IconDisabled={<AddBlueIcon fill="#D1D1D1" />}
        />
      </div>

      <div className="flex items-center mt-8 mb-5">
        <div className="w-[170px] form-title">Career Title</div>
        <div className="grow">
          <TextArea
            width="w-full md:w-[500px]"
            placeholder="Enter Title"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Accordion
          items={[
            {
              icon: <MediaIcon />,
              title: 'Media',
              content: <MediaContent mediaRef={ref} />,
            },

            {
              icon: <ExperienceIcon />,
              title: 'Experience',
              content: <ExperienceContent />,
            },
            {
              icon: <BookIcon />,
              title: 'Education',
              content: <EducationContent />,
            },

            {
              icon: <CertificateIcon />,
              title: 'Certifications',
              content: <CertificateContent mediaRef={ref} />,
            },
          ]}
        />
        <div className="mt-[36px] flex justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <div>
              <OutlinedButton
                label="Add Links"
                Icon={<AddBlueIcon />}
                onClick={() => setIsLinksModalOpen(true)}
              />
            </div>
            <div>
              <OutlinedButton
                label="Add Skills"
                Icon={<AddBlueIcon />}
                onClick={() => setIsSkillModalOpen(true)}
              />
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <div>
              <OutlinedButton label="Skip" isSkip={true} />
            </div>
            <div>
              <Button label="Save" showArrowIcon={false} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isTitle={true}
        title="Add Links"
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
      >
        <>
          <div className="px-6">
            <div className="pb-6">
              <InputBox label="Domain" placeholder="Enter Domain" />
            </div>
            <div className="pb-4">
              <InputBox label="URL" placeholder="https://" />
            </div>
            <div className="grid justify-items-end pb-4">
              <OutlinedButton label="Add New" showArrowIcon={false} />
            </div>
          </div>

          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end pt-6 pb-5 px-6">
            <Button label="Save" showArrowIcon={false} />
          </div>
        </>
      </Modal>
      <Modal
        isTitle={true}
        title="Add Skills"
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        width="max-w-[472px]"
        padding={0}
      >
        <>
          <div className="px-6">
            <div className="pb-6">
              <InputBox label="Skill" placeholder="Enter Skill" />
            </div>
          </div>

          <div className="bg-greymedium h-[1px] w-full" />
          <div className="grid justify-items-end pt-6 pb-5 px-6">
            <Button label="Save" showArrowIcon={false} />
          </div>
        </>
      </Modal>
    </div>
  );
}
