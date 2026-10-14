/* eslint-disable react-refresh/only-export-components */
import { Icon } from '../../../../../../components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRoleId } from '../../../../../../selectors';
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../../../../actions';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import styled from 'styled-components';

const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRoleId);
	const hasAccess = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="comment-block">
				<div className="information-panel">
					<div className="information-panel__author">
						<Icon id="fa-user-circle-o" margin="0 10px 0 0" size="18px" $inactive={true} />
						{author}
					</div>
					<div className="information-panel__published-at">
						<Icon id="fa-calendar-o" margin="0 10px 0 0" size="18px" $inactive={true} />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{!hasAccess && (
				<Icon id="fa-trash-o" margin="0 10px 0 10px" size="20px" onClick={() => onCommentRemove(id, postId)} />
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	padding: 2px;

	& .comment-block {
		width: 100%;
		border: 1px solid #000;
		padding: 10px;
	}
	.information-panel {
		display: flex;
		justify-content: space-between;
	}
	.information-panel__author {
		display: flex;
	}
	.information-panel__published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
