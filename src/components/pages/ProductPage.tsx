import React, { FC } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ReactLoading from 'react-loading';
import { useState } from 'react';
import { Product } from '@chec/commerce.js/types/product';
import { BsInfoSquareFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setScrollPercentAction } from '../../types/scroll';
import { FiChevronRight } from 'react-icons/fi';
import ProductInfo from '../ProductInfo';
import RelatedProducts from '../RelatedProducts';
import { useMediaQuery } from 'react-responsive';

interface ProductPageParams {
    id: string;
}

const ProductPage: FC = () => {
    const { pathname } = useLocation();
    const params = useParams<ProductPageParams>();
    const dispatch = useDispatch();

    const isMobileScreen = useMediaQuery({ query: "(max-width: 800px)" });

    const { products, loading, error } = useTypedSelector(root => root.product);
    const { selectedCategory } = useTypedSelector(root => root.category);

    const [selectedProduct, setSelectedProduct] = useState<Product>();

    useEffect(() => {
        setSelectedProduct(products.find(product => product.id === params.id));
    }, [products, pathname]);

    useEffect(() => {
        dispatch(setScrollPercentAction(0));
    }, []);

    return (
        <div id="product-page">
            {
                loading ?
                    <div className="page-loading">
                        <ReactLoading type="bubbles" className="product-page-loading loading-spinner"/>
                    </div>
                : selectedProduct ?
                    <div className="content">
                        <header className="product-page-header">
                            <NavLink className="category-name" to={`/${selectedCategory?.slug}`}>
                                {selectedCategory?.name || ""}
                            </NavLink>
                            <FiChevronRight className="separator"/>
                            <span className="product-name">{selectedProduct.name}</span>
                        </header>
                        <ProductInfo product={selectedProduct}/>
                        <RelatedProducts product={selectedProduct}
                                         type={isMobileScreen ? "list" : "switcher"}/>
                    </div>
                : 
                    <div className="product-page-error page-error">
                        <BsInfoSquareFill className="icon" />
                        <span className="message">{error || "Error occured while loading product info. Please try again"}</span>
                    </div>
            }
        </div>
    )
}

export default ProductPage