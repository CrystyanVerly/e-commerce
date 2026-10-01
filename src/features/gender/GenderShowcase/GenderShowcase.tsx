import { Link } from 'react-router-dom';

import femaleBanner from '../../../assets/home/female-banner.webp';
import maleBanner from '../../../assets/home/male-banner.webp';

import buttonStyles from '../../../components/ui/Button/Button.module.css';
import styles from './GenderShowcase.module.css';

const GenderShowcase = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<Link to="/shop?gender=male" className={styles.banner}>
					<img src={maleBanner} alt="" loading="lazy" />

					<div className={styles.content}>
						<h2>Men's</h2>

						<span
							className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.cta}`}
						>
							Shop now
						</span>
					</div>
				</Link>

				<Link to="/shop?gender=female" className={styles.banner}>
					<img src={femaleBanner} alt="" loading="lazy" />

					<div className={styles.content}>
						<h2>Women's</h2>

						<span
							className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.cta}`}
						>
							Shop now
						</span>
					</div>
				</Link>
			</div>
		</section>
	);
};

export default GenderShowcase;
