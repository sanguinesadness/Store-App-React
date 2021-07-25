import React, { FC, useEffect } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './store/actions/category';

const App: FC = () => {
    const { selectedCategory } = useTypedSelector(root => root.category);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCategories(dispatch);
    }, []);
    
    return (
        <BrowserRouter>
            <Header/>
            <div id="main-container">
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path={`/${selectedCategory?.slug}`} exact>
                    <CategoryPage/>
                </Route>
            </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
