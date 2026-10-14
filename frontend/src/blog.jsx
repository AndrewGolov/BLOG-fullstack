import { Routes, Route } from 'react-router-dom';
import { Header, Footer, Modal, Error } from './components';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import { Authorization, Registration, Users, Post, MainContent } from './pages';
import { ERROR } from './constants';
import { useLayoutEffect } from 'react';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 1000px;
	height: fit-content;
	background-color: #fff;
	color: #000;
	margin: 0 auto;
`;

const Page = styled.div`
	padding: 120px 0 0 0;
	text-align: center;
`;

export const Blog = () => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) return;
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />

			<Page>
				<Routes>
					<Route path="/" element={<MainContent />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_FOUND} />} />
				</Routes>
			</Page>

			<Footer />
			<Modal />
		</AppColumn>
	);
};
