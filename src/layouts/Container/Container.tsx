import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import styles from './Container.module.css';

type ContainerProps<T extends ElementType = 'div'> = {
	as?: T;
	children: ReactNode;
	className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function Container<T extends ElementType = 'div'>({
	as,
	children,
	className = '',
	...props
}: ContainerProps<T>) {
	const Component = as ?? 'div';

	return (
		<Component className={`${styles.container} ${className}`} {...props}>
			{children}
		</Component>
	);
}
