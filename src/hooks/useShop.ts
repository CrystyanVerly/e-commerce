import React from 'react';

import { ShopContext, type ShopContextValue } from '../context/shopContext';

export function useShop(): ShopContextValue {
	const context = React.useContext(ShopContext);

	if (!context) {
		throw new Error('useShop must be used inside ShopProvider');
	}

	return context;
}
