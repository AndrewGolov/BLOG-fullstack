import { ACTION_TYPE } from './action-type';

export const openModal = (actionParams) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: actionParams,
});
