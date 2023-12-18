import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CareerForm } from './CareerForm';
import backIcon from '../../assets/images/backIcon.svg';
import WorkNavbar from '../../components/Navbar.js/WorkNavbar';
import { fetchCareerById } from '../../services/signup';
import { getErrorMessage, successStatus } from '../../common';
import { ToastNotifyError } from '../../components/Toast/ToastNotify';
import { PATHS } from '../../constants/urlPaths';

export function AddCareer() {
  const [career, setCareer] = useState({});
  const navigate = useNavigate();
  const { id: editCareerId } = useParams();

  useEffect(() => {
    if (editCareerId) {
      fetchCareerDataById(editCareerId);
    }
  }, [editCareerId]);

  const fetchCareerDataById = async (i) => {
    const { status, data } = await fetchCareerById(i);

    if (successStatus(status)) {
      setCareer(data?.data);
    } else {
      const errormsg = getErrorMessage(data);
      if (errormsg) {
        ToastNotifyError(errormsg);
      }
    }
  };

  return (
    <>
      <WorkNavbar />
      <div className="py-[36px] lg:px-[70px] md:px-[40px] px-[20px] bg-bluebg">
        <div className="mb-8 flex justify-between ">
          <div
            className="flex text-[16px] md:text-[18px] lg:text-[24px] py-4 sticky h-fit cursor-pointer font-medium"
            onClick={() => {
              navigate(PATHS.PATH_WORK);
            }}
          >
            <img src={backIcon} alt="backIcon" className="w-[20px] lg:w-[30px]" />
            {editCareerId ? 'Edit' : 'Add'} Career
          </div>
        </div>
        <CareerForm
          id={career?.id}
          type={editCareerId ? 'edit' : 'add'}
          fetchCareerDataById={fetchCareerDataById}
          data={career || {}}
        />
      </div>
    </>
  );
}
