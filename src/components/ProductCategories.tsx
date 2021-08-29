import { Category } from '@chec/commerce.js/types/category';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setSelectedCategoryAction } from '../types/category';

const ProductCategories: FC = () => {
    const { categories } = useTypedSelector(root => root.category);
    const [currentCategory, setCurrentCategory] = useState<Category>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentCategory) {
            dispatch(setSelectedCategoryAction(currentCategory));
        }
    }, [currentCategory]);
    
    return (
        <div className="product-categories">
            {categories.map(category =>
                <NavLink to={`/${category.slug}`} className="product-category" key={category.id}
                    isActive={(match) => {
                        if (!match) {
                            return false;
                        }

                        // wrap in setTimeout to avoid warning
                        setTimeout(() => setCurrentCategory(category), 0);

                        return true;
                    }}>
                    {category.name}
                </NavLink>
            )}
        </div>
    )
}

export default ProductCategories
