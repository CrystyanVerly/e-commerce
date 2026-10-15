import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import { StoreLayout } from '../layouts/StoreLayout/StoreLayout';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Cart from '../pages/Cart/Cart';
import Login from '../pages/Login/Login';

import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ShopPage from '../pages/ShopPage/ShopPage';

export const router = createBrowserRouter([
	{
		element: <StoreLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/shop',
				element: <ShopPage />,
			},
			{
				path: '/product/:slug',
				element: <ProductPage />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/contact',
				element: <Contact />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
