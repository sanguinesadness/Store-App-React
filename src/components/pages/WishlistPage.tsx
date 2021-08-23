import React, { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setScrollPercentAction } from '../../types/scroll';
import { setActiveSortingOptionAction, setAvailableSortingOptionsAction, SortingNames, SortingOption } from '../../types/sortingOption';
import ProductsGrid from '../ProductsGrid';

// sorting options for products in the grid
const wishlistPageSortingOptions: SortingOption[] = [
    {
        name: SortingNames.NAME,
        ascending: true
    },
    {
        name: SortingNames.PRICE,
        ascending: true
    }
]

const WishlistPage: FC = () => {
    const { products } = useTypedSelector(root => root.wishList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAvailableSortingOptionsAction(wishlistPageSortingOptions));
        dispatch(setActiveSortingOptionAction(wishlistPageSortingOptions[0]));
        dispatch(setScrollPercentAction(0));
    }, []);

    return (
        <div id="wishlist-page">
            <ProductsGrid products={products} 
                          emptyErrorMsg="Wishlist is empty"
                          name="Saved products"/>
        </div>
    )
}

export default WishlistPage
