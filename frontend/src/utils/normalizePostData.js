export const normalizePostData = (postData) => ({
	...postData,
	publishedAt: new Date(postData.publishedAt).toLocaleString(),
});
