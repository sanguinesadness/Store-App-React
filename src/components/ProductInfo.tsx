import { Product } from '@chec/commerce.js/types/product';
import React, { FC, useRef } from 'react';
import { useEffect } from 'react';
import AddToCartButton from './AddToCartButton';
import ImageViewer, { IndexedImage } from './ImageViewer';
import SaveProductButton from './SaveProductButton';
import gsap from 'gsap';
import MediaQuery, { useMediaQuery } from 'react-responsive';

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
    let productImages: IndexedImage[] = product.assets.map((asset, index) => (
        { index: index, source: asset.url }
    ));

    const isMediumScreen = useMediaQuery({ query: "(max-width: 1120px)" });

    const infoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(infoRef.current, { 
            opacity: 0
        }, { 
            opacity: 1,
            ease: "back.inOut(1)"
        });
    }, [product]);

    return (
        <div className="product-info" ref={infoRef}>
            <div className="sections">
                <section className="left-section">
                    <MediaQuery maxWidth={800}>
                        <div className="price-block">
                            <h2 className="price-value">{product.price.formatted_with_symbol}</h2>
                            <span className="special-offer-label">no special offers</span>
                        </div>
                    </MediaQuery>
                    <ImageViewer images={productImages} 
                                 type={isMediumScreen ? "image-only" : "switcher"}/>
                </section>
                <section className="right-section">
                    <MediaQuery minWidth={801}>
                        <div className="price-block">
                            <h2 className="price-value">{product.price.formatted_with_symbol}</h2>
                            <span className="special-offer-label">no special offers</span>
                        </div>
                    </MediaQuery>
                    <div className="details-block">
                        <h4 className="title">Details</h4>
                        <div className="text__wrapper">
                            <span className="text" dangerouslySetInnerHTML={{__html: product.description}}/>
                        </div>
                    </div>
                    <div className="buttons-block">
                        <SaveProductButton className="button dark" product={product}/>
                        <AddToCartButton className="button green" product={product}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProductInfo
