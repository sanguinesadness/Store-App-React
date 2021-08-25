import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import cart from '../icons/hand-cart.svg';
import { clearCommerceCart } from '../store/actions/commerceCart';
import { clearLocalCartAction } from '../types/localCart';
import CartProducts from './CartProducts';
import { PuffLoader } from 'react-spinners';

const Cart: FC = () => {
    const { lcartProducts: cartProducts, totalPrice, totalQuantity } = useTypedSelector(root => root.localCart);

    const { loading: cartLoading } = useTypedSelector(root => root.commerceCart);
    const { loading: productsLoading } = useTypedSelector(root => root.product);

    const dispatch = useDispatch();

    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

    const popupBodyRef = useRef<HTMLDivElement>(null);

    const hidePopup = () => {
        setIsPopupVisible(false);
    }

    const showPopup = () => {
        popupBodyRef.current?.scrollTo(0, 0);
        setIsPopupVisible(true);
    }

    const clearCart = () => {
        dispatch(clearLocalCartAction());
        dispatch(clearCommerceCart());
    }

    const history = useHistory();
    
    const goToCheckout = () => {
        history.push("/checkout");    
    }

    useEffect(() => {
        if (cartProducts.length === 0) {
            hidePopup();
        }
    }, [cartProducts]);

    return (
        <div className="cart"
             onMouseEnter={showPopup} 
             onMouseLeave={hidePopup}>
            {
                cartLoading || productsLoading ?
                    <div className="user-action">
                        <PuffLoader color="#3E454F" size={27}/>
                    </div>
                    :
                    <>
                        <div className="user-action visible-content">
                            <img className="icon" src={cart} alt="cart" />
                            <span className={`cart-quantity__wrapper ${cartProducts.length === 0 ? "hidden" : ""}`}>
                                <span className="cart-quantity">{cartProducts.length}</span>
                            </span>
                        </div>
                        {cartProducts.length > 0 ?
                            <div className={`popup-content popup-panel ${isPopupVisible ? "visible" : "hidden"}`}>
                                <header className="popup-panel__header">
                                    <span className="my-cart-label">My Cart</span>
                                    <span className="total-quantity">{totalQuantity} {totalQuantity === 1 ? "item" : "items"}</span>
                                </header>
                                <div ref={popupBodyRef} className="popup-panel__body">
                                    <CartProducts />
                                </div>
                                <footer className="popup-panel__footer">
                                    <div className="total-price">
                                        <span className="text">Total price:</span>
                                        <span className="value">${totalPrice}</span>
                                    </div>
                                    <div className="buttons">
                                        <button className="clear-cart-button dark" onClick={clearCart}>Clear Cart</button>
                                        <button className="checkout-button green" onClick={goToCheckout}>Checkout</button>
                                    </div>
                                </footer>
                            </div>
                            :
                            <div className={`popup-empty-content popup-panel ${isPopupVisible ? "visible" : "hidden"}`}>
                                Cart is empty
                            </div>}
                    </>
            }
        </div>
    )
}

export default Cart
