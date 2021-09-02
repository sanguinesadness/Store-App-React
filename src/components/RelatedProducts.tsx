import { Product } from '@chec/commerce.js/types/product';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import { Img } from 'react-image';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { useTypedSelector } from '../hooks/useTypedSelector';
import gsap from 'gsap';

interface RelatedProductsProps {
    product: Product;
    type: "switcher" | "list";
}

const RelatedProducts: FC<RelatedProductsProps> = ({ product, type }) => {
    const { products: allProducts } = useTypedSelector(root => root.product);

    const getProductCategorySlug = (prod: Product): string => {
        const result = allProducts.find(p => p.id === prod.id)?.categories[0].slug;
        return result || "";
    }

    const [backArrowDisabled, setBackArrowDisabled] = useState<boolean>(false);
    const [forwardArrowDisabled, setForwardArrowDisabled] = useState<boolean>(false);

    //* from CSS: Item width is 150px and its Right margin is 50px = 200px
    //! always provide accurate value
    const listItemWidth = 200;
    const listRef = useRef<HTMLDivElement>(null);

    const updateCarouselArrows = (scrollPos: number) => {
        if (!listRef.current) {
            return;
        }

        const scrollPercent = scrollPos / (listRef.current?.scrollWidth - listRef.current?.clientWidth) * 100;
        const isPercentNan = isNaN(scrollPercent);

        setBackArrowDisabled(isPercentNan || scrollPercent <= 0);
        setForwardArrowDisabled(isPercentNan || scrollPercent >= 100);
    }

    const scrollBack = () => {
        if (!listRef.current || backArrowDisabled) {
            return;
        }

        listRef.current.scrollTo({
            left: 0,
            behavior: "smooth"
        });

        updateCarouselArrows(0);
    }

    const scrollForward = () => {
        if (!listRef.current || forwardArrowDisabled) {
            return;
        }

        let nextPos = listRef.current.scrollLeft + listItemWidth;

        listRef.current.scrollTo({
            left: nextPos,
            behavior: "smooth"
        });

        updateCarouselArrows(nextPos);
    }

    useEffect(() => {
        if (listRef.current) {
            updateCarouselArrows(listRef.current?.scrollLeft);
        }
    }, []);

    useEffect(() => {
        gsap.fromTo(listRef.current, { 
            opacity: 0
        }, { 
            opacity: 1,
            ease: "back.inOut(1)"
        });
    }, [product]);

    return (
        <div className={`related-products__wrapper ${type}`}>
            <h4 className="title">Related Products</h4>
            <div className="container">
                <span className={`back-arrow__wrapper ${backArrowDisabled ? "disabled" : ""}`}
                    onClick={scrollBack}>
                    <BsTriangleFill className="arrow" />
                </span>
                <div className="related-products" ref={listRef}>
                    {product.related_products.map((prod, index) => (
                        <Link to={`/${getProductCategorySlug(prod)}/${prod.id}`} key={index} className="related-product">
                            <div className="container">
                                {
                                    type === "list" ?
                                        <>
                                            <div className="left-section">
                                                <span className="product-name">{prod.name}</span>
                                                <span className="product-price">{prod.price.formatted_with_symbol}</span>
                                            </div>
                                            <div className="right-section">
                                                <div className="product-picture__wrapper">
                                                    <Img className="product-picture"
                                                        src={prod.media.source}
                                                        alt=""
                                                        loader={<PuffLoader color="#DDDDDD" />} />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="product-picture__wrapper">
                                                <Img className="product-picture"
                                                    src={prod.media.source}
                                                    alt=""
                                                    loader={<PuffLoader color="#DDDDDD" />} />
                                            </div>
                                            <span className="product-name">{prod.name}</span>
                                            <span className="product-price">{prod.price.formatted_with_symbol}</span>
                                        </>
                                }
                            </div>
                            <span className="selection-indicator" />
                        </Link>
                    ))}
                </div>
                <span className={`fading left-side ${backArrowDisabled ? "hidden" : ""}`}/>
                <span className={`fading right-side ${forwardArrowDisabled ? "hidden" : ""}`}/>
                <span className={`forward-arrow__wrapper ${forwardArrowDisabled ? "disabled" : ""}`}
                    onClick={scrollForward}>
                    <BsTriangleFill className="arrow" />
                </span>
            </div>
        </div>
    )
}

export default RelatedProducts
