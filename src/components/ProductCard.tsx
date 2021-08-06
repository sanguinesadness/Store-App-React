import { Product } from '@chec/commerce.js/types/product';
import React, { FC, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FiPlus } from 'react-icons/fi';
import { HiCheck } from 'react-icons/hi';
import DoubleStateButton, { DoubleButtonState } from './DoubleStateButton';
import { ActionResults } from './DoubleStateButton';
import { useDispatch } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../types/cart';
import { addToWishlistAction, removeFromWishlistAction } from '../types/wishList';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useEffect } from 'react';

interface ProductCardProps {
    product: Product;
    isInCart: boolean;
    isInWishlist: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, isInCart, isInWishlist }) => {
    const dispatch = useDispatch();

    const { cartProducts } = useTypedSelector(root => root.cart);
    const cartProduct = cartProducts.find(cp => cp.product.id === product.id);

    // initial value of "isInCart" variable
    const [wasInCart, setWasInCart] = useState<boolean>(isInCart);
    // initial value of "isInWishlist" variable
    const [wasInWishlist] = useState<boolean>(isInWishlist);

    const addProductToCart = () => {
        dispatch(addToCartAction(product, 1));
        return ActionResults.SUCCESS;
    }

    const removeAllProductsFromCart = () => {
        dispatch(removeFromCartAction(product.id, cartProduct ? cartProduct.quantity : 0));
        return ActionResults.SUCCESS;
    }

    const addProductToWishlist = () => {
        dispatch(addToWishlistAction(product));
        return ActionResults.SUCCESS;
    }

    const removeProductFromWishlist = () => {
        dispatch(removeFromWishlistAction(product.id));
        return ActionResults.SUCCESS;
    }

    const cartButtonStates: [DoubleButtonState, DoubleButtonState] = [
        // Cart button state if product is NOT IN the cart
        {
            icon: FiPlus,
            title: "Add to cart",
            activeClassName: "add-to-cart",
            action: addProductToCart
        },
        // Cart button state if product is IN the cart
        {
            icon: HiCheck,
            title: `In cart`,
            activeClassName: "in-cart",
            action: removeAllProductsFromCart
        }
    ]

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

    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const [cartButtonChangeState, setCartButtonChangeState] = useState<boolean>(false);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    useEffect(() => {
        if (!isInCart && !isFirstRender) {
            setCartButtonChangeState(true);
        }
    }, [isInCart]);

    return (
        <div className="product-card">
            <div className="container">
                <div className="product-card__body">
                    <div className="product-picture__wrapper">
                        <img className="product-picture" src={product.media.source} alt=""/>
                    </div>
                    <div className="product-title__wrapper">
                        <span className="product-title">{product.name}</span>
                    </div>
                    <div className="product-price">{product.price.formatted_with_symbol}</div>
                </div>
                <footer className="product-card__footer">
                    <DoubleStateButton className="save-product-button button light"
                                       firstState={wasInWishlist ? saveButtonStates[1] : saveButtonStates[0]}
                                       secondState={wasInWishlist ? saveButtonStates[0] : saveButtonStates[1]}/>
                    <DoubleStateButton className="add-to-cart-button button light" 
                                       changeState={cartButtonChangeState}
                                       setChangeState={setCartButtonChangeState}
                                       firstState={wasInCart ? cartButtonStates[1] : cartButtonStates[0]}
                                       secondState= {wasInCart ? cartButtonStates[0] : cartButtonStates[1]}/>
                </footer>
            </div>
        </div>
    )
}

export default ProductCard;