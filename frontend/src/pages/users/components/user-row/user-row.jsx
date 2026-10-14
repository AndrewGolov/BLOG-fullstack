/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils';
import styled from 'styled-components';

const UserRowContainer = ({ className, login, id, registerAt, userRoleId, roles, onUserRemove }) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => setSelectedRoleId(Number(target.value));

	const onRoleSave = (userId, newUserRoleId) =>
		request(`/api/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => setInitialRoleId(newUserRoleId));

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registerAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name }) => (
							<option key={roleId} value={roleId}>
								{name}
							</option>
						))}
					</select>

					<Icon
						id="fa-floppy-o"
						margin="10px 0 0 6px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon id="fa-trash-o" margin="10px 0 0 6px" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	&& select {
		padding: 0 5px;
		font-size: 16px;
	}

	&& .save-role-button {
		width: 21px;
		height: 32px;
	}
`;

UserRow.propTypes = {
	login: PropTypes.string.isRequied,
	id: PropTypes.string.isRequied,
	registerAt: PropTypes.string.isRequied,
	userRoleId: PROP_TYPE.ROLE.isRequied,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequied,
};
