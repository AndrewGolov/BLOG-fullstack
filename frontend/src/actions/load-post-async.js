import { setPostData } from './set-post-data';
import { request, normalizePostData } from '../utils';

export const loadPostAsync = (postId) => (dispatch) =>
	request(`/api/posts/${postId}`).then((postData) => {
		if (postData.data) {
			dispatch(setPostData(normalizePostData(postData.data)));
		}
		return postData;
	});
