import React, { FC } from 'react';
import { useRef } from 'react';
import { IoMdAdd, IoMdRemove, IoMdRemoveCircle } from 'react-icons/io'; 
import { useDispatch } from 'react-redux';
import { addToLocalCartAction, LCartProduct as CartProductType, removeFromLocalCartAction } from '../types/localCart';
import gsap from 'gsap';
import { removeFromCommerceCart, updateCommerceCart } from '../store/actions/commerceCart';

interface CartProductProps {
    cartProduct: CartProductType;
}

const CartProduct: FC<CartProductProps> = ({ cartProduct }) => {
    const dispatch = useDispatch();
    const cartProductRef = useRef<HTMLDivElement>(null);

    // adds a Product of a certain type in a quantity of one piece in Cart
    const addOne = () => {
        dispatch(addToLocalCartAction(cartProduct.product, 1));
        dispatch(updateCommerceCart(cartProduct.product, cartProduct.quantity + 1));
    }

    // removes a Product of a certain type in a quantity of one piece from Cart
    const removeOne = () => {
        if (cartProduct.quantity === 1) {
            animateAndRemoveAll();
        }
        else {
            dispatch(removeFromLocalCartAction(cartProduct.product.id, 1));
            dispatch(updateCommerceCart(cartProduct.product, cartProduct.quantity - 1));
        }
    }

    // removes a Product of a certain type in FULL from Cart
    const removeAll = () => {
        dispatch(removeFromLocalCartAction(cartProduct.product.id, cartProduct.quantity));
        dispatch(removeFromCommerceCart(cartProduct.product));
    }

    const animateAndRemoveAll = () => {
        gsap.to(cartProductRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.4,
            ease: "back.inOut(2)",
            onComplete: removeAll
        });
    }

    return (
        <div className="cart-product" ref={cartProductRef}>
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
                        <button className="decrease-product flat-style" onClick={removeOne}>
                            <IoMdRemove/>
                        </button>
                        <button className="increase-product flat-style" onClick={addOne}>
                            <IoMdAdd/>
                        </button>
                    </span>
                </div>
                <button className="remove-product-button flat-style red" 
                        onClick={animateAndRemoveAll}>
                    <span className="icon-wrapper">
                        <IoMdRemoveCircle/>
                    </span>
                    <span className="title">Remove</span>
                </button>
            </section>
        </div>
    )
}

export default CartProduct
