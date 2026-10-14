/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRoleId } from '../../../../selectors';
import { PROP_TYPE, ROLE } from '../../../../constants';
import { addCommentAsync } from '../../../../actions';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRoleId);

	const [newComment, setNewComment] = useState('');

	const onNewCommentAdd = (postId) => {
		if (!newComment) {
			alert('Поле не должно быть пустым');
			return;
		}
		dispatch(addCommentAsync(postId, newComment));
		setNewComment('');
	};

	const onWriteComment = ({ target }) => setNewComment(target.value);
	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment__container">
					<textarea
						className="new-comment__container_textarea"
						onChange={onWriteComment}
						value={newComment}
						placeholder="Комментарий..."
						name="comment"
					/>
					<Icon
						id="fa-paper-plane-o"
						margin="0 10px 0 10px"
						size="18px"
						onClick={() => onNewCommentAdd(postId)}
					/>
				</div>
			)}
			<div className="comments-list">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						isGuest={isGuest}
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 0 auto;
	width: 580px;

	& .new-comment__container {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}
	.new-comment__container_textarea {
		width: 100%;
		height: 120px;
		font-size: 18px;
		resize: none;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
