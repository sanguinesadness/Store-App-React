import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ProductsGrid from '../ProductsGrid';
import { useEffect } from 'react';
import { setScrollPercentAction } from '../../types/scroll';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { SortingOption, SortingNames, setAvailableSortingOptionsAction, setActiveSortingOptionAction } from '../../types/sortingOption';

// sorting options for products in the grid
const categoryPageSortingOptions: SortingOption[] = [
    {
        name: SortingNames.CREATED,
        ascending: true
    },
    {
        name: SortingNames.PRICE,
        ascending: true
    }
]

const CategoryPage: FC = () => {
    const { selectedCategory } = useTypedSelector(root => root.category);
    const { products } = useTypedSelector(root => root.product);

    // products from Selected Category
    const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAvailableSortingOptionsAction(categoryPageSortingOptions));
        dispatch(setActiveSortingOptionAction(categoryPageSortingOptions[0]));
        dispatch(setScrollPercentAction(0));

        if (selectedCategory) {
            const cProducts: Product[] = [];

            // select products from Selected Category
            products.forEach(product => {
                product.categories.forEach(category => {
                    if (category.id === selectedCategory.id) {
                        cProducts.push(product);
                    }
                });
            });

            setCategoryProducts(cProducts);
        }
    }, [products])

    if (!selectedCategory) {
        history.push("/");
        return <></>;
    }

    return (
        <div id="category-page">
            <ProductsGrid products={categoryProducts} 
                          emptyErrorMsg="This category is currently empty"
                          name={selectedCategory?.name || ""}/>
        </div>
    )
}

export default CategoryPage;