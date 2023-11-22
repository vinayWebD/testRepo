import React, { useState } from 'react';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';
import InnerSectionLayout from '../../components/PrivateLayout/InnerSectionLayout';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import Accordion from '../../components/Accordion';
import { Button } from '../../components/common/Button';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import Divider from '../../components/common/Divider';
import { useDispatch } from 'react-redux';
import { contactAdminDispatcher } from '../../redux/dispatchers/myProfileDispatcher';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';

const { SETTINGS } = PATHS;

const HelpCenter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isContactAdminModalOpen, setIsContactAdminModalOpen] = useState(false);
  const [description, setDescription] = useState('');

  const onClickHandler = async () => {
    const { status, data } = await dispatch(contactAdminDispatcher({ userQuery: description }));
    if (!successStatus(status)) {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    } else {
      ToastNotifySuccess('Mail sent successfully!');
      setIsContactAdminModalOpen(false);
    }
  };

  return (
    <SectionLayout activeTab={4}>
      <InnerSectionLayout
        heading={'Help Center'}
        isSubSection={true}
        onClickSubSectionHandler={() => navigate(SETTINGS)}
      >
        <div className="w-full md:text-center text-[16px] md:text-[24px] font-semibold mb-6">
          Frequently Asked Questions
        </div>

        <Accordion
          parentClassName={'bg-whitelight'}
          childClassName={'bg-white text-[16px] text-[#2A3039] p-6 font-normal'}
          titleClassName={'text-[#2A3039] text-[16px] font-medium'}
          mainIcon={() => <span className="text-blueprimary text-[20px] font-medium">+</span>}
          items={[
            {
              title: 'Lorem ipsum dolor sit amet consectetur.',
              content: `Det koster ingenting å sende faktura til inkasso hos Kravia. Vår inntektskilde er gebyrer og salærer som legges på fakturaen gjennom prosessen, disse gebyrene kan du lese mer om her.

Der er ett unntak, og det er dersom fakturaen er forfalt for mer enn 90 dager siden. `,
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur.',
              content: `Det koster ingenting å sende faktura til inkasso hos Kravia. Vår inntektskilde er gebyrer og salærer som legges på fakturaen gjennom prosessen, disse gebyrene kan du lese mer om her.

Der er ett unntak, og det er dersom fakturaen er forfalt for mer enn 90 dager siden. `,
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur.',
              content: `Det koster ingenting å sende faktura til inkasso hos Kravia. Vår inntektskilde er gebyrer og salærer som legges på fakturaen gjennom prosessen, disse gebyrene kan du lese mer om her.

Der er ett unntak, og det er dersom fakturaen er forfalt for mer enn 90 dager siden. `,
            },
            {
              title: 'Lorem ipsum dolor sit amet consectetur.',
              content: `Det koster ingenting å sende faktura til inkasso hos Kravia. Vår inntektskilde er gebyrer og salærer som legges på fakturaen gjennom prosessen, disse gebyrene kan du lese mer om her.

Der er ett unntak, og det er dersom fakturaen er forfalt for mer enn 90 dager siden. `,
            },
          ]}
        />

        <div className="p-4 md:p-8 bg-[rgba(0,113,188,0.05)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-[20px]">Need any help?</span>
            <span className="text-[#666666]">
              {' '}
              Contact admin and get solution to your problems.
            </span>
          </div>

          <div>
            <Button
              label="Contact Admin"
              showArrowIcon={false}
              additionalClassNames={'!px-[20px] py-[16px] w-[175px]'}
              onClick={() => setIsContactAdminModalOpen(true)}
            />
          </div>
        </div>
      </InnerSectionLayout>
      <Modal
        isOpen={isContactAdminModalOpen}
        onClose={() => setIsContactAdminModalOpen(false)}
        title={'Contact Admin'}
        isTitle={true}
        childrenClassNames="overflow-y-auto"
        padding="p-0"
        titleClassNames=""
        titleParentClassNames="md:m-3 m-0"
        height=" max-h-[100dvh] md:h-auto"
      >
        <div className="p-[18px]">
          <TextArea
            placeholder="Enter description"
            label="Description"
            height="h-[150px]"
            value={description}
            handleChange={(val) => setDescription(val)}
          />
        </div>
        <Divider />
        <div className="text-end flex justify-end mr-4">
          <Button
            label={'Send Mail'}
            additionalClassNames=" sm:px-[24px] sm:py-[15px] mt-4  items-center text-xs min-[320px]:px-[30px] min-[320px]:py-[15px] "
            showArrowIcon={false}
            onClick={onClickHandler}
          />
        </div>
      </Modal>
    </SectionLayout>
  );
};

export default HelpCenter;
