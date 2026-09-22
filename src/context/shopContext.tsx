import { createContext } from 'react';

import type { ProductFilters } from '../types/product';

export interface ShopContextValue {
	filters: ProductFilters;

	setFilter: <K extends keyof ProductFilters>(
		key: K,
		value: ProductFilters[K],
	) => void;

	clearFilters: () => void;
}

export const initialFilters: ProductFilters = {
	sort: 'newest',
	page: 1,
	limit: 12,
};

export const ShopContext = createContext<ShopContextValue | null>(null);
