import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import secureLocalStorage from 'react-secure-storage';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import { Button } from '../../components/common/Button';
import { PATHS } from '../../constants/urlPaths';
import Input from '../../components/common/Input';
import Modal from '../../components/Modal';
import InputProfilePicture from '../../components/InputProfilePicture';
import { LANG } from '../../constants/lang';
import { login } from '../../redux/slices/authSlice';
import { getErrorMessage, successStatus } from '../../common';
import { validationSchemaLocation } from '../../validations';
import {
  fetchFileUPloadAWS,
  fetchGenratePreSignedUrl,
  fetchProfileEdit,
} from '../../services/signup';
import { ToastNotifyError, ToastNotifySuccess } from '../../components/Toast/ToastNotify';

const { HOME } = PATHS;
const {
  LANG_GEN_INFO,
  LANG_PROVIDE_INFO,
  LANG_LOCATION,
  LANG_LOCATION_PLACEHOLDER,
  LANG_PROCEED,
  LANG_SKIP,
} = LANG.PAGES.GEN_INFO;

function GeneralInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cropImageFile, setCropImageFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');
  const [open, setOpen] = useState(false);
  const { data: userData } = secureLocalStorage.getItem('object');

  const getPreSignedUrl = async () => {
    const uploadData = new FormData();
    if (cropImageFile) {
      const response = await fetchGenratePreSignedUrl();
      const { status = 0, data = {} } = response;
      if (successStatus(status)) {
        const { fields: { key, AWSAccessKeyId, policy, signature } = {}, url } = data;
        setProfilePicture(key);
        uploadData.append('key', key);
        uploadData.append('AWSAccessKeyId', AWSAccessKeyId);
        uploadData.append('policy', policy);
        uploadData.append('signature', signature);
        uploadData.append('file', cropImageFile);
        console.log(uploadData, 'uploadData');
        await fetchFileUPloadAWS({ url: url, dataTosend: uploadData });
      }
    }
  };

  const handleSkip = () => {
    dispatch(login(userData));
    secureLocalStorage.clear();
    navigate(HOME, { replace: true });
  };

  useEffect(() => {
    getPreSignedUrl();
  }, [cropImageFile]);

  const initialValues = {
    location: '',
    profile_picture: profilePicture,
  };

  const onSubmit = async (values) => {
    const { location, profile_picture = '' } = values;
    const dataToSend = {
      location: location,
    };
    if (profile_picture) {
      dataToSend['profile_picture'] = profile_picture;
    }
    const response = await fetchProfileEdit(dataToSend);
    const { status, data } = response;
    const errormsg = getErrorMessage(data);
    if (successStatus(status)) {
      ToastNotifySuccess('Location Added Successfully', 'location-success');
      dispatch(login(userData));
      secureLocalStorage.clear();
      navigate(HOME, { replace: true });
    } else {
      if (errormsg) {
        ToastNotifyError(errormsg, 'location-failed');
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaLocation,
    onSubmit,
  });

  return (
    <AuthPanelLayout>
      <div className="flex items-center gap-2">
        <h1 className="text-white pr-2">{LANG_GEN_INFO}</h1>
      </div>
      <div className="border-b border-[#F2F2F233] max-w-fit">
        <h4 className="text-white mb-2 pr-2">{LANG_PROVIDE_INFO}</h4>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[24px] max-w-[400px] mt-[24px]"
      >
        <InputProfilePicture setCropImageFile={setCropImageFile} cropImageFile={cropImageFile} />
        <div className="mb-4">
          <Input
            name="location"
            type="text"
            label={LANG_LOCATION}
            placeholder={LANG_LOCATION_PLACEHOLDER}
            className="w-full"
            value={formik?.values?.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
        </div>
        <Button
          type="submit"
          label={LANG_PROCEED}
          isDisabled={!formik.values.location}
          additionalClassNames="capitalize"
        />
        <div className={'text-center para-normal cursor-pointer'} onClick={handleSkip}>
          {LANG_SKIP}
        </div>
      </form>
      <Modal isOpen={open} onClose={() => setOpen(false)} isTitle={false}></Modal>
    </AuthPanelLayout>
  );
}

export default GeneralInfo;
