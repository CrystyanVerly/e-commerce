import { Link } from 'react-router-dom';

import femaleBanner from '../../../assets/home/female-banner.webp';
import maleBanner from '../../../assets/home/male-banner.webp';

import styles from './GenderShowcase.module.css';
import { Button } from '../../../components/ui/Button/Button';

const GenderShowcase = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<Link to="/shop?gender=male" className={styles.banner}>
					<img src={maleBanner} alt="" loading="lazy" />

					<div className={styles.content}>
						<h2>Men's</h2>

						<Button variant="secondary">Shop now</Button>
					</div>
				</Link>

				<Link to="/shop?gender=female" className={styles.banner}>
					<img src={femaleBanner} alt="" loading="lazy" />

					<div className={styles.content}>
						<h2>Women's</h2>

						<Button variant="secondary">Shop now</Button>
					</div>
				</Link>
			</div>
		</section>
	);
};

export default GenderShowcase;
