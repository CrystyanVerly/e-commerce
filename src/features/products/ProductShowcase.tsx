import React from 'react';
import { Link } from 'react-router-dom';
import Slide from 'tslider';

import styles from './ProductShowcase.module.css';
import type { ProductFilters } from '../../types/product';
import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/layout/ProductCard/ProductCard';

interface ProductShowcaseProps {
	title: string;
	eyebrow?: string;
	filters: ProductFilters;
	viewAllTo?: string;
}

const ProductShowcase = ({
	title,
	eyebrow,
	filters,
	viewAllTo = '/shop',
}: ProductShowcaseProps) => {
	const id = React.useId().replaceAll(':', '');

	const wrapperId = `showcase-wrapper-${id}`;
	const railId = `showcase-rail-${id}`;

	const { products, loading, error } = useProducts(filters);

	React.useEffect(() => {
		if (loading) return;
		if (products.length === 0) return;

		const slider = new Slide({
			wrapper: `#${wrapperId}`,
			rail: `#${railId}`,

			options: {
				loop: true,
				itemsPerView: 4,
				slideBy: 'item',

				autoplay: {
					enabled: true,
					pauseOnHover: false,
					delay: 4000,
				},
			},
		});

		slider.init();

		return () => {
			slider.destroy();
		};
	}, [loading, products.length, wrapperId, railId]);

	if (loading) {
		return null;
	}

	if (error || products.length === 0) {
		return null;
	}

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<header className={styles.header}>
					<div>
						{eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

						<h2 className={styles.title}>{title}</h2>
					</div>

					<Link to={viewAllTo} className={styles.viewAll}>
						View all
					</Link>
				</header>

				<div id={wrapperId} className={styles.slider}>
					<div id={railId} className={styles.rail}>
						{products.map((product) => (
							<div key={product.id} data-slide="slide" className={styles.slide}>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductShowcase;
