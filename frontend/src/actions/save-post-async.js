import { setPostData } from './set-post-data.js';
import { request } from '../utils';

export const savePostAsync = (id, newPostData) => (dispatch) => {
	const saveRequest = id
		? request(`/api/posts/${id}`, 'PATCH', newPostData)
		: request('/api/posts', 'POST', newPostData);

	return saveRequest.then((updatedPostData) => {
		dispatch(setPostData(updatedPostData.data));

		return updatedPostData.data;
	});
};
