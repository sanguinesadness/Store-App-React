import { Product } from '@chec/commerce.js/types/product';
import React, { FC, SetStateAction, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { HiCheck } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addToCommerceCart, removeFromCommerceCart } from '../store/actions/commerceCart';
import { addToLocalCartAction, removeFromLocalCartAction } from '../types/localCart';
import DoubleStateButton, { ActionResults, DoubleButtonState } from './DoubleStateButton';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
    additionalClickHandler?: () => void;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ product, className, additionalClickHandler }) => {
    const dispatch = useDispatch();

    const { lcartProducts: cartProducts } = useTypedSelector(root => root.localCart);
    const cartProduct = cartProducts.find(cp => cp.product.id === product.id);
    const isInCart = Boolean(cartProduct);

    // initial value of "isInCart" variable
    const [wasInCart] = useState<boolean>(isInCart);

    const addProductToCart = () => {
        dispatch(addToLocalCartAction(product, 1));
        dispatch(addToCommerceCart(product, 1));
        return ActionResults.SUCCESS;
    }

    const removeAllProductsFromCart = () => {
        dispatch(removeFromLocalCartAction(product.id, cartProduct ? cartProduct.quantity : 0));
        dispatch(removeFromCommerceCart(product));
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
        <DoubleStateButton changeState={cartButtonChangeState}
                           setChangeState={setCartButtonChangeState}
                           className={`add-to-cart-button ${className}`}
                           firstState={wasInCart ? cartButtonStates[1] : cartButtonStates[0]}
                           secondState={wasInCart ? cartButtonStates[0] : cartButtonStates[1]} 
                           additionalClickHandler={additionalClickHandler}/>
    )
}

export default AddToCartButton
