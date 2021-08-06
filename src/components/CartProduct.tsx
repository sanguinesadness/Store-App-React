import { Product } from '@chec/commerce.js/types/product';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { IoMdAdd, IoMdRemove, IoMdRemoveCircle } from 'react-icons/io'; 
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addToCartAction, CartProduct as CartProductType, removeFromCartAction } from '../types/cart';

interface CartProductProps {
    cartProduct: CartProductType;
}

const CartProduct: FC<CartProductProps> = ({ cartProduct }) => {
    const dispatch = useDispatch();

    // adds a Product of a certain type in a quantity of one piece in Cart
    const addProductToCart = () => {
        dispatch(addToCartAction(cartProduct.product, 1));
    }

    // removes a Product of a certain type in a quantity of one piece from Cart
    const removeProductFromCart = () => {
        dispatch(removeFromCartAction(cartProduct.product.id, 1));
    }

    // removes a Product of a certain type in FULL from Cart
    const removeAllProductsFromCart = () => {
        dispatch(removeFromCartAction(cartProduct.product.id, cartProduct.quantity));
    }

    return (
        <div className="cart-product">
            <section className="left-section">
                <img className="product-image" src={cartProduct.product.media.source} alt=""/>        
            </section>
            <section className="right-section">
                <span className="product-price">{cartProduct.product.price.formatted_with_symbol}</span>
                <span className="product-name">{cartProduct.product.name}</span>
                <div className="product-quantity-block">
                    <span className="text-value">
                        <span className="text">Quantity:</span>
                        <span className="value">{cartProduct.quantity}</span>
                    </span>
                    <span className="change-value-buttons">
                        <button className="decrease-product flat-style" onClick={removeProductFromCart}>
                            <IoMdRemove/>
                        </button>
                        <button className="increase-product flat-style" onClick={addProductToCart}>
                            <IoMdAdd/>
                        </button>
                    </span>
                </div>
                <button className="remove-product-button flat-style red">
                    <span className="icon-wrapper">
                        <IoMdRemoveCircle/>
                    </span>
                    <span className="title" onClick={removeAllProductsFromCart}>Remove</span>
                </button>
            </section>
        </div>
    )
}

export default CartProduct
