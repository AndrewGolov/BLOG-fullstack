import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
	},
};

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOG_OUT: {
			return {
				...state,
				wasLogout: !state.wasLogouts,
			};
		}

		case ACTION_TYPE.OPEN_MODAL: {
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen: true,
				},
			};
		}
		case ACTION_TYPE.CLOSE_MODAL: {
			return initialAppState;
		}
		default:
			return state;
	}
};
