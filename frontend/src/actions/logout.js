import { ACTION_TYPE } from './action-type';
import { request } from '../utils';

export const logout = () => {
	request('/api/logout', 'POST');
	return {
		type: ACTION_TYPE.LOG_OUT,
	};
};
