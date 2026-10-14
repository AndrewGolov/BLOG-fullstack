/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { checkAccess, request } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../../selectors';
import { H2, PrivateContent } from '../../components';
import { UserRow, TableRow } from './components';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldRemoveUser, setShouldRemoveUser] = useState(false);

	const userRole = useSelector(selectUserRoleId);

	useEffect(() => {
		if (checkAccess([ROLE.ADMIN], userRole)) return;

		Promise.all([request('/api/users'), request('/api/users/roles')]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}
			setUsers(usersRes.data);
			setRoles(rolesRes.data);
		});
	}, [shouldRemoveUser, userRole]);

	const onUserRemove = (userId) => {
		if (checkAccess([ROLE.ADMIN], userRole)) return;
		return request(`/api/users/${userId}`, 'DELETE').then(() => setShouldRemoveUser(!shouldRemoveUser));
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<TableRow>
					<div className="login-column">Логин</div>
					<div className="registered-at-column">Дата регистрации</div>
					<div className="role-column">Роль</div>
				</TableRow>
				{users.map(({ id, login, registerAt, roleId }) => (
					<UserRow
						key={id}
						login={login}
						id={id}
						registerAt={registerAt}
						userRoleId={roleId}
						roles={roles.filter(({ id }) => Number(id) !== Number(ROLE.GUEST))}
						onUserRemove={() => onUserRemove(id)}
					/>
				))}
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	width: 570px;
	font-size: 18px;

	&& > h2 {
		align-self: center;
	}
`;
