import Card from '../../components/common/Card';
import PrivateLayout from '../../components/PrivateLayout';

const HomePage = () => {
  return (
    <PrivateLayout>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-9">
          <Card classNames="p-3"></Card>
        </div>

        <div className="col-span-3">
          <Card classNames="p-3"></Card>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default HomePage;
