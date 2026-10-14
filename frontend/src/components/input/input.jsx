/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputStyledContainer = ({ className, ...props }) => <input className={className} {...props} />;

export const Input = styled(InputStyledContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px 0;
	padding: 10px;
	border: 1px solid #000;
	font-size: 18px;
`;

Input.propTypes = {
	width: PropTypes.string,
};
