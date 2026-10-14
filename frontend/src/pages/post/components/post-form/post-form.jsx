/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, useEffect } from 'react';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils/sanitize-content';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../actions';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const PostFormContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [title, imageUrl]);

	const contentRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				onChange={({ target }) => setImageUrlValue(target.value)}
				placeholder="Изображение ..."
			/>
			<Input
				value={titleValue}
				onChange={({ target }) => setTitleValue(target.value)}
				placeholder="Заголовок ..."
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButton={<Icon id="fa-floppy-o" margin="1.5px 10px 0 0" onClick={onSave} />}
			/>
			<div ref={contentRef} contentEditable={true} suppressContentEditableWarning={true} className="content">
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
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
