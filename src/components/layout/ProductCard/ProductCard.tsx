import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import type { Product } from '../../../types/product';
import formatPrice from '../../../utils/formatPrice';

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const image = product.images[0];
	return (
		<article className={styles.card}>
			<div className={styles.imageWrapper}>
				<img
					src={image.url}
					alt={image.alt ?? product.name}
					className={styles.image}
					loading="lazy"
				/>
			</div>

			<div className={styles.content}>
				<span className={styles.category}>{product.category.name}</span>

				<Link to={`/product/${product.slug}`} className={styles.productLink}>
					<h3 className={styles.name}>{product.name}</h3>
				</Link>

				<span className={styles.price}>
					{formatPrice(product.priceInCents)}
				</span>
			</div>
		</article>
	);
};

export default ProductCard;
