import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

import logo from '../../../assets/logo/icon-light.svg';

import githubLogo from '../../../assets/icons/socialMedia/Github.svg';
import linkedinLogo from '../../../assets/icons/socialMedia/linkedin.svg';

import masterCardLogo from '../../../assets/icons/coloredIcons/Mastercard.svg';
import amexLogo from '../../../assets/icons/coloredIcons/amex.svg';
import visaLogo from '../../../assets/icons/coloredIcons/visa.svg';

const shopLinks = [
	{ label: 'Shop all', to: '/shop' },
	{ label: "Men's", to: '/shop?gender=male' },
	{ label: "Women's", to: '/shop?gender=female' },
];

const supportLinks = [
	{ label: 'FAQ', to: '/' },
	{ label: 'Terms of use', to: '/' },
	{ label: 'Privacy policy', to: '/' },
];

const companyLinks = [
	{ label: 'About us', to: '/' },
	{ label: 'Contact', to: '/' },
	{ label: 'Careers', to: '/' },
];

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.main}>
					<div className={styles.brand}>
						<Link to="/" className={styles.logo}>
							<img src={logo} alt="ecommerce logo" />
						</Link>

						<p className={styles.description}>
							Everyday essentials with a focus on simplicity, comfort and
							contemporary style.
						</p>

						<div className={styles.socials}>
							<a href="https://github.com/CrystyanVerly" aria-label="GitHub">
								<img src={githubLogo} alt="git hub logo" />
							</a>

							<a
								href="https://www.linkedin.com/in/crystyanverly"
								aria-label="Linkedin"
							>
								<img src={linkedinLogo} alt="linkedin logo" />
							</a>
						</div>
					</div>

					<nav className={styles.column} aria-label="Support">
						<span className={styles.heading}>Support</span>

						{supportLinks.map((link) => (
							<Link key={link.label} to={link.to}>
								{link.label}
							</Link>
						))}
					</nav>

					<nav className={styles.column} aria-label="Company">
						<span className={styles.heading}>Company</span>

						{companyLinks.map((link) => (
							<Link key={link.label} to={link.to}>
								{link.label}
							</Link>
						))}
					</nav>

					<nav className={styles.column} aria-label="Shop">
						<span className={styles.heading}>Shop</span>

						{shopLinks.map((link) => (
							<Link key={link.label} to={link.to}>
								{link.label}
							</Link>
						))}
					</nav>

					<div className={styles.payments}>
						<span className={styles.heading}>Accepted payments</span>

						<div className={styles.paymentList}>
							<img src={masterCardLogo} alt="mastercard logo" />
							<img src={amexLogo} alt="amex logo" />
							<img src={visaLogo} alt="visa logo" />
						</div>
					</div>
				</div>

				<div className={styles.bottom}>
					<span>© {currentYear} e-commerce. 'Some' rights reserved.</span>

					<span className={styles.project}>
						Designed & built for portfolio purposes.
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
