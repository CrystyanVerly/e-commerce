import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import ListingPage from '../pages/ListingPage/ListingPage';
import { StoreLayout } from '../layouts/StoreLayout/StoreLayout';
import { ProductPage } from '../pages/ProductPage/ProductPage';

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
				element: <ListingPage />,
			},
			{
				path: '/product/:slug',
				element: <ProductPage />,
			},
		],
	},
]);
