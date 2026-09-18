import { useParams } from 'react-router-dom';
import { Container } from '../../layouts/Container/Container';

export function ProductPage() {
	const { slug } = useParams();

	return (
		<Container>
			<h1>Product</h1>

			<p>{slug}</p>
		</Container>
	);
}
