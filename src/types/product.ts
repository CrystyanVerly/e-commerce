export interface Category {
	id: number;
	name: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
}

export interface ProductImage {
	id: number;
	url: string;
	alt: string | null;
	position: number;
	productId: number;
}

export interface ProductVariant {
	id: number;
	sku: string;
	color: string;
	size: string;
	stock: number;
	productId: number;
	createdAt: string;
	updatedAt: string;
}

export interface Product {
	id: number;
	name: string;
	slug: string;
	description: string;
	price: number;
	gender: string;
	categoryId: number;
	category: Category;
	image: ProductImage[];
	variants: ProductVariant[];
	createdAt: string;
	updatedAt: string;
}

export interface ProductsPagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface ProductsResponse {
	data: Product[];
	pagination: ProductsPagination;
}

export interface ProductFilters {
	gender?: string;
	category?: string;
	color?: string;
	size?: string;
	search?: string;
	sort?: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'name-asc';
	page?: number;
	limit?: number;
}
