import React, { FC, useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './store/actions/category';
import { fetchProducts } from './store/actions/product';
import WishlistPage from './components/pages/WishlistPage';

const App: FC = () => {
    const { selectedCategory } = useTypedSelector(root => root.category);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCategories(dispatch);
        fetchProducts(dispatch);
    }, []);
    
    return (
        <BrowserRouter>
            <Header/>
            <div id="main-container">
                <Route path="/" exact component={HomePage}/>
                <Route path={`/${selectedCategory?.slug}`} exact component={CategoryPage}/>
                <Route path="/wishlist" exact component={WishlistPage}/>
            </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
