import { useFormik } from 'formik';
import { Button } from '../../components/common/Button';
import OutlinedButton from '../../components/common/OutlinedButton';
import TextArea from '../../components/TextArea';
// import { validationSchemaMyself } from '../../validations';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/urlPaths';
import { updateSignup } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
export function MyselfTabContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { HOME } = PATHS;
  const initialWork = {
    myself: '',
  };

  const myselfSubmit = async () => {
    let dataToSend = {
      work: '',
      interest: '',
      myself: 'formikWork.values.myself',
    };
    console.log('dataToSend', dataToSend);

    // await fetchWorkMyself(dataToSend);
  };

  const onSkipHandler = async () => {
    await dispatch(updateSignup(false));
    navigate(HOME, { replace: true });
    window.location.reload();
  };

  const formikmyself = useFormik({
    initialValues: initialWork,
    // validationSchema: validationSchemaMyself,
    onSubmit: myselfSubmit,
  });

  const {
    values: { myself = '' },
    touched: { title: tuc_myself },
    errors: { title: err_myself },
  } = formikmyself;

  return (
    <div className="py-[36px] lg:px-[70px] md:px-[40px] px-[20px] bg-bluebg">
      <div className="tab-content-title">So far so good. Let’s talk about your Myself</div>
      <div className="tab-content-subtitle">We use this info for better reach.</div>

      <div className="md:flex block items-center mt-8 mb-5">
        <div className="w-[170px] form-title md:pb-0 pb-2">About Myself</div>
        <div className="grow">
          <TextArea
            height="h-[160px]"
            placeholder="Enter Description"
            value={myself}
            onChange={(e) => formikmyself.setFieldValue('myself', e.target.value)}
            // onBlur={myselfSubmit}
            error={tuc_myself && err_myself}
            helperText={tuc_myself && err_myself}
          />
        </div>
      </div>
      <div className="grid justify-items-end pb-8">
        <Button label="Save" onClick={myselfSubmit} showArrowIcon={false} />
      </div>
      <hr className="pb-8" style={{ color: 'rgba(161, 160, 160, 0.50)' }} />
      <div>
        <div className="mt-[34px] flex justify-between flex-wrap">
          <div className="flex gap-4 flex-wrap"></div>
          <div className="flex gap-4 flex-wrap items-center">
            <div>
              <OutlinedButton label="Skip" isSkip={true} onClick={() => onSkipHandler()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
