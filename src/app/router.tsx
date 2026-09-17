import { createBrowserRouter } from 'react-router-dom';
import StoreLayout from '../layouts/StoreLayout/StoreLayout';
import HomePage from '../pages/Home/HomePage';
import ListingPage from '../pages/Listing/ListingPage';
import ProductPage from '../pages/Products/ProductPage';

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
