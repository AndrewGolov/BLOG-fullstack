export const request = (url, method, data) =>
	fetch(url, {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		body: data ? JSON.stringify(data) : undefined,
	}).then((response) => response.json());
