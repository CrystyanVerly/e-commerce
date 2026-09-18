import styles from './Header.module.css';
import { Container } from '../../../layouts/Container/Container';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className={styles.header}>
			<Container className={styles.container}>
				<Link to="/" className={styles.logo}>
					Ecommerce
				</Link>

				<nav aria-label="Main navigation">
					<ul className={styles.navigation}>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="shop">Shop</Link>
						</li>
					</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
