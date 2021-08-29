import React, { FC } from 'react'
import Account from './Account'
import Cart from './Cart'
import Wishlist from './Wishlist'

const UserActions: FC = () => {
    return (
        <div className="user-actions">
            <Account />
            <Wishlist />
            <Cart />
        </div>
    )
}

export default UserActions
