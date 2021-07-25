import React, { FC } from 'react';

interface SortingOption {
    title: string;
    productPropName: string;
}

interface ProductsGridHeaderProps {
    categoryName: string;
    itemAmount: number;
    sortingOptions: SortingOption[];
}

const ProductsGridHeader: FC<ProductsGridHeaderProps> = (props) => {
    return (
        <header className="product-grid-header">
            <div className="info">
                <span className="title">{props.categoryName}</span>
                <span className="amount">{props.itemAmount}</span>
            </div>
            <div className="sorting-options">
                {props.sortingOptions.map(option => 
                    <span key={option.title} className="sorting-option">{option.title}</span>
                )}
            </div>
        </header>
    )
}

export default ProductsGridHeader
