export const request = (url, method, data) => {
	const isFormData = data instanceof FormData;
	return fetch(url, {
		method: method || 'GET',

		headers: isFormData
			? undefined
			: {
					'Content-Type': 'application/json',
				},
		body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
	}).then((response) => response.json());
};
