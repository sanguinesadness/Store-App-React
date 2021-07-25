import React from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import logo from '../icons/logo.svg';
import account from '../icons/account.svg';
import like from '../icons/like.svg';
import cart from '../icons/hand-cart.svg';
import { NavLink } from 'react-router-dom';
import { setSelectedCategoryAction } from '../types/category';
import ScrollBar from './ScrollBar';

const Header: FC = () => {
    const { categories, loading, error } = useTypedSelector(root => root.category);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <ScrollBar/>
            <div className="container">
                <div className="main-logo__container">
                    <NavLink to="/">
                        <img className="main-logo" src={logo} alt="logo"/>
                    </NavLink>
                </div>
                <div className="product-categories">
                    {categories.map(category => 
                        <NavLink to={`/${category.slug}`} className="product-category" key={category.id}
                                 onClick={() => dispatch(setSelectedCategoryAction(category))}>
                            {category.name}
                        </NavLink>
                    )}
                </div>
                <div className="user-actions">
                    <span className="account user-action">
                        <img className="account-icon" src={account} alt="account"/>
                    </span>
                    <span className="saved user-action">
                        <img className="saved-icon" src={like} alt="saved"/>
                    </span>
                    <span className="cart user-action">
                        <img className="hand-cart-icon" src={cart} alt="cart"/>
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header;
