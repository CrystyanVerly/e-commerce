import React from 'react';
import styles from './FeaturedProducts.module.css';
import useProducts from '../../../hooks/useProducts';

import ProductGrid from '../../../components/layout/ProductGrid/ProductGrid';

const FeaturedProducts = () => {
	const { products, loading, error, refetch } = useProducts({
		sort: 'newest',
		limit: 8,
	});

	if (loading) {
		return (
			<section className={styles.section}>
				<div className={styles.container}>
					<p>Carregando produtos...</p>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className={styles.section}>
				<div className={styles.container}>
					<p>Não foi possível carregar os produtos.</p>

					<button type="button" onClick={refetch}>
						Tentar novamente
					</button>
				</div>
			</section>
		);
	}

	if (products.length === 0) return null;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>News</h2>
				</div>

				<ProductGrid products={products} />
			</div>
		</section>
	);
};

export default FeaturedProducts;
