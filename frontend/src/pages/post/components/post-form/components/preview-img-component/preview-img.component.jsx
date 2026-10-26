/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const PreviewImgComponentContainer = ({ className, imageFile, imageUrl }) => {
	const [previewUrl, setPreviewUrl] = useState(imageUrl || null);

	useEffect(() => {
		if (!imageFile) {
			return;
		}

		const objUrl = URL.createObjectURL(imageFile);
		setPreviewUrl(objUrl);

		return () => {
			URL.revokeObjectURL(objUrl);
		};
	}, [imageFile]);

	return (
		<div className={className}>
			<img className="upload-file__preview" src={previewUrl} alt="Предпросмотр изображения" />

			{imageFile && (
				<div className="upload-file__file-info">
					<span>{imageFile.name}</span>
					<span>{(imageFile.size / 1024 / 1024).toFixed(2)} МБ</span>
				</div>
			)}
		</div>
	);
};

export const PreviewImgComponent = styled(PreviewImgComponentContainer)`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid #3b3e49;

	.upload-file__preview {
		display: block;
		float: none;
		width: 180px;
		height: 120px;
		object-fit: cover;
		margin: 0;
		border-radius: 8px;
		background: #191a20;
	}

	.upload-file__file-info {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
		color: #d8dce7;
		font-size: 13px;
	}

	.upload-file__file-info span:first-child {
		overflow-wrap: anywhere;
	}
`;
