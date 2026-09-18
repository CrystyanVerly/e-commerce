import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import cartIcon from '../../../assets/icons/cart.svg';
import chevronDownIcon from '../../../assets/icons/ChevronDown.svg';
import closeIcon from '../../../assets/icons/close.svg';
import menuIcon from '../../../assets/icons/menu.svg';
import searchIcon from '../../../assets/icons/search.svg';
import userIcon from '../../../assets/icons/user.svg';

import styles from './Header.module.css';
import Container from '../../../layouts/Container/Container';
import { Logo } from '../../ui/Logo/Logo';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleToggleMenu() {
		setIsMenuOpen((current) => !current);
	}

	function handleCloseMenu() {
		setIsMenuOpen(false);
	}

	return (
		<header className={styles.header}>
			<div className={styles.promo}>
				<Container className={styles.promoContainer}>
					<Link to="/shop">
						<p>
							Get 25% OFF on your first order. <span>Order Now</span>
						</p>
					</Link>
				</Container>
			</div>

			<div className={styles.main}>
				<Container className={styles.container}>
					<Logo />
					<nav
						className={styles.desktopNavigation}
						aria-label="Main navigation"
					>
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								isActive ? styles.activeLink : styles.navLink
							}
						>
							Home
						</NavLink>

						<NavLink
							to="/shop"
							className={({ isActive }) =>
								isActive ? styles.activeLink : styles.navLink
							}
						>
							Categories
							<img src={chevronDownIcon} alt="" aria-hidden="true" />
						</NavLink>

						<NavLink
							to="/about"
							className={({ isActive }) =>
								isActive ? styles.activeLink : styles.navLink
							}
						>
							About
						</NavLink>

						<NavLink
							to="/contact"
							className={({ isActive }) =>
								isActive ? styles.activeLink : styles.navLink
							}
						>
							Contact
						</NavLink>
					</nav>

					<div className={styles.right}>
						<form
							className={styles.search}
							role="search"
							onSubmit={(e) => e.preventDefault()}
						>
							<img src={searchIcon} alt="" aria-hidden="true" />

							<input
								type="search"
								name="search"
								placeholder="Search products"
								aria-label="Search products"
							/>
						</form>

						<Link
							to="/cart"
							className={styles.iconButton}
							aria-label="Shopping cart"
							onClick={handleCloseMenu}
						>
							<img src={cartIcon} alt="" aria-hidden="true" />
						</Link>

						<Link
							to="/login"
							className={styles.iconButton}
							aria-label="Account"
							onClick={handleCloseMenu}
						>
							<img src={userIcon} alt="" aria-hidden="true" />
						</Link>

						<button
							type="button"
							className={`${styles.iconButton} ${styles.menuButton}`}
							aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={isMenuOpen}
							aria-controls="mobile-navigation"
							onClick={handleToggleMenu}
						>
							<img
								src={isMenuOpen ? closeIcon : menuIcon}
								alt=""
								aria-hidden="true"
							/>
						</button>
					</div>
				</Container>
			</div>

			{isMenuOpen && (
				<div id="mobile-navigation" className={styles.mobileMenu}>
					<Container>
						<form
							className={styles.mobileSearch}
							role="search"
							onSubmit={(e) => e.preventDefault()}
						>
							<img src={searchIcon} alt="" aria-hidden="true" />

							<input
								type="search"
								name="search"
								placeholder="Search products"
								aria-label="Search products"
							/>
						</form>

						<nav
							className={styles.mobileNavigation}
							aria-label="Mobile navigation"
						>
							<NavLink to="/" end onClick={handleCloseMenu}>
								Home
							</NavLink>

							<NavLink to="/shop" onClick={handleCloseMenu}>
								Categories
							</NavLink>

							<NavLink to="/about" onClick={handleCloseMenu}>
								About
							</NavLink>

							<NavLink to="/contact" onClick={handleCloseMenu}>
								Contact
							</NavLink>
						</nav>
					</Container>
				</div>
			)}
		</header>
	);
}
