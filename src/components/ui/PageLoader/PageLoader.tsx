import React from 'react';

import { Button } from '../Button/Button';

import styles from './PageLoader.module.css';

interface PageLoaderProps {
	ready: boolean;
	error?: boolean;
	logoSrc: string;
	onRetry?: () => void;
	onComplete?: () => void;
}

const PageLoader = ({
	ready,
	error = false,
	logoSrc,
	onRetry,
	onComplete,
}: PageLoaderProps) => {
	const [progress, setProgress] = React.useState(0);
	const [leaving, setLeaving] = React.useState(false);

	const onCompleteRef = React.useRef(onComplete);

	const displayedProgress = ready ? 100 : Math.round(progress);

	React.useEffect(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);

	React.useEffect(() => {
		const previousOverflow = document.body.style.overflow;

		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, []);

	React.useEffect(() => {
		if (error) {
			return;
		}

		if (ready) {
			const leavingTimeout = window.setTimeout(() => {
				setLeaving(true);
			}, 350);

			const completeTimeout = window.setTimeout(() => {
				onCompleteRef.current?.();
			}, 950);

			return () => {
				window.clearTimeout(leavingTimeout);
				window.clearTimeout(completeTimeout);
			};
		}

		const interval = window.setInterval(() => {
			setProgress((current) => {
				if (current >= 92) {
					return 92;
				}

				const remaining = 92 - current;

				const increment = Math.max(0.35, remaining * 0.04);

				return Math.min(92, current + increment);
			});
		}, 100);

		return () => {
			window.clearInterval(interval);
		};
	}, [ready, error]);

	return (
		<div
			className={`${styles.loader} ${leaving ? styles.leaving : ''}`}
			role="status"
			aria-live="polite"
		>
			<span className={styles.backgroundText} aria-hidden="true">
				ECOMMERCE
			</span>

			<div className={styles.stage}>
				<div
					className={`${styles.orbit} ${styles.orbitOuter}`}
					aria-hidden="true"
				>
					<span />
				</div>

				<div
					className={`${styles.orbit} ${styles.orbitInner}`}
					aria-hidden="true"
				>
					<span />
				</div>

				<div className={styles.pulse} aria-hidden="true" />

				<div className={styles.logo}>
					<img src={logoSrc} alt="" aria-hidden="true" />
				</div>

				<div className={styles.percentage} aria-hidden="true">
					<span>{displayedProgress}</span>
					<small>%</small>
				</div>
			</div>

			{error ? (
				<div className={styles.error}>
					<div>
						<span className={styles.status}>Something went wrong</span>

						<p>
							We couldn't load the store. Check your connection and try again.
						</p>
					</div>

					<Button type="button" variant="secondary" onClick={onRetry}>
						Try again
					</Button>
				</div>
			) : (
				<div className={styles.footer}>
					<span>Loading collection</span>

					<div className={styles.dots} aria-hidden="true">
						<span />
						<span />
						<span />
					</div>
				</div>
			)}

			<span className={styles.srOnly}>
				{error
					? 'Unable to load store'
					: `Loading store ${displayedProgress} percent`}
			</span>
		</div>
	);
};

export default PageLoader;
