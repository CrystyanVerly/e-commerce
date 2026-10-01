import type { FormEvent } from 'react';

import styles from './Newsletter.module.css';
import { Button } from '../../components/ui/Button/Button';

const Newsletter = () => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.content}>
					<span className={styles.eyebrow}>Newsletter</span>

					<h2 className={styles.title}>Stay in the loop.</h2>

					<p className={styles.description}>
						New arrivals, selected releases and occasional updates.
					</p>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					<label htmlFor="newsletter-email" className={styles.srOnly}>
						Email address
					</label>

					<input
						id="newsletter-email"
						name="email"
						type="email"
						placeholder="Email address"
						autoComplete="email"
						required
					/>

					<Button type="submit" variant="secondary">
						Subscribe
					</Button>
				</form>
			</div>
		</section>
	);
};

export default Newsletter;
