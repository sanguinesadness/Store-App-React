import React from 'react';
import { FC } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { NavLink } from 'react-router-dom';
import ScrollBar from './ScrollBar';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import BurgerMenu from './BurgerMenu';
import ProductCategories from './ProductCategories';
import UserActions from './UserActions';
import { useEffect } from 'react';

const Header: FC = () => {
    const { percent } = useTypedSelector(root => root.scroll);

    const isMobileScreen = useMediaQuery({ query: "(max-width: 800px)" });
    const [isBurgerExpanded, setIsBurgerExpanded] = useState<boolean>(false);

    const [currentScrollPos, setCurrentScrollPos] = useState<number>(window.pageYOffset);
    const [prevScrollPos, setPrevScrollPos] = useState<number>(-1);
    const [headerState, setHeaderState] = useState<"hidden" | "visible">();
    
    useEffect(() => {
        setPrevScrollPos(currentScrollPos);
        setCurrentScrollPos(window.pageYOffset);
        setHeaderState(prevScrollPos < currentScrollPos ? "hidden" : "visible");

        if (isMobileScreen && headerState === "visible") {
            setIsBurgerExpanded(false);
        }
    }, [window.pageYOffset])

    return (
        <header className={`header ${percent > 0 ? "not-at-the-top" : "at-the-top"} ${isBurgerExpanded ? "burger-expanded" : ""} ${isMobileScreen ? headerState : ""}`}>
            <ScrollBar/>
            <div className="container">
                {
                    isMobileScreen ?
                        <BurgerMenu isExpanded={isBurgerExpanded} setIsExpanded={setIsBurgerExpanded}/>
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
