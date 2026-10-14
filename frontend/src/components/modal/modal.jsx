import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import { selectModalText, selectModalOnConfirm, selectModalOnCancel, selectModalIsOpen } from '../../selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) return;
	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 20;
	text-align: center;

	& .overlay {
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.box {
		position: relative;
		z-index: 30;
		top: 50%;
		transform: translate(0, -50%);
		margin: auto;
		width: 400px;
		padding: 0 20px 20px 20px;
		background-color: #fff;
		border: 3px solid #000;
	}
	.buttons {
		display: flex;
		justify-content: center;
	}
	.buttons > button {
		margin: 10px;
	}
`;
