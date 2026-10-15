import ProductGrid from '../../components/layout/ProductGrid/ProductGrid';
import { Button } from '../../components/ui/Button/Button';
import useProducts from '../../hooks/useProducts';

import styles from './ShopPage.module.css';

import closeBtn from '../../assets/icons/Close.svg';

import ChevronDown from '../../assets/icons/ChevronDown.svg';

import arrowRight from '../../assets/icons/ArrowRight.svg';
import arrowLeft from '../../assets/icons/ArrowLeft.svg';

const ShopPage = () => {
	const { products, loading, error, refetch } = useProducts({
		page: 1,
		limit: 12,
	});

	if (loading) return null;

	if (error) {
		return (
			<main className={styles.page}>
				<div className={styles.container}>
					<div className={styles.error}>
						<span className={styles.errorEyebrow}>Something went wrong</span>

						<h1>Unable to load products.</h1>

						<p>Check your connection and try again.</p>

						<Button type="button" variant="primary" onClick={refetch}>
							Try again
						</Button>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className={styles.page}>
			<div className={styles.container}>
				<header className={styles.pageHeader}>
					<div>
						<span className={styles.eyebrow}>Collection</span>

						<h1 className={styles.title}>Shop</h1>
					</div>
				</header>

				<div className={styles.layout}>
					<aside className={styles.sidebar}>
						<div className={styles.filterGroup}>
							<h2>Categories</h2>

							<label className={styles.checkbox}>
								<input type="checkbox" />
								<span>T-Shirts</span>
							</label>

							<label className={styles.checkbox}>
								<input type="checkbox" />
								<span>Sweatshirts</span>
							</label>

							<label className={styles.checkbox}>
								<input type="checkbox" />
								<span>Shirts</span>
							</label>

							<label className={styles.checkbox}>
								<input type="checkbox" />
								<span>Jackets</span>
							</label>

							<label className={styles.checkbox}>
								<input type="checkbox" />
								<span>Pants</span>
							</label>
						</div>

						<div className={styles.filterGroup}>
							<h2>Color</h2>

							<div className={styles.colors}>
								<button
									type="button"
									className={styles.colorWhite}
									aria-label="White"
								/>

								<button
									type="button"
									className={styles.colorBlack}
									aria-label="Black"
								/>

								<button
									type="button"
									className={styles.colorGreen}
									aria-label="Green"
								/>

								<button
									type="button"
									className={styles.colorBlue}
									aria-label="Blue"
								/>
							</div>
						</div>

						<div className={styles.filterGroup}>
							<h2>Size</h2>

							<div className={styles.sizes}>
								{['S', 'M', 'L', 'XL'].map((size) => (
									<button key={size} type="button">
										{size}
									</button>
								))}
							</div>
						</div>

						<div className={styles.filterGroup}>
							<h2>Price</h2>

							<input
								className={styles.range}
								type="range"
								min="0"
								max="500"
								defaultValue="250"
							/>

							<div className={styles.priceRange}>
								<span>R$ 0</span>
								<span>R$ 500</span>
							</div>
						</div>
					</aside>

					<section className={styles.results}>
						<div className={styles.applied}>
							<span className={styles.appliedTitle}>Applied filters</span>

							<div className={styles.chips}>
								<button type="button">
									T-Shirts
									<span>
										<img src={closeBtn} alt="" />
									</span>
								</button>

								<button type="button">
									Size M
									<span>
										<img src={closeBtn} alt="" />
									</span>
								</button>
							</div>
						</div>

						<div className={styles.resultsHeader}>
							<span className={styles.count}>
								Showing {products.length} results
							</span>

							<button type="button" className={styles.sort}>
								Sort by
								<span>
									<img src={ChevronDown} alt="" />
								</span>
							</button>
						</div>

						<ProductGrid products={products} />

						<nav className={styles.pagination} aria-label="Pagination">
							<button type="button" aria-label="Previous page">
								<img src={arrowLeft} alt="arrow right" />
							</button>

							<button type="button" className={styles.activePage}>
								1
							</button>

							<button type="button">2</button>

							<button type="button">3</button>

							<span>...</span>

							<button type="button">8</button>

							<button type="button" aria-label="Next page">
								<img src={arrowRight} alt="arrow right" />
							</button>
						</nav>
					</section>
				</div>
			</div>
		</main>
	);
};

export default ShopPage;
