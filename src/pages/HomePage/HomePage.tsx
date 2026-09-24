import React from 'react';

import { Hero } from './components/Hero/Hero';
import FeaturedProducts from '../../features/products/FeaturedProducts/FeaturedProducts';

const HomePage = () => {
	return (
		<>
			<Hero />
			<FeaturedProducts />
		</>
	);
};

export default HomePage;
