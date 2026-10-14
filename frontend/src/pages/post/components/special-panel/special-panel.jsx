/* eslint-disable react-refresh/only-export-components */
import { Icon } from '../../../../components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { useSelector } from 'react-redux';
import { selectUserRoleId } from '../../../../selectors';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../actions';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRoleId);
	const navigate = useNavigate();

	const hasAccess = checkAccess([ROLE.ADMIN], roleId);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить пост ? ',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => navigate('/'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon id="fa-calendar-o" className="published-at__icon" margin="0 10px 0 0" $inactive={true} />
				)}
				{publishedAt}
			</div>
			{!hasAccess && (
				<div className="special-panel__buttons">
					{editButton}
					{publishedAt && <Icon id="fa-trash-o" onClick={() => onPostRemove(id)} />}
				</div>
			)}
		</div>
	);
};
export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin: 0px 0 20px;
	font-size: 18px;

	.published-at {
		display: flex;
		align-items: center;
	}
	.published-at__icon {
		font-size: 18px;
	}
	.special-panel__buttons {
		display: flex;
		font-size: 20px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
