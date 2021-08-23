import { Product } from '@chec/commerce.js/types/product';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Img } from 'react-image';
import { PuffLoader } from 'react-spinners';
import AddToCartButton from './AddToCartButton';
import SaveProductButton from './SaveProductButton';
import gsap from 'gsap';
import { useRef } from 'react';

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { pathname } = useLocation();
    const cardRef = useRef<HTMLDivElement>(null);

    const hideCard = () => gsap.fromTo(cardRef.current, {
        scale: 1,
        opacity: 1
    }, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.inOut(2)"
    });

    const animateCardHiding = () => new Promise((resolve, reject) => {
        hideCard().then(() => resolve("animation completed"))
                      .catch(() => reject("error occured while animating"));
    });
    
    return (
        <div className="product-card" ref={cardRef}>
            <div className="container">
                <Link to={`${product.categories[0].slug}/${product.id}`} className="product-card__body">
                    <div className="product-picture__wrapper">
                        <Img className="product-picture"
                             src={product.media.source}
                             alt=""
                             loader={<PuffLoader color="#00B389"/>}/>
                    </div>
                    <div className="product-title__wrapper">
                        <span className="product-title">{product.name}</span>
                    </div>
                    <div className="product-price">{product.price.formatted_with_symbol}</div>
                </Link>
                <footer className="product-card__footer">
                    {
                        pathname.includes("wishlist") ?
                            <SaveProductButton className="button light" product={product}
                                               beforeAction={animateCardHiding}/>
                        :
                            <SaveProductButton className="button light" product={product}/>
                    }
                    <AddToCartButton className="button light" product={product}/>
                </footer>
            </div>
        </div>
    )
}

export default ProductCard;