import React from 'react';

import type { ProductFilters } from '../types/product';

import {
	initialFilters,
	ShopContext,
	type ShopContextValue,
} from './shopContext';

interface ShopProviderProps {
	children: React.ReactNode;
}

export function ShopProvider({ children }: ShopProviderProps) {
	const [filters, setFilters] = React.useState<ProductFilters>(initialFilters);

	const setFilter = React.useCallback(function setFilter<
		K extends keyof ProductFilters,
	>(key: K, value: ProductFilters[K]) {
		setFilters((currentFilters) => ({
			...currentFilters,
			[key]: value,

			...(key !== 'page' && {
				page: 1,
			}),
		}));
	}, []);

	const clearFilters = React.useCallback(() => {
		setFilters(initialFilters);
	}, []);

	const value = React.useMemo<ShopContextValue>(
		() => ({
			filters,
			setFilter,
			clearFilters,
		}),
		[filters, setFilter, clearFilters],
	);

	return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
