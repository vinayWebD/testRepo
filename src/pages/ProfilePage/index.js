// import { useSelector } from 'react-redux';
import ProfileLayout from '../../components/ProfileLayout';
// import Loader from '../../components/common/Loader';



const ProfilePage = () => {
  // const userData = useSelector((state) => state?.auth?.user) || {};
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <ProfileLayout>
      <div className="grid grid-cols-12 gap-3 feed-page">
        <div className="col-span-12">


          <div className="mt-3">

            {/* {isLoading && <Loader />} */}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
