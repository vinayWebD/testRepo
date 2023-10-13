/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Card from '../../components/common/Card'
import edit from '../../assets/images/editIcon.svg';
import OutlinedButton from '../../components/common/OutlinedButton';

function WorkDetail() {
  return (
    <Card classNames="p-4 mt-4 h-[calc(100vh-275px)]">
      <div className='flex items-center justify-between'>
        <div className="text-blueprimary text-[15px] md:text-[20px]" style={{ fontWeight: '500' }}>About work</div>
        <div className='bg-iconBackground p-1 rounded w-fit'>
          <img src={edit} alt="edit" />
        </div>
      </div>
      <div className="font-normal text-greydark text-[10px] md:text-[14px] my-3">
        I contributed to diverse projects by crafting compelling visual assets
        in alignment with the brand's identity. I collaborated closely with
        cross-functional teams to conceptualize and refine user interfaces,
        enhancing overall user experience. I played a key role in producing
        impactful marketing materials, including social media graphics and
        promotional visuals. Through mentorship, I refined my proficiency
        in design tools and gained practical insights into design best
        practices. Active engagement in brainstorming sessions allowed me
        to offer innovative ideas and incorporate feedback iteratively.
        This experience deepened my understanding of the end-to-end design
        process, allowing me to effectively balance creativity with strategic goals.
      </div>
      <div className="text-center mx-auto flex mt-2">
        <OutlinedButton
          label={'Add Career'}
          additionalClassNames="mt-2 pl-0 pr-0 w-fit"
          showArrowIcon={false}
          add
        />
      </div>
    </Card>
  )
}

export default WorkDetail