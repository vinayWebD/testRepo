import { markReadApi, notificationListing } from '../../services/notificationService';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const notificationListDispatcher =
  ({ page = 1, limit = 10 }) =>
    async (dispatch) => {
      dispatch(globalTransparentLoadingPrivate(true));
      const { status, data } = await notificationListing({ page, limit });
      dispatch(globalTransparentLoadingPrivate(false));
      return { status, data };
    };

const markReadDispatcher =
  (dataToSend) =>
    async (dispatch) => {
      dispatch(globalTransparentLoadingPrivate(true));
      console.log('dataToSend', dataToSend)
      const { status, data } = await markReadApi(dataToSend);
      dispatch(globalTransparentLoadingPrivate(false));
      return { status, data };
    };

export { notificationListDispatcher, markReadDispatcher };
