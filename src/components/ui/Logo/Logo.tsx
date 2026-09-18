import { Link } from 'react-router-dom';

import logoLight from '../../../assets/logo/eccomerce-logo-light.svg';
import iconLight from '../../../assets/logo/icon-light.svg';

import styles from './Logo.module.css';

type LogoProps = {
	onClick?: () => void;
};

export function Logo({ onClick }: LogoProps) {
	return (
		<Link
			to="/"
			className={styles.logo}
			aria-label="Ecommerce - Home"
			onClick={onClick}
		>
			<picture>
				<source media="(max-width: 425px)" srcSet={iconLight} />

				<img src={logoLight} alt="Ecommerce" className={styles.image} />
			</picture>
		</Link>
	);
}
