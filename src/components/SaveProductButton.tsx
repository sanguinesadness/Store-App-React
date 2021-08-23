import { Product } from '@chec/commerce.js/types/product';
import React, { FC, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addToWishlistAction, removeFromWishlistAction } from '../types/wishList';
import DoubleStateButton, { ActionResults, DoubleButtonState } from './DoubleStateButton';

interface SaveProductButtonProps {
    product: Product;
    className?: string;
    additionalClickHandler?: () => void;
    beforeAction?: () => Promise<unknown>;
}

const SaveProductButton: FC<SaveProductButtonProps> = ({ product, className, additionalClickHandler, beforeAction }) => {
    const { products: wishlistProducts } = useTypedSelector(root => root.wishList);
    const wishlistProduct = wishlistProducts.find(wp => wp.id === product.id);
    const isInWishlist = Boolean(wishlistProduct);

    // initial value of "isInWishlist" variable
    const [wasInWishlist] = useState<boolean>(isInWishlist);

    const dispatch = useDispatch();

    const addProductToWishlist = () => {
        dispatch(addToWishlistAction(product));
        return ActionResults.SUCCESS;
    }

    const removeProductFromWishlist = () => {
        dispatch(removeFromWishlistAction(product.id));
        return ActionResults.SUCCESS;
    }

    const saveButtonStates: [DoubleButtonState, DoubleButtonState] = [
        // Save button state if product is NOT IN the Wish list
        {
            icon: IoMdHeartEmpty,
            title: "Save",
            activeClassName: "save",
            action: addProductToWishlist
        },
        // Save button state if product is IN the Wish list
        {
            icon: IoMdHeart,
            title: "Saved",
            activeClassName: "saved",
            action: removeProductFromWishlist
        }
    ]

    return (
        <DoubleStateButton className={`save-product-button ${className}`}
                           firstState={wasInWishlist ? saveButtonStates[1] : saveButtonStates[0]}
                           secondState={wasInWishlist ? saveButtonStates[0] : saveButtonStates[1]} 
                           additionalClickHandler={additionalClickHandler}
                           beforeAction={beforeAction}/>
    )
}

export default SaveProductButton
