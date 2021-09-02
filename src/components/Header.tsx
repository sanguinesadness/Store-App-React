import React from 'react';
import { FC } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { NavLink, useLocation } from 'react-router-dom';
import ScrollBar from './ScrollBar';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import BurgerMenu from './BurgerMenu';
import ProductCategories from './ProductCategories';
import UserActions from './UserActions';
import { useEffect } from 'react';
import { useRef } from 'react';

const Header: FC = () => {
    const { percent } = useTypedSelector(root => root.scroll);
    const navbarRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const isMobileScreen = useMediaQuery({ query: "(max-width: 800px)" });
    const [isBurgerExpanded, setIsBurgerExpanded] = useState<boolean>(false);

    const [lastScrollTop, setLastScrollTop] = useState<number>(0);
    const [headerState, setHeaderState] = useState<"hidden" | "visible">("hidden");

    const showHeader = () => setHeaderState("visible");
    const hideHeader = () => setHeaderState("hidden");

    const delta = 5;
    const navbarHeight = navbarRef.current?.offsetHeight || 0;

    useEffect(() => {
        hasScrolled();
    }, [window.scrollY]);

    useEffect(() => {
        showHeader();
    }, [location.pathname]);

    const getDocHeight = () => {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    const hasScrolled = () => {
        const scrollTop = window.scrollY;

        if (Math.abs(lastScrollTop - scrollTop) <= delta) {
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // scroll down
            hideHeader();
        } else if (scrollTop < getDocHeight()) {
            // scroll up
            showHeader();
        }

        setLastScrollTop(scrollTop);
    }

    return (
        <header ref={navbarRef} 
                className={`header ${percent > 0 ? "not-at-the-top" : "at-the-top"} ${isBurgerExpanded ? "burger-expanded" : ""} ${isMobileScreen ? headerState : ""}`}>
            <ScrollBar />
            <div className="container">
                {
                    isMobileScreen ?
                        <BurgerMenu isExpanded={isBurgerExpanded} setIsExpanded={setIsBurgerExpanded} />
                        :
                        <div className="default-menu">
                            <div className="main-logo__container">
                                <NavLink to="/" exact>
                                    <span className="main-logo" />
                                </NavLink>
                            </div>
                            <ProductCategories />
                            <UserActions />
                        </div>
                }
            </div>
        </header>
    )
}

export default Header;
