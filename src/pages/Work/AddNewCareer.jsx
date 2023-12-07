/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { successStatus } from '../../common';
import { fetchCareersList } from '../../services/signup';
import { CareerFrom } from './CareerForm';
import backIcon from '../../assets/images/backIcon.svg';
import WorkNavbar from '../../components/Navbar.js/WorkNavbar';
export function AddCareer() {
  const [careerList, setCareerList] = useState(null);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const getCareerList = async () => {
    const response = await fetchCareersList(id);
    const {
      status,
      data: { data },
    } = response;
    console.log('response', response);
    if (successStatus(status)) {
      setCareerList(data);
    }
  };

  useEffect(() => {
    getCareerList();
  }, []);

  console.log('careerList', careerList);

  const updateCareerId = (i) => {
    setId(i);
  };
  return (
    <>
      <WorkNavbar />
      <div className="py-[36px] lg:px-[70px] md:px-[40px] px-[20px] bg-bluebg">
        <div className="mb-8 flex justify-between ">
          <div
            className="flex text-[16px] md:text-[18px] lg:text-[24px] py-4 sticky h-fit cursor-pointer font-medium"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={backIcon} alt="backIcon" className="w-[20px] lg:w-[30px]" />
            Add Career
          </div>
        </div>
        <CareerFrom
          getCareerList={getCareerList}
          id={careerList?.id}
          updateCareerId={updateCareerId}
          type={'add'}
        />
      </div>
    </>
  );
}
