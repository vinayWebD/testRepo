import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../components/Icons/HeartIcon';
import MyselfIcon from '../../components/Icons/MyselfIcon';
import WorkIcon from '../../components/Icons/WorkIcon';
import WorkNavbar from '../../components/Navbar.js/WorkNavbar';
// import Tabs from '../../components/Tabs';
import PersonalInfoTabs from '../../components/Tabs/PersonalInfoTab';
import { PATHS } from '../../constants/urlPaths';
import { InterestsTabContent } from '../Interests/InterestsTabContent';
import { WorkTabContent } from '../Work/WorkTabContent';
import { MyselfTabContent } from './MyselfTabContent';

function Myself() {
  const navigate = useNavigate()
  return (
    <>
      <WorkNavbar />
      <PersonalInfoTabs
        tabItems={[
          {
            label: 'Work',
            icon: <WorkIcon />,
            blackicon: <WorkIcon fill="#333" />,
            content: <WorkTabContent />,
            redirect: () => navigate(PATHS.PATH_WORK),
          },
          {
            label: 'Interests',
            icon: <HeartIcon />,
            blackicon: <HeartIcon fill="#333" />,
            content: <InterestsTabContent />,
            redirect: () => navigate(PATHS.PATH_INTERESTS),
          },
          {
            label: 'Myself',
            icon: <MyselfIcon />,
            blackicon: <MyselfIcon fill="#333" />,
            content: <MyselfTabContent />,
            redirect: () => navigate(PATHS.PATH_MYSELF),
            activeTab: 'Myself',
          },
        ]}
      />
      <MyselfTabContent />
    </>
  );
}

export default Myself;
