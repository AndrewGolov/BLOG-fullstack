import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../../selectors';
import PropTypes from 'prop-types';

import { checkAccess } from '../../utils';
import { Error } from '../error/error.jsx';
import { PROP_TYPE } from '../../constants/prop-types.js';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRoleId);
	const hasAccess = checkAccess(access, userRole);
	const accessError = hasAccess ? hasAccess : null;

	const error = serverError || accessError;
	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	serverError: PROP_TYPE.ERROR,
};
