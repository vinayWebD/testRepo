import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  position: 'top-right',
  autoClose: 1800,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const ToastNotifyInfo = (message, id, autoCloseEnabled = 1800) => {
  // using id for unique identity for toast otherwise we'll see multiple toast at a time
  return (
    <>
      <ToastContainer>
        {toast.info(message, { ...options, toastId: `info-${id}`, autoClose: autoCloseEnabled })}
      </ToastContainer>
    </>
  );
};
export const ToastNotifySuccess = (message, id, autoCloseEnabled = 1800) => {
  return (
    <>
      <ToastContainer>
        {toast.success(message, {
          ...options,
          toastId: `success-${id}`,
          autoClose: autoCloseEnabled,
        })}
      </ToastContainer>
    </>
  );
};
export const ToastNotifyError = (message, id, autoCloseEnabled = 1800) => {
  return (
    <>
      <ToastContainer>
        {toast.error(message, { ...options, toastId: `error-${id}`, autoClose: autoCloseEnabled })}
      </ToastContainer>
    </>
  );
};
