import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { request } from '../../utils';
import { Input, Button, H2, AuthFormError } from '../../components';
import { useResetForm } from '../../hooks';
import { Link, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRoleId } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const FormStyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 260px;
	}
`;

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите Login')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Логин должен быть не менее 3 символов')
		.max(20, 'Логин должен быть не более 20 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(/^[\w#%]+$/, 'Неверный пароль. Допускаются только буквы, цифры и символы #, %')
		.min(6, 'Пароль не должен быть меньше 6 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

export const Authorization = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
		mode: 'onChange',
	});

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ login, password }) => {
		request('/api/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) return setServerError(`Ошибка запроса: ${error}`);
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;
	const roleId = useSelector(selectUserRoleId);

	useResetForm(reset);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}
	return (
		<FormStyledContainer>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</FormStyledContainer>
	);
};
