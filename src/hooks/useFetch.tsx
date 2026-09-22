import React from 'react';

export interface FetchState<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
}

const useFetch = <T,>(
	url: RequestInfo | URL,
	options?: RequestInit,
): FetchState<T> => {
	const [data, setData] = React.useState<T | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<Error | null>(null);
	const [refreshIndex, setRefreshIndex] = React.useState(0);

	const refetch = React.useCallback(() => {
		setRefreshIndex((index) => index + 1);
	}, []);

	React.useEffect(() => {
		const controller = new AbortController();

		async function request() {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch(url, {
					...options,
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}

				const json: T = await response.json();

				if (!controller.signal.aborted) {
					setData(json);
					setError(null);
				}
			} catch (error) {
				if (error instanceof Error && error.name === 'AbortError') {
					return;
				}

				if (error instanceof Error) {
					setError(error);
				}
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		}

		request();

		return () => {
			controller.abort();
		};
	}, [url, options, refreshIndex]);

	return {
		data,
		loading,
		error,
		refetch,
	};
};

export default useFetch;
