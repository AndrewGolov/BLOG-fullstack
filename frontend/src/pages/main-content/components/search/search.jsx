/* eslint-disable react-refresh/only-export-components */
import { Icon, Input } from '../../../../components';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const SearchContainer = ({ className, onChange, searchPost }) => {
	return (
		<div className={className}>
			<Input type="text" placeholder="Поиск по заголовкам ..." value={searchPost} onChange={onChange} />
			<Icon id="fa fa-search" margin="0 10px 0 10px" size="20px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	width: 340px;
	height: 40px;
	align-items: center;
	border: 1px solid #000;
	margin: 0 auto;

	input {
		padding: 10px;
		border: none;
		width: 100%;
		height: 100%;
		margin: 0;
	}
	input:focus {
		outline: none;
		border: none;
	}
`;

Search.propTypes = {
	onChange: PropTypes.func.isRequired,
	searchPost: PropTypes.string.isRequired,
};
