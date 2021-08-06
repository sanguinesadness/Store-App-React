import React from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import logo from '../icons/logo.svg';
import account from '../icons/account.svg';
import like from '../icons/like.svg';
import { NavLink } from 'react-router-dom';
import { setSelectedCategoryAction } from '../types/category';
import ScrollBar from './ScrollBar';
import { useState } from 'react';
import { Category } from '@chec/commerce.js/types/category';
import Cart from './Cart';

const Header: FC = () => {
    const { percent } = useTypedSelector(root => root.scroll);
    const { categories, loading, error } = useTypedSelector(root => root.category);
    const dispatch = useDispatch();

    const [currentCategory, setCurrentCategory] = useState<Category>();

    useEffect(() => {
        if (currentCategory) {
            dispatch(setSelectedCategoryAction(currentCategory));
        }
    }, [currentCategory]);

    return (
        <header className={`header ${percent > 0 ? "not-at-the-top" : "at-the-top"}`}>
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
                            activeClassName="selected" isActive={(match) => {
                                if (!match) {
                                    return false;
                                }
                                
                                // wrap in setTimeout to avoid warning
                                setTimeout(() => setCurrentCategory(category), 0);

                                return true;
                            }}>
                            {category.name}
                        </NavLink>
                    )}
                </div>
                <div className="user-actions">
                    <span className="account user-action">
                        <img className="account-icon" src={account} alt="account"/>
                    </span>
                    <NavLink to="/wishlist" className="saved user-action">
                        <img className="saved-icon" src={like} alt="saved"/>
                    </NavLink>
                    <Cart/>
                </div>
            </div>
        </header>
    )
}

export default Header;
