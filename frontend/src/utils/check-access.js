import { ERROR } from '../constants';

export const checkAccess = (access, userRole) => (access.includes(userRole) ? null : ERROR.ACCESS_DENIED);
