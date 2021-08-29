import React, { FC, useEffect } from 'react';
import About from '../About';
import CategoryPicker from '../CategoryPicker';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setScrollPercentAction } from '../../types/scroll';
import { useHistory } from 'react-router-dom';

const HomePage: FC = () => {
    const categoryRef = useRef<HTMLDivElement>(null);
    const executeScroll = () => categoryRef.current?.scrollIntoView();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScrollPercentAction(0));
    }, [])

    return (
        <div id="home-page">
            <About onClickScroll={executeScroll}/>
            <CategoryPicker reference={categoryRef}/>
        </div>
    )
}

export default HomePage;