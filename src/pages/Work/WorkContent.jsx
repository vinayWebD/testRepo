import { useRef } from 'react';
import Accordion from '../../components/Accordion';
import BlueDivider from '../../components/common/BlueDivider';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import { AddBlueIcon } from '../../components/Icons/AddBlueIcon';
import { BookIcon } from '../../components/Icons/BookIcon';
import { CertificateIcon } from '../../components/Icons/CertificateIcon';
import { ExperienceIcon } from '../../components/Icons/ExperienceIcon';
import { MediaIcon } from '../../components/Icons/MediaIcon';
import TextArea from '../../components/TextArea';
import { EducationContent } from './EducationContent';
import { ExperienceContent } from './ExperienceContent';
import { MediaContent } from './MediaContent';

export function WorkContent() {
  const ref = useRef();
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
          disabled={true}
          label="Add Career"
          IconComponent={<AddBlueIcon />}
          IconDisabled={<AddBlueIcon fill="#D1D1D1" />}
        />
      </div>

      <div className="flex items-center mt-8 mb-5">
        <div className="w-[170px] form-title">Career Title</div>
        <div className="grow">
          <TextArea width="w-[500px]" placeholder="Enter Title" />
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
              content: 'Content for item 1',
            },
          ]}
        />
        <div className="flex justify-between">
          <div className="flex gap-4">
            <OutlinedButton label="Add Links" IconComponent={<AddBlueIcon />} />
            <OutlinedButton label="Add Links" IconComponent={<AddBlueIcon />} />
          </div>
          <div>
            <Button label="Save" showArrowIcon={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
