import React, { FC } from 'react';
import About from '../About';
import CategoryPicker from '../CategoryPicker';
import { useRef } from 'react';

const HomePage: FC = () => {
    const categoryRef = useRef<HTMLDivElement>(null);
    const executeScroll = () => categoryRef.current?.scrollIntoView();

    return (
        <div id="home-page">
            <About onClickScroll={executeScroll}/>
            <CategoryPicker reference={categoryRef}/>
        </div>
    )
}

export default HomePage;