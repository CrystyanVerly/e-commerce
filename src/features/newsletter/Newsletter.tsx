import type { SubmitEvent } from 'react';

import styles from './Newsletter.module.css';
import { Button } from '../../components/ui/Button/Button';

const Newsletter = () => {
	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
	};

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.content}>
					<span className={styles.eyebrow}>Newsletter</span>

					<h2 className={styles.title}>Stay close to what’s next.</h2>

					<p className={styles.description}>
						New arrivals, selected releases and occasional updates.
					</p>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label htmlFor="newsletter-email" className={styles.srOnly}>
							Email address
						</label>

						<input
							id="newsletter-email"
							name="email"
							type="email"
							placeholder="Your email address"
							autoComplete="email"
							required
						/>
					</div>

					<Button type="submit" variant="secondary">
						Subscribe
					</Button>
				</form>
			</div>
		</section>
	);
};

export default Newsletter;
