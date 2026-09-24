import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Slide from 'tslider';

import 'tslider/style.css';

import heroImage1 from '../../../../assets/home/hero1.webp';
import heroImage2 from '../../../../assets/home/hero2.webp';
import heroImage3 from '../../../../assets/home/hero3.webp';

import Container from '../../../../layouts/Container/Container';

import styles from './Hero.module.css';
import { Button } from '../../../../components/ui/Button/Button';

const heroSlides = [
	{
		id: 1,
		eyebrow: 'New season',
		title: 'Fresh Arrivals Online',
		description: 'Discover new essentials made for everyday style.',
		image: heroImage1,
		link: '/shop',
		linkLabel: 'Shop collection',
	},
	{
		id: 2,
		eyebrow: 'Essentials',
		title: 'Designed for Everyday',
		description: 'Timeless pieces made to fit naturally into your wardrobe.',
		image: heroImage2,
		link: '/shop',
		linkLabel: 'Explore essentials',
	},
	{
		id: 3,
		eyebrow: 'New collection',
		title: 'Find Your Next Favorite',
		description: 'Explore the latest pieces from our newest collection.',
		image: heroImage3,
		link: '/shop',
		linkLabel: 'Discover now',
	},
];

export function Hero() {
	useEffect(() => {
		const slider = new Slide({
			wrapper: '#home-hero-slider',
			rail: '#home-hero-slider [data-slide="rail"]',

			options: {
				loop: true,
				itemsPerView: 1,
				slideBy: 'item',

				controls: {
					dots: true,
				},

				autoplay: {
					enabled: true,
					delay: 5000,
					controls: false,
				},
			},
		});

		slider.init();

		return () => {
			slider.destroy();
		};
	}, []);

	return (
		<section
			id="home-hero-slider"
			className={styles.hero}
			data-slide="wrapper"
			aria-label="Featured collections"
		>
			<div className={styles.rail} data-slide="rail">
				{heroSlides.map((slide) => (
					<article key={slide.id} className={styles.slide} data-slide="slide">
						<img src={slide.image} alt="" className={styles.background} />

						<Container className={styles.container}>
							<div className={styles.content}>
								<span className={styles.eyebrow}>{slide.eyebrow}</span>

								<h1>{slide.title}</h1>

								<p>{slide.description}</p>

								<Link to={slide.link} className={styles.cta}>
									<Button variant="secondary">{slide.linkLabel}</Button>
								</Link>
							</div>
						</Container>
					</article>
				))}
			</div>
		</section>
	);
}
