import { Hero } from './components/Hero/Hero';

import GenderShowcase from '../../features/gender/GenderShowcase/GenderShowcase';
import ProductShowcase from '../../features/products/ProductShowcase';
import Newsletter from '../../features/newsletter/Newsletter';

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

			<Newsletter />

			<ProductShowcase
				eyebrow="The essentials"
				title="Everyday favorites"
				filters={{ category: 't-shirts', limit: 8 }}
				viewAllTo="/shop?category=t-shirts"
			/>
		</>
	);
};

export default HomePage;
