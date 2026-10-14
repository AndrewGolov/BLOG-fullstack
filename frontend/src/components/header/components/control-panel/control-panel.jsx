/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from 'react-router-dom';
import { Icon, Button } from '../../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLogin, selectUserRoleId } from '../../../../selectors';
import { logout } from '../../../../actions';
import { ROLE } from '../../../../constants';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLink = styled(Link)`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const StyledLoginContainer = styled.div`
	align-self: center;
	margin: 10px 0 0 0;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRoleId);
	const login = useSelector(selectUserLogin);
	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const hasAccess = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<StyledLink to="/login">Войти</StyledLink>
					</Button>
				) : (
					<>
						<StyledLoginContainer>{login}</StyledLoginContainer>
						<Icon id="fa-sign-out" margin="10px 0 0 6px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />

				{!hasAccess && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
