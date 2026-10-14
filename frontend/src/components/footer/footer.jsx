import { useState, useEffect } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	background-color: #fff;
	padding: 20px 40px;
	box-shadow: 0 2px 17px #000;
`;

export const Footer = () => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?lat=55.750596&lon=37.618475&units=metric&lang=ru&appid=4d057cb069c35bcf602725455fdc0c06',
		)
			.then((data) => data.json())
			.then((data) => {
				setCity(data.name);
				setTemperature(Math.round(data.main.temp));
				setWeather(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
			});
	}, []);

	return (
		<FooterContainer>
			<div>
				<div>Блог веб-разработчика</div>
				<div>@telegram andre_g_life</div>
			</div>

			<div>
				<div>
					{city} {new Date().toLocaleString('ru-RU', { day: 'numeric', month: 'long' })}
				</div>
				<div>{temperature}°C</div>
				<div>{weather}</div>
			</div>
		</FooterContainer>
	);
};
