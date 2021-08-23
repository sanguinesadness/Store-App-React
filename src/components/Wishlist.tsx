import React, { FC, useEffect } from 'react';
import { useRef } from 'react';
import { FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import gsap from 'gsap';

const Wishlist: FC = () => {
    const { products } = useTypedSelector(root => root.wishList);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const tl = gsap.timeline();

    useEffect(() => {
        tl.to(linkRef.current, { scale: 1.2, color: "#96525a", duration: 0.1 });
        tl.to(linkRef.current, { scale: 1, color: "#3E454F", duration: 0.1, 
                                 onComplete: () => linkRef.current?.removeAttribute("style") });
    }, [products]);

    return (
        <NavLink to="/wishlist" 
                 className="wishlist user-action" 
                 activeClassName="selected"
                 ref={linkRef}>
            <FaHeart className="icon"/>
        </NavLink>
    )
}

export default Wishlist
