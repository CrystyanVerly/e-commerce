import { Container } from '../../../layouts/Container/Container';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<p>© Ecommerce | Some rights reserved</p>
			</Container>
		</footer>
	);
};

export default Footer;
