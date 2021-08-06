import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import cart from '../icons/hand-cart.svg';
import { clearCartAction } from '../types/cart';
import CartProducts from './CartProducts';

const Cart: FC = () => {
    const { cartProducts } = useTypedSelector(root => root.cart);

    const dispatch = useDispatch();

    const calculateCartPrice = () => cartProducts.reduce((a, b) => a + (b.product.price.raw * b.quantity || 0), 0).toFixed(2);
    const calculateItemsInCart = () => cartProducts.reduce((a, b) => a + (b.quantity || 0), 0);

    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

    const popupBodyRef = useRef<HTMLDivElement>(null);

    const hidePopup = () => {
        setIsPopupVisible(false);
        popupBodyRef.current?.scrollTo(0, 0);
    }

    const showPopup = () => {
        setIsPopupVisible(true);
    }

    const clearCart = () => {
        dispatch(clearCartAction());
    }

    return (
        <div className="cart" onMouseEnter={showPopup} onMouseLeave={hidePopup}>
            <div className="user-action visible-content">
                <img className="hand-cart-icon" src={cart} alt="cart" />
                <span className={`cart-quantity__wrapper ${cartProducts.length === 0 ? "hidden" : ""}`}>
                    <span className="cart-quantity">{cartProducts.length}</span>
                </span>
            </div>
            {cartProducts.length > 0 ?
                <div className={`popup-content popup-panel ${isPopupVisible ? "visible" : "hidden"}`}>
                    <header className="popup-panel__header">
                        <span className="my-cart-label">My Cart</span>
                        <span className="total-quantity">{calculateItemsInCart()} {calculateItemsInCart() === 1 ? "item" : "items"}</span>
                    </header>
                    <div ref={popupBodyRef} className="popup-panel__body">
                        <CartProducts/>
                    </div>
                    <footer className="popup-panel__footer">
                        <div className="total-price">
                            <span className="text">Total price:</span>
                            <span className="value">${calculateCartPrice()}</span>
                        </div>
                        <div className="buttons">
                            <button className="clear-cart-button dark" onClick={clearCart}>Clear Cart</button>
                            <button className="checkout-button green">Checkout</button>
                        </div>
                    </footer>
                </div>
                :
                <></>}
        </div>
    )
}

export default Cart
