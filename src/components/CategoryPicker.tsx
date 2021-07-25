import React, { FC } from 'react';
import desktop from '../icons/desktop.svg';
import male_clothes from '../icons/male-clothes.svg';
import female_clothes from '../icons/female-clothes.svg';
import diamond from '../icons/diamond.svg';
import update from '../icons/updated.svg';

interface CategoryPickerProps {
    reference: React.RefObject<HTMLDivElement>;
}

const CategoryPicker: FC<CategoryPickerProps> = (props) => {
    return (
        <div id="category-picker" ref={props.reference}>
            <div className="container">
                <h2 className="title">Pick the one you want the most</h2>
                <div className="categories-grid">
                    <div className="category-item">
                        <img src={male_clothes} alt=""/>
                        <span>Men clothing</span>
                    </div>
                    <div className="category-item">
                        <img src={female_clothes} alt=""/>
                        <span>Women clothing</span>
                    </div>
                    <div className="category-item">
                        <img src={diamond} alt=""/>
                        <span>Jewelry</span>
                    </div>
                    <div className="category-item">
                        <img src={desktop} alt=""/>
                        <span>Electronics</span>
                    </div>
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
