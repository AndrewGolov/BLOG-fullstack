/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState, useEffect } from 'react';
import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { request } from '../../utils';
import { debounce } from './utils';
import styled from 'styled-components';

const MainContentContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(({ data }) => {
			setPosts(data.posts);
			setLastPage(data.lastPage);
		});
	}, [page, shouldSearch, searchPhrase]);

	const startDelaySearch = useMemo(() => debounce(setShouldSearch, 2000), []);
	const onChangeSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelaySearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search onChange={onChangeSearch} searchPost={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(({ id, title, publishedAt, imageUrl, comments }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								publishedAt={publishedAt}
								imageUrl={imageUrl}
								commentsCount={comments.length}
							/>
						))}
					</div>
				) : (
					<div className="no-posts">Такие посты не найдены</div>
				)}
			</div>

			{lastPage > 1 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
		</div>
	);
};
export const MainContent = styled(MainContentContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 20px;

	.post-list {
		display: flex;
		flex-wrap: wrap;
	}
	.no-posts {
		margin-top: 40px;
		font-size: 30px;
		text-align: center;
	}
`;
