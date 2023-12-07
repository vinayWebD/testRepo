import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../components/Icons/HeartIcon';
import MyselfIcon from '../../components/Icons/MyselfIcon';
import WorkIcon from '../../components/Icons/WorkIcon';
import WorkNavbar from '../../components/Navbar.js/WorkNavbar';
// import Tabs from '../../components/Tabs';
import PersonalInfoTabs from '../../components/Tabs/PersonalInfoTab';
import { PATHS } from '../../constants/urlPaths';
import { WorkTabContent } from './WorkTabContent';

function Interest() {
  const navigate = useNavigate();
  return (
    <>
      <WorkNavbar />
      <PersonalInfoTabs
        tabItems={[
          {
            label: 'Work',
            icon: <WorkIcon />,
            blackicon: <WorkIcon fill="#333" />,
            redirect: () => navigate(PATHS.PATH_WORK),
            activeTab: 'Work',
          },
          {
            label: 'Interests',
            icon: <HeartIcon />,
            blackicon: <HeartIcon fill="#333" />,
            redirect: () => navigate(PATHS.PATH_INTERESTS),
          },
          {
            label: 'Myself',
            icon: <MyselfIcon />,
            blackicon: <MyselfIcon fill="#333" />,
            redirect: () => navigate(PATHS.PATH_MYSELF),
          },
        ]}
      />
      <WorkTabContent />
    </>
  );
}

export default Interest;
