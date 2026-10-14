import { ROLE } from '../constants';
import { ACTION_TYPE } from '../actions';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...payload,
			};
		}

		case ACTION_TYPE.LOG_OUT: {
			return {
				...state,
				...initialUserState,
			};
		}

		case ACTION_TYPE.SET_USER_ROLE: {
			return { ...state };
		}
		default:
			return state;
	}
};
