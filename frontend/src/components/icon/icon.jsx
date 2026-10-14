/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, onClick, ...props }) => (
	<div className={className} {...props} onClick={onClick}>
		<i className={`fa ${id}`} aria-hidden="true" {...props} />
	</div>
);
export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

	&:hover {
		cursor: ${({ $inactive }) => ($inactive ? 'default' : 'pointer')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	$inactive: PropTypes.bool,
};
