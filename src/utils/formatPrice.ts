const formatPrice = (priceInCentss: number) => {
	return new Intl.NumberFormat('eng', {
		style: 'currency',
		currency: 'USD',
	}).format(priceInCentss / 100);
};
export default formatPrice;
