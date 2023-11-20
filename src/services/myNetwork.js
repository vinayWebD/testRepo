import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { INVITE_PEOPLE } = NETWORK_CONSTANTS;

const invitePeople = async ({ email, description }) => {
  try {
    const data = await apiUtility(INVITE_PEOPLE, 'POST', { email, description });
    return data;
  } catch (error) {
    return error;
  }
};

export { invitePeople };
