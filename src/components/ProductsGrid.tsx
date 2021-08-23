import { Product } from '@chec/commerce.js/types/product';
import React, { FC, useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import ProductCard from './ProductCard';
import ReactLoading from 'react-loading';
import { SortingNames } from '../types/sortingOption';
import { BsInfoSquareFill } from 'react-icons/bs';
import SortingOptions from './SortingOptions';

interface ProductsGridProps {
    name: string;
    products: Product[];
    emptyErrorMsg?: string;
}

const ProductsGrid: FC<ProductsGridProps> = ({ name, products, emptyErrorMsg }) => {
    const sortingState = useTypedSelector(root => root.sorting);
    const productState = useTypedSelector(root => root.product);
    const cartState = useTypedSelector(root => root.commerceCart);

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

    const [sortingDisabled, setSortingDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (productState.loading) {
            setSortingDisabled(true);
        }
        else {
            setSortingDisabled(Boolean(products.length === 0));
        }
    }, [productState.products]);

    useEffect(() => {
        if (products.length === 0) {
            setSortingDisabled(true);
        }
        else {
            setSortingDisabled(false);
        }
    }, [products.length]);

    return (
        <>
            <header className="products-grid-header">
                <div className="info">
                    <span className="title">{name}</span>
                    <span className="amount">{products.length}</span>
                </div>
                <SortingOptions disabled={sortingDisabled}/>
            </header>
            <div className="products-grid__wrapper">
                {
                    productState.loading || cartState.loading ?
                        <ReactLoading type="bubbles" className="products-grid-loading loading-spinner"/>
                    :
                    productState.error ?
                        <div className="page-error products-grid-error">
                            <BsInfoSquareFill className="icon" />
                            <span className="message">{productState.error}</span>
                        </div>
                    :
                    products.length > 0 ?
                        <div className="products-grid">
                            {products.sort(sortingHandler).map(product =>
                                <ProductCard key={product.id} product={product}/>
                            )}
                        </div>
                    :
                        <div className="page-error products-grid-empty-message">
                            <BsInfoSquareFill className="icon" />
                            <span className="text">{emptyErrorMsg || "List is empty"}</span>
                        </div>
                }
            </div>
        </>
    )
}

export default ProductsGrid;