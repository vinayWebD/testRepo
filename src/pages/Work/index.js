import HeartIcon from '../../components/Icons/HeartIcon';
import MyselfIcon from '../../components/Icons/MyselfIcon';
import WorkIcon from '../../components/Icons/WorkIcon';
import WorkNavbar from '../../components/Navbar.js/WorkNavbar';
import Tabs from '../../components/Tabs';
import { WorkContent } from './WorkContent';

function Work() {
  return (
    <>
      <WorkNavbar />
      <Tabs
        tabItems={[
          {
            label: 'Work',
            icon: <WorkIcon />,
            blackicon: <WorkIcon fill="#333" />,
            content: <WorkContent />,
          },
          { label: 'Interests', icon: <HeartIcon />, blackicon: <HeartIcon fill="#333" /> },
          { label: 'Myself', icon: <MyselfIcon />, blackicon: <MyselfIcon fill="#333" /> },
        ]}
      />
    </>
  );
}

export default Work;
