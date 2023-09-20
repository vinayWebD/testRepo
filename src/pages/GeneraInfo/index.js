import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthPanelLayout from '../../components/AuthPanelLayout';
import { Button } from '../../components/common/Button';
import { PATHS } from '../../constants/urlPaths';
import Input from '../../components/common/Input';
import Modal from '../../components/Modal';
import InputProfilePicture from '../../components/InputProfilePicture';
import { LANG } from '../../constants/lang';
import { MESSAGES } from '../../constants/messages';

const { PATH_GENERAL_INFO } = PATHS;
const {
  LANG_GEN_INFO,
  LANG_PROVIDE_INFO,
  LANG_LOCATION,
  LANG_LOCATION_PLACEHOLDER,
  LANG_PROCEED,
  LANG_SKIP,
} = LANG.PAGES.GEN_INFO;

function GeneraInfo() {
  const navigate = useNavigate();
  const [cropImageFile, setCropImageFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { IS_REQUIRED } = MESSAGES;

  const initialValues = {
    location: '',
  };

  const onSubmit = (values) => {
    // Here, you'd typically make an API call to login
    navigate(PATH_GENERAL_INFO);
    console.log('Login data:', values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      location: yup.string().required(IS_REQUIRED('Location')),
    }),
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
            isRequired
          />
        </div>
        <Button
          type="submit"
          label={LANG_PROCEED}
          isDisabled={!formik.values.location}
          additionalClassNames="capitalize"
        />
        <div className={'text-center para-normal cursor-pointer'} onClick={() => {}}>
          {LANG_SKIP}
        </div>
      </form>
      <Modal isOpen={open} onClose={() => setOpen(false)} isTitle={false}></Modal>
    </AuthPanelLayout>
  );
}

export default GeneraInfo;
