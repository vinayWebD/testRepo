import React, { useState } from 'react';
import InputBox from '../../components/InputBox';
import { SkillsChips } from '../../components/Chips';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';

const SkillForm = ({ skillsList = [], updateSkillsList = () => {} }) => {
  const [inputSkillValue, setInputSkillValue] = useState('');

  const updateSkills = () => {
    if (!inputSkillValue?.trim()?.length) {
      ToastNotifyError('Enter a valid skill');
      return false;
    }

    updateSkillsList([...skillsList, inputSkillValue?.trim()]);
    setInputSkillValue('');
  };

  const removeChipHandler = (idx) => {
    let filteredData = skillsList?.filter((skill, _i) => _i !== idx);
    updateSkillsList(filteredData);
  };

  return (
    <div className="px-6">
      <div className="pb-3">
        <InputBox
          name="name"
          label="Skill"
          placeholder="Enter Skill"
          value={inputSkillValue}
          onChange={(e) => setInputSkillValue(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              updateSkills();
            }
          }}
        />
      </div>
      <div className="flex gap-[12px] flex-wrap pb-[24px]">
        {skillsList?.map((name, idx) => (
          <SkillsChips key={idx} label={name} onClick={() => removeChipHandler(idx)} />
        ))}
      </div>
    </div>
  );
};

export default SkillForm;
