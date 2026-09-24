import { Hero } from './components/Hero/Hero';
import FeaturedProducts from '../../features/products/FeaturedProducts/FeaturedProducts';
import GenderShowcase from '../../features/gender/GenderShowcase/GenderShowcase';

const HomePage = () => {
	return (
		<>
			<Hero />
			<GenderShowcase />
			<FeaturedProducts />
		</>
	);
};

export default HomePage;
