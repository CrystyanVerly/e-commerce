import { Hero } from './components/Hero/Hero';

import GenderShowcase from '../../features/gender/GenderShowcase/GenderShowcase';
import ProductShowcase from '../../features/products/ProductShowcase';

const HomePage = () => {
	return (
		<>
			<Hero />
			<GenderShowcase />
			<ProductShowcase
				eyebrow="New arrivals"
				title="Latest pieces"
				filters={{ sort: 'newest', limit: 8 }}
			/>
		</>
	);
};

export default HomePage;
