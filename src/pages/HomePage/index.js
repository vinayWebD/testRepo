import Avatar from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import Card from '../../components/common/Card';
import PrivateHeader from '../../components/common/PrivateHeader';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col bg-lightblue min-h-[100vh]">
      <PrivateHeader />
      <div className="py-[14px] px-[5%] flex-grow grid grid-cols-12 gap-5">
        <div className="col-span-3 bg-red-300">
          <Card classNames="py-8 px-4">
            <div className="flex gap-3">
              <Avatar
                classNames="w-[72px] h-[72px]"
                image="https://images.unsplash.com/photo-1580483046931-aaba29b81601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVzc2lhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              />

              <div className="flex flex-col gap-1">
                <p className="text-greydark text-[14px] md:text-[20px] font-medium">
                  Toshi Medatwal
                </p>
                <h4 className="font-normal text-greylight text-[12px] md:text-[14px]">
                  UI/UX Designer | Influencer at Masco{' '}
                </h4>

                <Button label="View Profile" additionalClassNames="mt-2 px-[24px]" />
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-7 bg-green-300">
          <Card classNames="p-3"></Card>
        </div>

        <div className="col-span-2 bg-yellow-300">
          <Card classNames="p-3"></Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
