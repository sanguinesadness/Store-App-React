import React, { FC, SetStateAction } from 'react';
import { SortingOption } from '../types/sortingOption';
import SortingOptions from './SortingOptions';

interface ProductsGridHeaderProps {
    categoryName: string;
    itemAmount: number;
}

const ProductsGridHeader: FC<ProductsGridHeaderProps> = (props) => {
    return (
        <header className="products-grid-header">
            <div className="info">
                <span className="title">{props.categoryName}</span>
                <span className="amount">{props.itemAmount}</span>
            </div>
            <SortingOptions/>
        </header>
    )
}

export default ProductsGridHeader
