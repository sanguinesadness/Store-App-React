import React, { FC, useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './store/actions/category';
import { fetchProducts } from './store/actions/product';
import WishlistPage from './components/pages/WishlistPage';
import ProductPage from './components/pages/ProductPage';
import ScrollToTop from './components/ScrollToTop';
import Modal from 'react-modal';
import CheckoutPage from './components/pages/CheckoutPage';
import { commerceCartToLocal, fetchCommerceCart } from './store/actions/commerceCart';
import LoginResultPage from './components/pages/LoginResultPage';
import { commerce } from './lib/commerce';

Modal.setAppElement("#root");

const App: FC = () => {
    const { selectedCategory } = useTypedSelector(root => root.category);
    const { lineItems } = useTypedSelector(root => root.commerceCart);
    const { products } = useTypedSelector(root => root.product);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
        dispatch(fetchCommerceCart());
    }, []);

    useEffect(() => {
        dispatch(commerceCartToLocal(products, lineItems));
    }, [products, lineItems]);

    useEffect(() => {
        dispatch(fetchCommerceCart());
    }, [commerce.customer.isLoggedIn()]);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Switch>
                <Route path="/checkout" exact component={CheckoutPage}/>
                <Route path="/" render={() =>
                    <>
                        <Header />
                        <div id="main-container">
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <Route path={`/${selectedCategory?.slug}`} exact component={CategoryPage} />
                                <Route path={`/${selectedCategory?.slug}/:id`} exact component={ProductPage} />
                                <Route path="/wishlist" exact component={WishlistPage} />
                                <Route path="/login/callback/:token" exact component={LoginResultPage}/>
                            </Switch>
                        </div>
                        <Footer />
                    </>} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
