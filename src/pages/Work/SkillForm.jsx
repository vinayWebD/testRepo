import React, { useState } from 'react';
import InputBox from '../../components/InputBox';
import { SkillsChips } from '../../components/Chips';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { LIMITS, REGEX } from '../../constants/constants';

const { SKILL_PATTERN } = REGEX;
const { MAX_CAREER_SKILL_LENGTH } = LIMITS;

const SkillForm = ({ skillsList = [], updateSkillsList = () => {} }) => {
  const [inputSkillValue, setInputSkillValue] = useState('');

  const updateSkills = () => {
    if (!SKILL_PATTERN.test(inputSkillValue)) {
      ToastNotifyError(`Enter a valid skill of upto ${MAX_CAREER_SKILL_LENGTH} characters`);
      return;
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
          maxLength={MAX_CAREER_SKILL_LENGTH}
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
