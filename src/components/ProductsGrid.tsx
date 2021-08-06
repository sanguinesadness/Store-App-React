import { Product } from '@chec/commerce.js/types/product';
import React, { FC, useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import ProductCard from './ProductCard';
import ReactLoading from 'react-loading';
import { SortingNames } from '../types/sortingOption';

interface ProductsGridProps {
    products: Product[];
}

const ProductsGrid: FC<ProductsGridProps> = ({ products }) => {
    const cartState = useTypedSelector(root => root.cart);
    const wishlistState = useTypedSelector(root => root.wishList);
    const sortingState = useTypedSelector(root => root.sorting);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        timeoutLoading();

        return () => {
            setLoading(false);
        }
    }, []);

    const timeoutLoading = () => {
        setTimeout(() => setLoading(false), 500);
    }

    const sortingHandler = (product1: Product, product2: Product): number => {
        if (!sortingState.activeOption) {
            return 1;
        }

        let num1, num2;

        if (sortingState.activeOption.ascending) {
            num1 = 1;
            num2 = -1;
        }
        else {
            num1 = -1;
            num2 = 1;
        }

        switch (sortingState.activeOption.name) {
            case SortingNames.CREATED:
                return product1.created > product2.created ? num1 : num2;
            case SortingNames.PRICE:
                return product1.price.raw > product2.price.raw ? num1 : num2;
            case SortingNames.NAME:
                return product1.name > product2.name ? num1 : num2;
            default:
                return 1;
        }
    }

    return (
        <div className="products-grid__wrapper">
            {
                loading ?
                    <ReactLoading type="bubbles" className="products-loading"/>
                :
                    <div className="products-grid">
                        {
                            products.sort(sortingHandler)
                                    .map(product =>
                                        <ProductCard key={product.id} product={product}
                                                     isInCart={Boolean(cartState.cartProducts.find(cp => cp.product.id === product.id))}
                                                     isInWishlist={wishlistState.products.includes(product)}/>)
                        }
                    </div>
            }
        </div>
    )
}

export default ProductsGrid;