import { addComment } from './add-comment';
import { request } from '../utils';

export const addCommentAsync = (postId, content) => (dispatch) =>
	request(`/api/posts/${postId}/comments`, 'POST', { content }).then((comment) => dispatch(addComment(comment.data)));
