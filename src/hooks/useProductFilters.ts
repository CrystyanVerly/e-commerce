import { getApiUrl } from '../services/api/client';
import type { ProductFilterOptions } from '../types/product';
import useFetch from './useFetch';

export function useProductFilters() {
	const { data, loading, error, refetch } = useFetch<ProductFilterOptions>(
		getApiUrl('/products/filters'),
	);

	return {
		filters: data,
		loading,
		error,
		refetch,
	};
}
