import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	variant?: ButtonVariant;
};

export function Button({
	children,
	variant = 'primary',
	className = '',
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`${styles.button} ${styles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
