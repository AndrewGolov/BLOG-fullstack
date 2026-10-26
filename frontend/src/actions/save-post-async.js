import { setPostData } from './set-post-data.js';
import { request } from '../utils';

export const savePostAsync = (id, formData) => (dispatch) => {
	const saveRequest = id
		? request(`/api/posts/${id}`, 'PATCH', formData)
		: request('/api/posts/create', 'POST', formData);

	return saveRequest.then((postData) => {
		console.log('SAVE_POST_ASYNC:', postData);
		dispatch(setPostData(postData.data));

		return postData.data;
	});
};
