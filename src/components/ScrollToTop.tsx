import React from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
    isScrollSmooth?: boolean;
}

// scroll to top on page switch
const ScrollToTop: FC<ScrollToTopProps> = ({ isScrollSmooth }) => {
    const { pathname } = useLocation();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }

    const [prevPathname, setPrevPathname] = useState<string>(pathname);

    // return TRUE if Current pathname and Previous pathname both included "prod"
    const isWithinProductPage = () => pathname.includes("prod") && prevPathname.includes("prod");

    useEffect(() => {
        if (isScrollSmooth || isWithinProductPage()) {
            // enable Smooth-scrolling
            document.querySelector("html")?.setAttribute("style", "scroll-behavior: smooth;");
        }
        else {
            // disable Smooth-scrolling
            document.querySelector("html")?.setAttribute("style", "scroll-behavior: auto;");
            
        }

        scrollToTop();
        document.querySelector("html")?.removeAttribute("style");

        setPrevPathname(pathname);
    }, [pathname]);

    return null;
}

export default ScrollToTop
