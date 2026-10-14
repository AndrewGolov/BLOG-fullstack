import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { request } from '../../utils';
import { useState } from 'react';
import { Input, Button, H2, AuthFormError } from '../../components';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRoleId } from '../../selectors';
import { useResetForm } from '../../hooks';
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

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required('Поле совпадения паролей не должно быть пустым')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const Registration = () => {
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
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
		mode: 'onChange',
	});

	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectUserRoleId);

	const onSubmit = async ({ login, password }) => {
		request('/api/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) return setServerError(`Ошибка запроса: ${error}`);
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	useResetForm(reset);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}
	return (
		<FormStyledContainer>
			<H2>Регистрация</H2>
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
				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</FormStyledContainer>
	);
};
