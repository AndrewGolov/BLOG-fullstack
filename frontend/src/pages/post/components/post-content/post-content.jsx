/* eslint-disable react-refresh/only-export-components */
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const PostContentContainer = ({ className, post }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={post.imageUrl} alt={post.title} />
			<H2>{post.title}</H2>
			<SpecialPanel
				publishedAt={post.publishedAt}
				id={post.id}
				editButton={
					<Icon
						id="fa-pencil-square-o"
						margin="1.5px 10px 0 0"
						onClick={() => navigate(`/post/${post.id}/edit`)}
					/>
				}
			/>
			<div className="content">{post.content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}
	& h2 {
		margin: 20px 0px;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST,
};
