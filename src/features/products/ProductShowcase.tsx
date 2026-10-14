import React from 'react';
import { Link } from 'react-router-dom';

import Slide from 'tslider';
import 'tslider/style.css';

import styles from './ProductShowcase.module.css';
import type { Product } from '../../types/product';
import ProductCard from '../../components/layout/ProductCard/ProductCard';

interface ProductShowcaseProps {
	title: string;
	eyebrow?: string;
	products: Product[];
	viewAllTo?: string;
}

const ProductShowcase = ({
	title,
	eyebrow,
	products,
	viewAllTo,
}: ProductShowcaseProps) => {
	const id = React.useId().replaceAll(':', '');

	const wrapperId = `showcase-wrapper-${id}`;
	const railId = `showcase-rail-${id}`;

	React.useEffect(() => {
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
					delay: 4000,
				},
			},
		});

		slider.init();

		return () => {
			slider.destroy();
		};
	}, [products.length, wrapperId, railId]);

	if (products.length === 0) return null;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div>
						{eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

						<h2 className={styles.title}>{title}</h2>
					</div>

					{viewAllTo && (
						<Link to={viewAllTo} className={styles.viewAll}>
							View all
						</Link>
					)}
				</div>

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
