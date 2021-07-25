import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ProductsGridHeader from '../ProductsGridHeader';

const CategoryPage: FC = () => {
    const { selectedCategory } = useTypedSelector(root => root.category);

    const history = useHistory();

    if (!selectedCategory) {
        history.push("/");
    }

    return (
        <div id="category-page">
            {
                selectedCategory ?
                    <ProductsGridHeader categoryName={selectedCategory.name} itemAmount={selectedCategory.products}
                    sortingOptions={[
                        { title: "best sellers", productPropName: "none" },
                        { title: "what's new", productPropName: "none" },
                        { title: "price", productPropName: "none" }
                    ]}/>
                :
                <></>
            }
        </div>
    )
}

export default CategoryPage
