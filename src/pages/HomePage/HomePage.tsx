import React from 'react';

import PageLoader from '../../components/ui/PageLoader/PageLoader';

import GenderShowcase from '../../features/gender/GenderShowcase/GenderShowcase';

import { usePageAssetsReady } from '../../hooks/usePageAssetsReady';

import logo from '../../assets/logo/icon-light.svg';

import useProducts from '../../hooks/useProducts';
import { Hero } from './components/Hero/Hero';
import ProductShowcase from '../../features/products/ProductShowcase';
import Newsletter from '../../features/newsletter/Newsletter';

const HomePage = () => {
	const pageRef = React.useRef<HTMLDivElement>(null);

	const [showLoader, setShowLoader] = React.useState(true);

	const latest = useProducts({
		sort: 'newest',
		limit: 8,
	});

	const essentials = useProducts({
		category: 't-shirts',
		limit: 8,
	});

	const apiLoading = latest.loading || essentials.loading;

	const apiError = latest.error || essentials.error;

	const apiReady = !apiLoading && !apiError;

	const assetsReady = usePageAssetsReady({
		enabled: apiReady,
		rootRef: pageRef,
	});

	const pageReady = apiReady && assetsReady;

	const handleRetry = () => {
		latest.refetch();
		essentials.refetch();
	};

	return (
		<>
			{showLoader && (
				<PageLoader
					ready={pageReady}
					error={Boolean(apiError)}
					logoSrc={logo}
					onRetry={handleRetry}
					onComplete={() => setShowLoader(false)}
				/>
			)}

			<div ref={pageRef}>
				<Hero />

				<ProductShowcase
					eyebrow="New arrivals"
					title="Latest pieces"
					products={latest.products}
					viewAllTo="/shop?sort=newest"
				/>

				<GenderShowcase />

				<ProductShowcase
					eyebrow="The essentials"
					title="Everyday favorites"
					products={essentials.products}
					viewAllTo="/shop?category=t-shirts"
				/>

				<Newsletter />
			</div>
		</>
	);
};

export default HomePage;
