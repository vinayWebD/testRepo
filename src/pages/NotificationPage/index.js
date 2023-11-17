import { useSelector } from 'react-redux';
import SectionLayout from '../../components/PrivateLayout/SectionLayout';


const NotificationPage = () => {
  const userData = useSelector((state) => state?.auth?.user) || {};

  console.log('userData', userData)

  return (
    <SectionLayout activeTab={3}>
      <div className="grid grid-cols-12 gap-5 feed-page">
        <div className="col-span-12">


        </div>
      </div>
    </SectionLayout>
  );
};

export default NotificationPage;
