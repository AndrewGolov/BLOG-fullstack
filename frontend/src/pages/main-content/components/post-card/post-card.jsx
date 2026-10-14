/* eslint-disable react-refresh/only-export-components */
import { Icon } from '../../../../components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCardContainer = ({ className, id, title, publishedAt, imageUrl, commentsCount }) => {
	return (
		<div className={className} key={id}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-info">
					<h4>{title}</h4>
					<div className="post-card-footer">
						<div className="published-at">
							{publishedAt && (
								<Icon
									id="fa-calendar-o"
									className="published-at__icon"
									margin="0 10px 0 0"
									$inactive={true}
									size="20px"
								/>
							)}
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon id="fa-comment-o" className="comments-count__icon" margin="0 4px 0 0" size="20px" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	margin: 20px;
	border: 1px solid #000;
	text-align: left;

	& img {
		display: block;
		width: 100%;
	}
	h4 {
		margin: 0;
		padding: 5px;
	}
	.post-card-info {
		border-top: 1px solid #000;
	}
	.post-card-footer {
		display: flex;
		justify-content: space-between;
		padding: 5px;
	}
	.published-at {
		display: flex;
		align-items: center;
	}
	.comments-count {
		display: flex;
		align-items: center;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
