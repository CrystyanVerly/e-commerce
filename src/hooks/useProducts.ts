import React from 'react';

import { getApiUrl } from '../services/api/client';

import type { ProductFilters, ProductsResponse } from '../types/product';
import useFetch from './useFetch';

function appendFilter(
	params: URLSearchParams,
	key: string,
	value?: string | string[],
) {
	if (!value) return;

	if (Array.isArray(value)) {
		value.forEach((item) => {
			params.append(key, item);
		});

		return;
	}

	params.append(key, value);
}

export function useProducts(filters: ProductFilters = {}) {
	const url = React.useMemo(() => {
		const params = new URLSearchParams();

		if (filters.gender) params.set('gender', filters.gender);

		appendFilter(params, 'category', filters.category);

		appendFilter(params, 'color', filters.color);

		appendFilter(params, 'size', filters.size);

		if (filters.minPrice !== undefined)
			params.set('minPrice', String(filters.minPrice));

		if (filters.maxPrice !== undefined)
			params.set('maxPrice', String(filters.maxPrice));

		if (filters.search) params.set('search', filters.search);

		if (filters.sort) params.set('sort', filters.sort);

		if (filters.page !== undefined) params.set('page', String(filters.page));

		if (filters.limit !== undefined) params.set('limit', String(filters.limit));

		const query = params.toString();

		return getApiUrl(`/products${query ? `?${query}` : ''}`);
	}, [
		filters.gender,
		filters.category,
		filters.color,
		filters.size,
		filters.minPrice,
		filters.maxPrice,
		filters.search,
		filters.sort,
		filters.page,
		filters.limit,
	]);

	const { data, loading, error, refetch } = useFetch<ProductsResponse>(url);

	return {
		products: data?.data ?? [],
		pagination: data?.pagination ?? null,
		loading,
		error,
		refetch,
	};
}

export default useProducts;
