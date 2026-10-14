import { removeComment } from './remove-comment';
import { request } from '../utils';

export const removeCommentAsync = (postId, id) => (dispatch) =>
	request(`/api/posts/${postId}/comments/${id}`, 'DELETE').then(() => dispatch(removeComment(id)));
