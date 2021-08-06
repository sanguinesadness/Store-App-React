import React, { FC } from 'react';
import update from '../icons/updated.svg';
import { useTypedSelector } from '../hooks/useTypedSelector';
import category_icons from '../category-icons.json';
import { CategoryIconInfo } from '../types/categoryIcons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCategoryAction } from '../types/category';
import { setScrollPercentAction } from '../types/scroll';

interface CategoryPickerProps {
    reference: React.RefObject<HTMLDivElement>;
}

const CategoryPicker: FC<CategoryPickerProps> = (props) => {
    const { categories } = useTypedSelector(root => root.category);
    const categoryIcons: CategoryIconInfo[] = category_icons;

    const dispatch = useDispatch();

    return (
        <div className="category-picker" ref={props.reference}>
            <div className="container">
                <h2 className="title">Pick the one you want the most</h2>
                <div className="categories-grid">
                    {categories.map(category => {
                        const icon = categoryIcons.find(c => c.id == category.id)?.icon;

                        return (<NavLink to={`/${category.slug}`} className="category-item" key={category.id} onClick={() => {
                            dispatch(setSelectedCategoryAction(category));
                            dispatch(setScrollPercentAction(0));
                        }}>
                            <img src={`${process.env.PUBLIC_URL}/assets/category-icons/${icon}`} alt="" />
                            <span>{category.description ? category.description : category.name}</span>
                        </NavLink>)
                    })}
                </div>
                <div className="update-label">
                    <img src={update} alt=""/>
                    <span>The list will be updated...</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryPicker
