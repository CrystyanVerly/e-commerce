import { useState, type ChangeEvent, type PointerEvent } from 'react';

import formatPrice from '../../../utils/formatPrice';

import styles from './PriceRange.module.css';

interface PriceRangeProps {
	min: number;
	max: number;

	valueMin?: number;
	valueMax?: number;

	step?: number;

	onCommit: (min: number, max: number) => void;
}

const PriceRange = ({
	min,
	max,
	valueMin,
	valueMax,
	step = 100,
	onCommit,
}: PriceRangeProps) => {
	const [currentMin, setCurrentMin] = useState(valueMin ?? min);

	const [currentMax, setCurrentMax] = useState(valueMax ?? max);

	const distance = Math.max(max - min, 1);

	const minPosition = ((currentMin - min) / distance) * 100;

	const maxPosition = ((currentMax - min) / distance) * 100;

	const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);

		setCurrentMin(Math.min(value, currentMax));
	};

	const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);

		setCurrentMax(Math.max(value, currentMin));
	};

	const commit = () => {
		onCommit(currentMin, currentMax);
	};

	const handleTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
		/*
		 * Se clicou diretamente em um dos ranges/thumbs,
		 * deixa o comportamento nativo cuidar disso.
		 */
		if (event.target instanceof HTMLInputElement) {
			return;
		}

		const bounds = event.currentTarget.getBoundingClientRect();

		const position = (event.clientX - bounds.left) / bounds.width;

		const clampedPosition = Math.min(Math.max(position, 0), 1);

		const rawValue = min + clampedPosition * (max - min);

		/*
		 * Ajusta o valor para respeitar o step.
		 */
		const snappedValue = min + Math.round((rawValue - min) / step) * step;

		const value = Math.min(Math.max(snappedValue, min), max);

		const distanceToMin = Math.abs(value - currentMin);

		const distanceToMax = Math.abs(value - currentMax);

		/*
		 * Move o handle mais próximo do clique.
		 */
		if (distanceToMin <= distanceToMax) {
			const nextMin = Math.min(value, currentMax);

			setCurrentMin(nextMin);

			onCommit(nextMin, currentMax);

			return;
		}

		const nextMax = Math.max(value, currentMin);

		setCurrentMax(nextMax);

		onCommit(currentMin, nextMax);
	};

	return (
		<div className={styles.priceRange}>
			<div className={styles.values}>
				<span>{formatPrice(currentMin)}</span>

				<span>{formatPrice(currentMax)}</span>
			</div>

			<div className={styles.slider} onPointerDown={handleTrackPointerDown}>
				<div className={styles.track} />

				<div
					className={styles.selection}
					style={{
						left: `${minPosition}%`,
						right: `${100 - maxPosition}%`,
					}}
				/>

				<input
					className={styles.input}
					type="range"
					min={min}
					max={max}
					step={step}
					value={currentMin}
					aria-label="Minimum price"
					onChange={handleMinChange}
					onPointerUp={commit}
					onBlur={commit}
				/>

				<input
					className={styles.input}
					type="range"
					min={min}
					max={max}
					step={step}
					value={currentMax}
					aria-label="Maximum price"
					onChange={handleMaxChange}
					onPointerUp={commit}
					onBlur={commit}
				/>
			</div>
		</div>
	);
};

export default PriceRange;
