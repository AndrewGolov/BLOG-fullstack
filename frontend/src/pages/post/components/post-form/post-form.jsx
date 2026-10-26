/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, useEffect } from 'react';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils/sanitize-content';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../actions';
import { PROP_TYPE } from '../../../../constants';
import { PreviewImgComponent } from './components';
import styled from 'styled-components';

const PostFormContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [imageFile, setImageFile] = useState(null);
	const [titleValue, setTitleValue] = useState(title);
	console.log('id:', id);
	console.log('title:', title);
	console.log('imageUrl:', imageUrl);
	console.log('content:', content);
	console.log('publishedAt:', publishedAt);

	const onUploadFile = ({ target }) => {
		if (!target.files || target.files.length === 0) return;
		const file = target.files[0];
		setImageFile(file);
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [title, imageUrl]);

	const contentRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSave = () => {
		const formData = new FormData();
		const newContent = sanitizeContent(contentRef.current.innerHTML);
		formData.append('title', titleValue);
		formData.append('content', newContent);

		if (imageFile) {
			formData.append('image', imageFile);
		}

		dispatch(savePostAsync(id, formData)).then(({ id }) => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<div className="upload-file">
				<div className="upload-file__header">
					<div>
						<h3>Изображение поста</h3>
						<p>JPG, PNG, WEBP или GIF. Максимум 5 МБ.</p>
					</div>

					<label className="upload-file__button" htmlFor="imageFile">
						{imageFile || imageUrlValue ? 'Изменить изображение' : 'Выбрать файл'}
					</label>

					<input
						className="upload-file__input"
						onChange={onUploadFile}
						type="file"
						id="imageFile"
						name="imageFile"
						accept="image/jpeg,image/png,image/webp,image/gif"
					/>
				</div>

				{imageFile ? (
					<PreviewImgComponent imageFile={imageFile} />
				) : imageUrlValue ? (
					<PreviewImgComponent imageUrl={imageUrlValue} />
				) : null}
			</div>

			<Input
				className="title"
				value={titleValue}
				onChange={({ target }) => setTitleValue(target.value)}
				placeholder="Заголовок ..."
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButton={<Icon id="fa-floppy-o" margin="1.5px 10px 0 0" onClick={onSave} />}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="content"
				placeholder="Добавьте контент"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}
	& h2 {
		margin: 20px 0px;
	}
	& .content {
		white-space: pre-line;
		min-height: 80px;
		border: 1px solid #000;
	}

	.upload-file {
		margin: 20px 0;
		padding: 20px;
		background: rgb(85, 91, 110);
		border: 1px dashed #555b6e;
		border-radius: 12px;
	}

	.upload-file__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.upload-file__header h3 {
		margin: 0 0 6px;
		color: #f0f1f5;
		font-size: 16px;
		font-weight: 600;
	}

	.upload-file__header p {
		margin: 0;
		color: #a7adbd;
		font-size: 13px;
	}

	.upload-file__input {
		display: none;
	}

	.upload-file__button {
		flex-shrink: 0;
		padding: 10px 16px;
		color: #fff;
		background: #3b82f6;
		border-radius: 8px;
		cursor: pointer;
		font-size: 14px;
		transition: background 0.2s ease;
	}

	.upload-file__button:hover {
		background: #2563eb;
	}

	.upload-file__button:focus-within {
		outline: 2px solid #93c5fd;
		outline-offset: 3px;
	}

	.title {
		padding: 20px;
		background: rgb(85, 91, 110);
		border: 1px dashed #555b6e;
		border-radius: 12px;
		color: #fff;
	}
	.title::placeholder {
		color: #fff;
	}

	.content {
		padding: 20px;
		background: rgb(85, 91, 110);
		border: 1px dashed #555b6e;
		border-radius: 12px;
		color: #fff;
	}

	@media (max-width: 600px) {
		.upload-file {
			padding: 14px;
		}

		.upload-file__header {
			align-items: flex-start;
			flex-direction: column;
		}

		.upload-file__preview-wrapper {
			align-items: flex-start;
			flex-direction: column;
		}

		.upload-file__preview {
			width: 100%;
			height: 200px;
		}
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
