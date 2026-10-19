import { useSearchParams } from 'react-router-dom';

import ProductGrid from '../../components/layout/ProductGrid/ProductGrid';
import { Button } from '../../components/ui/Button/Button';

import useProducts from '../../hooks/useProducts';
import { useProductFilters } from '../../hooks/useProductFilters';

import closeBtn from '../../assets/icons/Close.svg';
import ChevronDown from '../../assets/icons/ChevronDown.svg';
import arrowRight from '../../assets/icons/ArrowRight.svg';
import arrowLeft from '../../assets/icons/ArrowLeft.svg';

import styles from './ShopPage.module.css';

const ShopPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const gender = searchParams.get('gender') ?? undefined;

	const categories = searchParams.getAll('category');

	const colors = searchParams.getAll('color');

	const sizes = searchParams.getAll('size');

	const minPriceParam = searchParams.get('minPrice');

	const maxPriceParam = searchParams.get('maxPrice');

	const minPrice = minPriceParam ? Number(minPriceParam) : undefined;

	const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

	const { filters: filterOptions, loading: filtersLoading } =
		useProductFilters();

	const { products, pagination, loading, error, refetch } = useProducts({
		gender,

		category: categories.length > 0 ? categories : undefined,

		color: colors.length > 0 ? colors : undefined,

		size: sizes.length > 0 ? sizes : undefined,

		minPrice,
		maxPrice,

		page: 1,
		limit: 12,
	});

	const initialLoading = loading && pagination === null;

	const isUpdating = loading && pagination !== null;

	const updateSingleFilter = (key: string, value?: string) => {
		setSearchParams((current) => {
			const params = new URLSearchParams(current);

			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}

			params.set('page', '1');

			return params;
		});
	};

	const toggleFilter = (key: string, value: string) => {
		setSearchParams((current) => {
			const params = new URLSearchParams(current);

			const values = params.getAll(key);

			params.delete(key);

			if (values.includes(value)) {
				values
					.filter((item) => item !== value)
					.forEach((item) => {
						params.append(key, item);
					});
			} else {
				[...values, value].forEach((item) => {
					params.append(key, item);
				});
			}

			params.set('page', '1');

			return params;
		});
	};

	const removeFilter = (key: string, value?: string) => {
		setSearchParams((current) => {
			const params = new URLSearchParams(current);

			if (!value) {
				params.delete(key);

				return params;
			}

			const values = params.getAll(key);

			params.delete(key);

			values
				.filter((item) => item !== value)
				.forEach((item) => {
					params.append(key, item);
				});

			params.set('page', '1');

			return params;
		});
	};

	const hasActiveFilters =
		Boolean(gender) ||
		categories.length > 0 ||
		colors.length > 0 ||
		sizes.length > 0 ||
		minPrice !== undefined ||
		maxPrice !== undefined;

	if (initialLoading || (filtersLoading && !filterOptions)) {
		return null;
	}

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
					<span className={styles.eyebrow}>Collection</span>

					<h1 className={styles.title}>Shop</h1>
				</header>

				<div className={styles.layout}>
					<aside className={styles.sidebar}>
						{/* GENDER */}

						<div className={styles.filterGroup}>
							<h2>Gender</h2>

							<label className={styles.radio}>
								<input
									type="radio"
									name="gender"
									checked={!gender}
									onChange={() => updateSingleFilter('gender')}
								/>

								<span>All</span>
							</label>

							<label className={styles.radio}>
								<input
									type="radio"
									name="gender"
									checked={gender === 'male'}
									onChange={() => updateSingleFilter('gender', 'male')}
								/>

								<span>Men</span>
							</label>

							<label className={styles.radio}>
								<input
									type="radio"
									name="gender"
									checked={gender === 'female'}
									onChange={() => updateSingleFilter('gender', 'female')}
								/>

								<span>Women</span>
							</label>
						</div>

						{/* CATEGORIES */}

						<div className={styles.filterGroup}>
							<h2>Categories</h2>

							{filterOptions?.categories.map((item) => (
								<label key={item.slug} className={styles.checkbox}>
									<input
										type="checkbox"
										checked={categories.includes(item.slug)}
										onChange={() => toggleFilter('category', item.slug)}
									/>

									<span>{item.name}</span>
								</label>
							))}
						</div>

						{/* COLORS */}

						<div className={styles.filterGroup}>
							<h2>Color</h2>

							<div className={styles.colors}>
								{filterOptions?.colors.map((color) => {
									const active = colors.includes(color);

									return (
										<button
											key={color}
											type="button"
											className={`${styles.color} ${
												active ? styles.colorActive : ''
											}`}
											style={{
												backgroundColor: color.toLowerCase(),
											}}
											aria-label={color}
											aria-pressed={active}
											title={color}
											onClick={() => toggleFilter('color', color)}
										/>
									);
								})}
							</div>
						</div>

						{/* SIZES */}

						<div className={styles.filterGroup}>
							<h2>Size</h2>

							<div className={styles.sizes}>
								{filterOptions?.sizes.map((size) => {
									const active = sizes.includes(size);

									return (
										<button
											key={size}
											type="button"
											className={active ? styles.sizeActive : ''}
											aria-pressed={active}
											onClick={() => toggleFilter('size', size)}
										>
											{size}
										</button>
									);
								})}
							</div>
						</div>

						{/* PRICE */}

						<div className={styles.filterGroup}>
							<h2>Price</h2>

							<input
								className={styles.range}
								type="range"
								min={filterOptions?.price.min ?? 0}
								max={filterOptions?.price.max ?? 0}
								defaultValue={filterOptions?.price.max ?? 0}
							/>

							<div className={styles.priceRange}>
								<span>
									R$ {((filterOptions?.price.min ?? 0) / 100).toFixed(2)}
								</span>

								<span>
									R$ {((filterOptions?.price.max ?? 0) / 100).toFixed(2)}
								</span>
							</div>
						</div>
					</aside>

					<section className={styles.results}>
						{/* APPLIED FILTERS */}

						<div className={styles.applied}>
							<span className={styles.appliedTitle}>Applied filters</span>

							<div className={styles.chips}>
								{gender && (
									<button type="button" onClick={() => removeFilter('gender')}>
										{gender === 'male' ? 'Men' : 'Women'}

										<span>
											<img src={closeBtn} alt="" />
										</span>
									</button>
								)}

								{categories.map((category) => {
									const option = filterOptions?.categories.find(
										(item) => item.slug === category,
									);

									return (
										<button
											key={category}
											type="button"
											onClick={() => removeFilter('category', category)}
										>
											{option?.name ?? category}

											<span>
												<img src={closeBtn} alt="" />
											</span>
										</button>
									);
								})}

								{colors.map((color) => (
									<button
										key={color}
										type="button"
										onClick={() => removeFilter('color', color)}
									>
										{color}

										<span>
											<img src={closeBtn} alt="" />
										</span>
									</button>
								))}

								{sizes.map((size) => (
									<button
										key={size}
										type="button"
										onClick={() => removeFilter('size', size)}
									>
										Size {size}
										<span>
											<img src={closeBtn} alt="" />
										</span>
									</button>
								))}

								{hasActiveFilters && (
									<Button
										type="button"
										variant="outline"
										onClick={() => setSearchParams({})}
									>
										Clear filters
									</Button>
								)}
							</div>
						</div>

						{/* RESULTS HEADER */}

						<div className={styles.resultsHeader}>
							<span className={styles.count}>
								Showing {pagination?.total ?? products.length} results
							</span>

							<button type="button" className={styles.sort}>
								Sort by
								<span>
									<img src={ChevronDown} alt="" />
								</span>
							</button>
						</div>

						<div
							className={`${styles.productArea} ${
								isUpdating ? styles.updating : ''
							}`}
							aria-busy={isUpdating}
						>
							{products.length > 0 ? (
								<ProductGrid products={products} />
							) : (
								<div className={styles.emptyState}>
									<span className={styles.emptyEyebrow}>No matches</span>

									<h2>No products found.</h2>

									<p>Try changing or removing some of your filters.</p>

									{hasActiveFilters && (
										<Button
											type="button"
											variant="outline"
											onClick={() => setSearchParams({})}
										>
											Clear filters
										</Button>
									)}
								</div>
							)}
						</div>

						{/* PAGINATION */}

						{products.length > 0 && pagination && pagination.totalPages > 1 && (
							<nav className={styles.pagination} aria-label="Pagination">
								<button type="button" aria-label="Previous page">
									<img src={arrowLeft} alt="" />
								</button>

								<button type="button" className={styles.activePage}>
									1
								</button>

								<button type="button">2</button>

								<button type="button">3</button>

								<span>...</span>

								<button type="button">8</button>

								<button type="button" aria-label="Next page">
									<img src={arrowRight} alt="" />
								</button>
							</nav>
						)}
					</section>
				</div>
			</div>
		</main>
	);
};

export default ShopPage;
