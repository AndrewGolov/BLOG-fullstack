import { createRoot } from 'react-dom/client';
import { Blog } from './blog.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import './fonts/font-awesome.css';
import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<Blog />
		</Provider>
	</BrowserRouter>,
);
