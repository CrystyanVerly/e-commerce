import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/Button/Button';

import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<main className={styles.page}>
			<div className={styles.content}>
				<span className={styles.code} aria-hidden="true">
					404
				</span>

				<div className={styles.message}>
					<span className={styles.eyebrow}>Page not found</span>

					<h1>Looks like this page moved out of the collection.</h1>

					<p>
						The page you're looking for doesn't exist or may have been moved.
					</p>

					<Button type="button" variant="primary" onClick={() => navigate('/')}>
						Back home
					</Button>
				</div>
			</div>
		</main>
	);
};

export default NotFoundPage;
