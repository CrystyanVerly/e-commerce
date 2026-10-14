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

const getItemsPerView = () => {
	const width = window.innerWidth;

	if (width >= 1200) return 4;

	if (width >= 768) return 3;

	if (width >= 480) return 2;

	return 1;
};

const ProductShowcase = ({
	title,
	eyebrow,
	products,
	viewAllTo,
}: ProductShowcaseProps) => {
	const id = React.useId().replaceAll(':', '');

	const wrapperId = `showcase-wrapper-${id}`;
	const railId = `showcase-rail-${id}`;

	const [itemsPerView, setItemsPerView] = React.useState(getItemsPerView);

	React.useEffect(() => {
		const handleResize = () => {
			const nextItemsPerView = getItemsPerView();

			setItemsPerView((current) => {
				if (current === nextItemsPerView) {
					return current;
				}

				return nextItemsPerView;
			});
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	React.useEffect(() => {
		if (products.length === 0) return;

		const slider = new Slide({
			wrapper: `#${wrapperId}`,
			rail: `#${railId}`,

			options: {
				loop: true,
				itemsPerView,
				slideBy: 'item',

				autoplay: {
					enabled: true,
					delay: 3500,
				},
			},
		});

		slider.init();

		return () => {
			slider.destroy();
		};
	}, [products.length, itemsPerView, wrapperId, railId]);

	if (products.length === 0) {
		return null;
	}

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
