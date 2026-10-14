/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButtonContainer = ({ children, className, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(StyledButtonContainer)`
	width: ${({ width = '100%' }) => width};
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	border: 1px solid rgb(0, 0, 0);
	background-color: rgb(238, 238, 238);
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
