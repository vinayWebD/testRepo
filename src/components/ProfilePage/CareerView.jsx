import React, { useEffect, useState } from 'react';
import edit from '../../assets/images/editIcon.svg';
import SeeMoreLessIcon from '../Icons/SeeMoreLessIcon';
import ExperienceView from './ExperienceView';
import EducationView from './EducationView';
import CertificateView from './CertificateView';
import LinkView from './LinkView';
import { SkillsChipsBlue } from '../Chips';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';

const CareerView = ({ career = {}, isEditable = false }) => {
  const hasExperiences = career?.Experiences?.length > 0;
  const hasCertificates = career?.Certificates?.length > 0;
  const hasEducation = career?.Education?.length > 0;
  const hasLinks = career?.Links?.length > 0;
  const hasSkills = career?.Skills?.length > 0;

  const [showSeeMore, setShowSeeMore] = useState({
    showButton: false, // If we want to render the See More button on screen
    showWhichCategory: null, // Which category to be shown by default
  });
  const [isShowMoreEnabled, setIsShowMoreEnabled] = useState(false); // Is the button see more or see less
  const navigate = useNavigate();

  useEffect(() => {
    // If the length of exp, edu, cert exceeds 1, then we need to show the see more button
    let show =
      career?.Experiences?.length +
        career?.Certificates?.length +
        career?.Education?.length +
        career?.Links?.length +
        career?.Skills?.length >
      1;
    setShowSeeMore({
      showButton: show,
      showWhichCategory: findCategoryToShowByDefault(),
    });
  }, [career]);

  const findCategoryToShowByDefault = () => {
    // ***** NOTE *******
    // Always keep them in the order of the UI
    if (hasExperiences) {
      return 'experience';
    }
    if (hasEducation) {
      return 'education';
    }
    if (hasCertificates) {
      return 'certificate';
    }
    if (hasLinks) {
      return 'link';
    }
    if (hasSkills) {
      return 'skill';
    }
  };

  return (
    <div className="flex flex-col">
      {/* Adding the below for some margin in case when we are viewing for other users */}
      {!isEditable ? <div className="p-4"></div> : ''}

      <div className="flex justify-between items-center">
        <div className="py-[10px] px-[20px] rounded-r-lg flex flex-col gap-2 blue-white-gradient p-3 text-white w-fit text-[14px] md:text-[18px] font-semibold break-words">
          {career?.title}
        </div>
        {isEditable ? (
          <div className="p-4">
            <div
              className="bg-iconBackground p-1 rounded cursor-pointer"
              onClick={() =>
                navigate(`${PATHS.PROFILE_ADD_EDIT_CAREER}/${career?.id}`, {
                  replace: true,
                  preventScrollReset: false,
                })
              }
            >
              <img src={edit} alt="edit" />
            </div>
          </div>
        ) : (
          <div className="p-4"></div>
        )}
      </div>

      {/* Adding the below for some margin in case when we are viewing for other users */}
      {!isEditable ? <div className="p-2"></div> : ''}

      {/* Experiences section */}
      {hasExperiences && (showSeeMore?.showWhichCategory === 'experience' || isShowMoreEnabled) && (
        <div className="px-4">
          <p className="text-blueprimary text-xl font-medium mb-4">Experiences</p>

          {career?.Experiences?.map((exp, _i) => {
            if (
              (_i === 0 && showSeeMore?.showButton && !isShowMoreEnabled) ||
              !showSeeMore?.showButton
            ) {
              return <ExperienceView key={exp?.id} experience={exp} />;
            } else if (isShowMoreEnabled) {
              return <ExperienceView key={exp?.id} experience={exp} />;
            }
          })}
        </div>
      )}

      {/* Education section */}
      {hasEducation && (showSeeMore?.showWhichCategory === 'education' || isShowMoreEnabled) && (
        <div className="px-4">
          <p className="text-blueprimary text-xl font-medium mb-4">Education</p>

          {career?.Education?.map((edu, _i) => {
            if (
              (_i === 0 && showSeeMore?.showButton && !isShowMoreEnabled) ||
              !showSeeMore?.showButton
            ) {
              return <EducationView key={edu?.id} education={edu} />;
            } else if (isShowMoreEnabled) {
              return <EducationView key={edu?.id} education={edu} />;
            }
          })}
        </div>
      )}

      {/* Certifications section */}
      {hasCertificates &&
        (showSeeMore?.showWhichCategory === 'certificate' || isShowMoreEnabled) && (
          <div className="px-4">
            <p className="text-blueprimary text-xl font-medium mb-4">Certifications</p>

            {career?.Certificates?.map((cert, _i) => {
              if (
                (_i === 0 && showSeeMore?.showButton && !isShowMoreEnabled) ||
                !showSeeMore?.showButton
              ) {
                return <CertificateView key={cert?.id} certificate={cert} />;
              } else if (isShowMoreEnabled) {
                return <CertificateView key={cert?.id} certificate={cert} />;
              }
            })}
          </div>
        )}

      {/* Links section */}
      {hasLinks && (showSeeMore?.showWhichCategory === 'link' || isShowMoreEnabled) && (
        <div className="px-4">
          <p className="text-blueprimary text-xl font-medium mb-4">Links</p>

          <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
            {career?.Links?.map((link, _i) => {
              if (
                (_i === 0 && showSeeMore?.showButton && !isShowMoreEnabled) ||
                !showSeeMore?.showButton
              ) {
                return <LinkView key={link?.id} link={link} />;
              } else if (isShowMoreEnabled) {
                return <LinkView key={link?.id} link={link} />;
              }
            })}
          </div>
          <div className="py-4">
            <div className="bg-greymedium h-[1px] w-full" />
          </div>
        </div>
      )}

      {/* Skills section */}
      {hasSkills && (showSeeMore?.showWhichCategory === 'skill' || isShowMoreEnabled) && (
        <div className="px-4">
          <p className="text-blueprimary text-xl font-medium mb-4">Skills</p>

          <div className="flex gap-[24px] grow-0 mt-6 flex-wrap	">
            {career?.Skills?.map((skill, _i) => {
              if (
                (_i === 0 && showSeeMore?.showButton && !isShowMoreEnabled) ||
                !showSeeMore?.showButton
              ) {
                return <SkillsChipsBlue label={skill?.skill} key={skill?.id} />;
              } else if (isShowMoreEnabled) {
                return <SkillsChipsBlue label={skill?.skill} key={skill?.id} />;
              }
            })}
          </div>
          <div className="py-4">
            <div className="bg-greymedium h-[1px] w-full" />
          </div>
        </div>
      )}

      {/* See more/less button */}
      {showSeeMore?.showButton ? (
        <div
          className="text-center text-blueprimary cursor-pointer text-[14px] font-semibold capitalize flex gap-1 justify-center items-center hover:opacity-70"
          onClick={() => setIsShowMoreEnabled((prev) => !prev)}
        >
          See {!isShowMoreEnabled ? 'more' : 'less'}{' '}
          <SeeMoreLessIcon className={!isShowMoreEnabled ? 'rotate-180' : ''} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CareerView;
