import { addCareerTitle, updateCareerTitle } from '../../services/signup';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const addCareerTitleDispatcher = (dataToSend) => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await addCareerTitle(dataToSend);
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data };
};

const updateCareerTitleDispatcher = (dataToSend) => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await updateCareerTitle(dataToSend);
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data };
};

export { addCareerTitleDispatcher, updateCareerTitleDispatcher };
