import React, { FC } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CartProduct from './CartProduct';

const CartProducts: FC = () => {
    const { cartProducts } = useTypedSelector(root => root.cart);

    return (
        <div className="cart-products">
            {cartProducts.map(cartProduct => 
                <CartProduct key={cartProduct.product.id} cartProduct={cartProduct}/>    
            )}
        </div>
    )
}

export default CartProducts
