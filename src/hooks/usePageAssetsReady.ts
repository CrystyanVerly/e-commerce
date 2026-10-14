import React, { type RefObject } from 'react';

interface UsePageAssetsReadyProps {
	enabled: boolean;
	rootRef: RefObject<HTMLElement | null>;
}

export function usePageAssetsReady({
	enabled,
	rootRef,
}: UsePageAssetsReadyProps) {
	const [assetsReady, setAssetsReady] = React.useState(false);

	React.useEffect(() => {
		if (!enabled) return;

		const root = rootRef.current;

		if (!root) return;

		let cancelled = false;

		const preloadImage = (src: string) => {
			return new Promise<void>((resolve) => {
				const image = new Image();

				const finish = () => {
					resolve();
				};

				image.onload = finish;
				image.onerror = finish;

				image.src = src;

				if (image.complete) finish();
			});
		};

		const waitForPaint = () => {
			return new Promise<void>((resolve) => {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						resolve();
					});
				});
			});
		};

		const preparePage = async () => {
			const images = Array.from(root.querySelectorAll<HTMLImageElement>('img'));

			const imageSources = [
				...new Set(
					images.map((image) => image.currentSrc || image.src).filter(Boolean),
				),
			];

			const fontsReady = document.fonts?.ready ?? Promise.resolve();

			await Promise.allSettled([fontsReady, ...imageSources.map(preloadImage)]);

			await waitForPaint();

			if (!cancelled) setAssetsReady(true);
		};

		void preparePage();

		return () => {
			cancelled = true;
		};
	}, [enabled, rootRef]);

	return enabled && assetsReady;
}
