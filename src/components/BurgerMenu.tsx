import React, { SetStateAction, useEffect } from 'react';
import { FC } from 'react';
import fk_logo from '../icons/fakestore_logo_short.svg';
import UserActions from './UserActions';
import ProductCategories from './ProductCategories';
import { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

interface BurgerMenuProps {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ isExpanded, setIsExpanded }) => {
    const toggleBurger = () => setIsExpanded(!isExpanded);

    const location = useLocation();

    useEffect(() => {
        setIsExpanded(false);
    }, [location.pathname]);

    return (
        <div className={`burger-menu ${isExpanded ? "expanded" : ""}`}>
            <div className="visible-content">
                <div className="burger-icon" onClick={toggleBurger}>
                    <span className="top line"/>
                    <span className="middle line"/>
                    <span className="bottom line"/>
                </div>
                <UserActions/>
            </div>

            <div className="expandable-content">
                <div className="menu">
                    <div className="home">
                        <NavLink to="/" exact>
                            <span className="text">Home</span>
                            <img className="icon" src={fk_logo} alt=""/>
                        </NavLink>
                    </div>
                    <span className="separator"/>
                    <ProductCategories/>
                </div>
            </div>
        </div>
    )
}

export default BurgerMenu
