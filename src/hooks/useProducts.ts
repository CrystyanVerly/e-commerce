import React from 'react';

import type { ProductFilters, ProductsResponse } from '../types/product';

import useFetch from './useFetch';
import { getApiUrl } from '../services/api/client';

const useProducts = (filters: ProductFilters = {}) => {
	const url = React.useMemo(() => {
		const searchParams = new URLSearchParams();

		Object.entries(filters).forEach(([key, value]) => {
			if (value === undefined || value === '') {
				return;
			}

			searchParams.set(key, String(value));
		});

		const query = searchParams.toString();

		const path = query ? `/products?${query}` : '/products';

		return getApiUrl(path);
	}, [filters]);

	const { data, loading, error, refetch } = useFetch<ProductsResponse>(url);

	return {
		products: data?.data ?? [],
		pagination: data?.pagination ?? null,
		loading,
		error,
		refetch,
	};
};

export default useProducts;
