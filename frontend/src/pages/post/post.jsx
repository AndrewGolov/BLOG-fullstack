/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { selectPost } from '../../selectors';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { Error, PrivateContent } from '../../components';
import { PostContent, Comments, PostForm } from './components';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const post = useSelector(selectPost);

	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');

	useEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [isCreating, dispatch, params.id]);

	if (isLoading) return null;

	return error ? (
		<Error error={error} />
	) : isCreating || isEditing ? (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<PostForm post={post} />
			</div>
		</PrivateContent>
	) : (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	text-align: start;
	padding: 10px 80px;
`;
